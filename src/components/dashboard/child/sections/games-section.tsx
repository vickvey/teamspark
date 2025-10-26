"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type GameInfo = {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  age: string;
  benefits: string[];
  href: string; // ✅ new attribute
};

const gameInfo: GameInfo[] = [
  {
    id: "game-1",
    title: "Health Basket: Fruit Adventure",
    description:
      "Catch healthy fruits and avoid junk food in this exciting game.",
    image: "/images/basket.png",
    difficulty: "Easy",
    age: "5-7",
    benefits: ["IQ", "Thinking", "Memory"],
    href: "/healthy-basket", // ✅ direct link
  },
  {
    id: "game-2",
    title: "ADHD Game: Squares Memory Game",
    description: "Improve focus and memory by matching pairs of cards.",
    image: "/images/adhd-game.png",
    difficulty: "Medium",
    age: "6-9",
    benefits: ["Hygiene", "Focus", "Consistency"],
    href: "/adhd-game", // ✅ direct link
  },
  {
    id: "game-3",
    title: "Fitness Fun",
    description: "Complete mini exercises to keep your character active.",
    image: "/images/game-fitness.svg",
    difficulty: "Hard",
    age: "7-10",
    benefits: ["Fitness", "Coordination", "Endurance"],
    href: "/child/game/fitness-fun", // ✅ direct link
  },
  {
    id: "game-4",
    title: "Activity Quest: Move with Pokemon",
    description: "A fun physical activity game featuring Pokemon characters.",
    image: "/images/activity_corner.png",
    difficulty: "Medium",
    age: "4-10",
    benefits: ["Fitness", "Coordination", "Endurance"],
    href: "/activity-quest", // ✅ direct link
  },
  {
    id: "game-5",
    title: "Healthy Chef Showdown",
    description: "Create nutritious dishes in a timed cooking challenge.",
    image: "/images/healthy_chef_shadow.png",
    difficulty: "Medium",
    age: "4-10",
    benefits: ["Fitness", "Coordination", "Endurance"],
    href: "/healthy-chef-showdown", // ✅ direct link
  },
];

const GameCard: React.FC<{ game: GameInfo }> = ({ game }) => (
  <div className="bg-card rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col items-center text-center transition">
    <Image
      height={500}
      width={500}
      src={game.image}
      alt={game.title}
      className="w-32 h-32 object-contain mb-4"
    />
    <h3 className="text-xl font-semibold mb-2 text-foreground">{game.title}</h3>
    <p className="text-foreground/70 mb-3">{game.description}</p>
    <div className="flex flex-wrap gap-2 justify-center mb-3">
      <Badge variant="secondary">{game.difficulty}</Badge>
      <Badge variant="secondary">{`Age: ${game.age}`}</Badge>
    </div>
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {game.benefits.map((b) => (
        <Badge key={b} variant="outline">
          {b}
        </Badge>
      ))}
    </div>

    {/* ✅ Now uses direct href from data */}
    <Link href={game.href}>
      <Button size="sm" variant="default">
        Play Now 🎮
      </Button>
    </Link>
  </div>
);

const GamesSection: React.FC = () => (
  <section className="py-24 bg-background w-full">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
        🎯 Health Education Mini Games
      </h2>
      <p className="text-foreground/70 text-center mb-12">
        Learn about healthy habits while having fun! Click a game to play.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {gameInfo.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  </section>
);

export default GamesSection;
