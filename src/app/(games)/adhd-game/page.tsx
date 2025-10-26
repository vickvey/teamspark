// adhd-game/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/lib/store/useSessionStore";
import { toast } from "sonner";

const EMOJIS = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"];

interface CardType {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function ADHDGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const addCoins = useSessionStore((state) => state.addCoins);

  const initializeGame = () => {
    const initialCards: CardType[] = shuffleArray(
      [...EMOJIS, ...EMOJIS].map((emoji, idx) => ({
        id: idx,
        emoji,
        flipped: false,
        matched: false,
      }))
    );
    setCards(initialCards);
    setFlippedCards([]);
    setMatchedCount(0);
    setMessage("");
    setScore(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeGame();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (clickedCard: CardType) => {
    if (flippedCards.length >= 2 || clickedCard.flipped || clickedCard.matched)
      return;

    const newCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, flipped: true } : c
    );
    const newFlipped = [...flippedCards, { ...clickedCard, flipped: true }];

    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => checkMatch(newFlipped, newCards), 800);
    }
  };

  const checkMatch = (flipped: CardType[], currentCards: CardType[]) => {
    let newCards = [...currentCards];
    let newMatchedCount = matchedCount;

    if (flipped[0].emoji === flipped[1].emoji) {
      // Found a match!
      newCards = newCards.map((c) =>
        c.emoji === flipped[0].emoji ? { ...c, matched: true } : c
      );
      newMatchedCount += 2;

      // Award coins for matching pairs (10 coins per match)
      const coinsEarned = 10;
      addCoins(coinsEarned);
      setScore((prev) => prev + coinsEarned);
      toast.success(`Match found! +${coinsEarned} coins 🪙`);
    } else {
      newCards = newCards.map((c) =>
        c.id === flipped[0].id || c.id === flipped[1].id
          ? { ...c, flipped: false }
          : c
      );
    }

    setCards(newCards);
    setFlippedCards([]);
    setMatchedCount(newMatchedCount);

    if (newMatchedCount === cards.length) {
      // Game completed! Award bonus coins
      const bonusCoins = 50;
      addCoins(bonusCoins);
      setScore((prev) => prev + bonusCoins);
      setMessage(
        `🎉 Congratulations! You matched all cards and earned ${
          score + bonusCoins
        } coins total!`
      );
      toast.success(`Game complete! +${bonusCoins} bonus coins! 🏆`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        ADHD Memory Game
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`w-24 h-24 flex items-center justify-center text-3xl cursor-pointer rounded-lg shadow-md transition-transform duration-300
            ${
              card.flipped || card.matched
                ? "bg-white text-slate-900"
                : "bg-green-500 text-white"
            }
            ${card.matched ? "bg-yellow-300 cursor-default" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped || card.matched ? card.emoji : ""}
          </Card>
        ))}
      </div>
      {message && <p className="mt-6 text-xl text-slate-700">{message}</p>}
      <Button className="mt-4" onClick={initializeGame}>
        Restart Game
      </Button>
    </div>
  );
}
