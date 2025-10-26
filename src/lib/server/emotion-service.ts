"use server";

/** 🧹 Clean input text */
function cleanText(text: string) {
  return text.replace(/[\n\r]+/g, " ").trim();
}

/** 🧠 Clean and normalize API data */
function cleanData(data: Record<string, number>): Record<string, number> {
  const cleaned: Record<string, number> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "number" && value > 0) {
      cleaned[key.trim().toLowerCase()] = Math.min(Math.max(value, 0), 1);
    }
  }
  return cleaned;
}

/** 🔮 Query Hugging Face emotion model directly */
async function queryHuggingFace(text: string) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // keep secret
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: cleanText(text) }),
    }
  );

  if (!response.ok) {
    console.error(
      "Hugging Face API error:",
      response.status,
      response.statusText
    );
    throw new Error(`Failed to fetch emotions: ${response.statusText}`);
  }

  return response.json();
}

/** 🎭 Fetch emotions from Hugging Face and filter top results (up to 0.7 cumulative probability) */
export const fetchEmotionsBasedOnText = async (
  text: string
): Promise<string[]> => {
  try {
    const result = await queryHuggingFace(text);

    // Hugging Face output format:
    // [[{ label: "joy", score: 0.72 }, { label: "sadness", score: 0.15 }, ...]]
    const predictions =
      Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;

    const data: Record<string, number> = {};
    for (const item of predictions) {
      if (item.label && typeof item.score === "number") {
        data[item.label.toLowerCase()] = item.score;
      }
    }

    const cleaned = cleanData(data);
    const sorted = Object.entries(cleaned).sort((a, b) => b[1] - a[1]);

    // pick top emotions up to cumulative probability 0.7
    const emotions: string[] = [];
    let cumulative = 0;
    for (const [emotion, prob] of sorted) {
      if (cumulative >= 0.7) break;
      emotions.push(emotion);
      cumulative += prob;
    }

    return emotions;
  } catch (err) {
    console.error("Error fetching emotions:", err);
    return [];
  }
};
