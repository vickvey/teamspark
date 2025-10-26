"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "🎮 Gamified Learning",
      desc: "Kids learn healthy habits through fun, interactive mini-games that teach nutrition, hygiene, and fitness.",
    },
    {
      title: "🏆 Reward System",
      desc: "Encourage consistency with daily challenges, progress stars, and points that unlock fun rewards.",
    },
    {
      title: "👨‍👩‍👧 Parent Insights",
      desc: "Parents can track their child's progress and motivate them to stay on track with healthy goals.",
    },
  ];

  return (
    <section className="py-24 bg-background w-full text-center">
      <h2 className="text-4xl font-bold text-foreground mb-10">
        What Makes Us Special ✨
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="bg-muted rounded-xl p-8 shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              {feature.title}
            </h3>
            <p className="text-foreground/70">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
