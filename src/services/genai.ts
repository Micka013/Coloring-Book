import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateColoringPage(
  theme: string,
  age: string,
  isCover: boolean = false,
): Promise<string> {
  let agePrompt = "";
  if (age === "3-5") {
    agePrompt =
      "Very simple shapes, large areas to color, minimal details, suitable for a toddler.";
  } else if (age === "6-8") {
    agePrompt =
      "Complete scene, moderate details, balanced composition, suitable for a young child.";
  } else if (age === "9-12") {
    agePrompt =
      "Rich illustration, full background, extra details, suitable for an older child.";
  }

  const basePrompt = `A children's coloring page about ${theme}. Pure white background, thick black outlines only. No shading, no grayscale, no black fills, no colors. Cute cartoon style. No text, no words, no letters, no numbers. ${agePrompt}`;

  const prompt = isCover
    ? `${basePrompt} Central composition, large margins around the edge.`
    : basePrompt;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4",
      },
    },
  });

  for (const part of response?.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}
