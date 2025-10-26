export async function fetchQuotesByEmotions(emotions: string[]) {
  const res = await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emotions }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch quotes");
  }

  return res.json(); // should return Quote[]
}
