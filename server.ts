import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const LANGUAGE_NAMES: Record<string, string> = {
  ES: "Spanish (Español)",
  EN: "English",
  FR: "French (Français)",
  PT: "Portuguese (Português)",
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.post("/api/lumi/chat", async (req, res) => {
    try {
      const { message, history, measurements, language, catalog } = req.body ?? {};
      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Se requiere un mensaje para LUMI." });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error:
            "La clave de Gemini API no está configurada en los secretos del entorno.",
        });
        return;
      }

      const langName = LANGUAGE_NAMES[language] || "Spanish (Español)";
      const catalogSummary = Array.isArray(catalog)
        ? catalog
            .map(
              (p: {
                id: string;
                name: string;
                price: number;
                category: string;
                description: string;
                sizeTag?: string;
                pros?: string[];
              }) =>
                `- [${p.id}] ${p.name} ($${p.price.toFixed(2)} USD, ${p.category}${p.sizeTag ? `, ${p.sizeTag}` : ""}): ${p.description} | Ventajas: ${(p.pros || []).join(", ")}`
            )
            .join("\n")
        : "";

      const measurementsText = measurements
        ? `User saved measurements: Footwear ${measurements.shoeSizeEU} EU (${measurements.footLengthCm} cm, width: ${measurements.footWidth}), Clothing ${measurements.clothingSize} (Chest ${measurements.chestCm}cm, Waist ${measurements.waistCm}cm, Hip ${measurements.hipCm}cm), Preferred system: ${measurements.preferredSystem}.`
        : "User has default measurements: 41 EU footwear, size M clothing.";

      const historyText = Array.isArray(history)
        ? history
            .slice(-6)
            .map(
              (h: { role: string; text: string }) =>
                `${h.role === "user" ? "User" : "LUMI"}: ${h.text}`
            )
            .join("\n")
        : "";

      const systemInstruction = `You are LUMI, the warm, patient, accessible holographic virtual shopping assistant for SUGERENCIAS ("No compras solo, compras acompañado").
Respond ALWAYS in ${langName}.
Keep responses concise (2-4 short sentences), clear, friendly, and free of pressure.
Use the user's saved measurements when recommending sizes or comfort options.
If relevant products from the catalog match the user's query or budget, include up to 2 matching product IDs in recommendedProductIds and a short comparison tip in comparisonTip.
Always remember that sizes are indicative by brand.

${measurementsText}

Available Catalog:
${catalogSummary}`;

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: historyText
          ? `Recent conversation:\n${historyText}\n\nUser's new message: ${message}`
          : message,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: "LUMI's warm, helpful response in the requested language.",
              },
              recommendedProductIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Up to 2 product IDs from the catalog that fit the user's request.",
              },
              comparisonTip: {
                type: Type.STRING,
                description: "Optional short tip comparing the recommended products.",
              },
            },
            required: ["reply", "recommendedProductIds"],
          },
        },
      });

      const raw = (response.text ?? "{}").trim();
      let parsed: {
        reply?: string;
        recommendedProductIds?: string[];
        comparisonTip?: string;
      };
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { reply: raw, recommendedProductIds: [] };
      }

      res.json({
        reply: parsed.reply || "",
        recommendedProductIds: Array.isArray(parsed.recommendedProductIds)
          ? parsed.recommendedProductIds.slice(0, 2)
          : [],
        comparisonTip: parsed.comparisonTip || "",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al consultar con LUMI.";
      console.error("Gemini chat error:", err);
      res.status(500).json({ error: errorMessage });
    }
  });

  app.post("/api/lumi/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body ?? {};
      if (!text || typeof text !== "string") {
        res.status(400).json({ error: "Texto requerido para traducir." });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error:
            "La clave de Gemini API no está configurada en los secretos del entorno.",
        });
        return;
      }

      const langName = LANGUAGE_NAMES[targetLanguage] || "English";
      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Translate the following shopping assistant message naturally and clearly into ${langName}. Return only the translated text without quotes:\n\n${text}`,
      });

      res.json({ translatedText: (response.text ?? "").trim() });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al traducir el mensaje.";
      console.error("Gemini translate error:", err);
      res.status(500).json({ error: errorMessage });
    }
  });

  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SUGERENCIAS server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
