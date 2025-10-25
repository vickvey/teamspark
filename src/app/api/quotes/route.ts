// NextJS API router function Code

//        GET /api/quotes - {body - sentiment} => Response -> quote string

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Parse URL parameters (?sentiment=happy)
    const { searchParams } = new URL(request.url);
    const sentiment = searchParams.get("sentiment");

    // Process and filter out emotions (mock example)
    const processedSentiment = sentiment?.toLowerCase().trim();

    // Example: "query database" logic (mocked here)
    let quote = "Every emotion has its own beauty.";

    if (processedSentiment === "happy") {
      quote =
        "Happiness is not something ready-made. It comes from your own actions.";
    } else if (processedSentiment === "sad") {
      quote = "Tears come from the heart and not from the brain.";
    } else if (processedSentiment === "angry") {
      quote =
        "For every minute you remain angry, you lose sixty seconds of peace of mind.";
    }

    // Return formatted response
    return NextResponse.json({ quote });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
