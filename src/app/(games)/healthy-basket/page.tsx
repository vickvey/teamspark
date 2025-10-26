// app/(games)/healthy-basket/page.tsx
"use client";

import dynamic from "next/dynamic";

const FoodCatchGame = dynamic(() => import("./FoodCatchGame"), {
  ssr: false, // ❌ Important: disables SSR
});

export default function HealthyBasketPage() {
  return <FoodCatchGame />;
}
