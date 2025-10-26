import { NextResponse } from "next/server";
import { fetchEmotionsBasedOnText } from "@/lib/server/emotion-service";

export async function GET() {
  const sampleText = "I am sad and happy today.";

  const emotions = await fetchEmotionsBasedOnText(sampleText);

  return NextResponse.json({ emotions });
}
