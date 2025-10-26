"use client";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Sign Up",
      desc: "Create a profile for your child and set health goals together.",
    },
    {
      step: "2",
      title: "Play & Learn",
      desc: "Your child completes fun mini-games that build healthy habits.",
    },
    {
      step: "3",
      title: "Track Progress",
      desc: "Monitor their achievements and celebrate success!",
    },
  ];

  return (
    <section className="py-24 bg-background/50 w-full text-center">
      <h2 className="text-4xl font-bold text-foreground mb-10">
        How It Works 🧩
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.3 }}
            className="bg-card border border-border rounded-xl p-8 shadow-md hover:shadow-lg transition"
          >
            <div className="text-5xl font-bold mb-4 text-foreground">
              {item.step}
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">
              {item.title}
            </h3>
            <p className="text-foreground/70">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
