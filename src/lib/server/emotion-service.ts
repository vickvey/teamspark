"use server";

/** 🧹 Clean input text */
function cleanText(text: string) {
  console.log("[cleanText] Original:", text);
  const cleaned = text.replace(/[\n\r]+/g, " ").trim();
  console.log("[cleanText] Cleaned:", cleaned);
  return cleaned;
}

/** 🧠 Clean and normalize API data */
function cleanData(data: Record<string, number>): Record<string, number> {
  console.log("[cleanData] Original data:", data);
  const cleaned: Record<string, number> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "number" && value > 0) {
      cleaned[key.trim().toLowerCase()] = Math.min(Math.max(value, 0), 1);
    }
  }
  console.log("[cleanData] Cleaned data:", cleaned);
  return cleaned;
}

/** 🔮 Query Hugging Face emotion model directly */
async function queryHuggingFace(text: string) {
  const key = process.env.HUGGING_FACE_API_KEY;
  console.log("[queryHuggingFace] Using API key present?", !!key);

  if (!key) {
    throw new Error(
      "[queryHuggingFace] ERROR: Hugging Face API key is missing!"
    );
  }

  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base",
    {
      headers: {
        Authorization: `Bearer ${key}`, // keep secret
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: cleanText(text) }),
    }
  );

  console.log("[queryHuggingFace] Response status:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error("[queryHuggingFace] Response body:", text);
    throw new Error(
      `Failed to fetch emotions: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log("[queryHuggingFace] Response data:", data);
  return data;
}

/** 🎭 Fetch emotions from Hugging Face and filter top results (up to 0.7 cumulative probability) */
export const fetchEmotionsBasedOnText = async (
  text: string
): Promise<string[]> => {
  try {
    console.log("[fetchEmotionsBasedOnText] Input text:", text);

    const result = await queryHuggingFace(text);

    // Hugging Face output format:
    // [[{ label: "joy", score: 0.72 }, { label: "sadness", score: 0.15 }, ...]]
    const predictions =
      Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;

    console.log("[fetchEmotionsBasedOnText] Predictions:", predictions);

    const data: Record<string, number> = {};
    for (const item of predictions) {
      if (item.label && typeof item.score === "number") {
        data[item.label.toLowerCase()] = item.score;
      }
    }

    const cleaned = cleanData(data);
    const sorted = Object.entries(cleaned).sort((a, b) => b[1] - a[1]);

    const emotions: string[] = [];
    let cumulative = 0;
    for (const [emotion, prob] of sorted) {
      if (cumulative >= 0.7) break;
      emotions.push(emotion);
      cumulative += prob;
    }

    console.log("[fetchEmotionsBasedOnText] Selected emotions:", emotions);
    return emotions;
  } catch (err) {
    console.error("[fetchEmotionsBasedOnText] Error fetching emotions:", err);
    return [];
  }
};
