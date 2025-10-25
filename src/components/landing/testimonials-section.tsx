"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white text-center w-full">
      <h2 className="text-4xl font-bold text-green-700 mb-10">
        Loved by Parents & Kids ❤️
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {[
          {
            name: "Sophia (Parent)",
            quote:
              "My son now eats vegetables without complaining! The app turned health lessons into playtime.",
          },
          {
            name: "Ryan (8 years old)",
            quote:
              "I love earning stars and rewards! I play the fruit game every morning before school!",
          },
          {
            name: "Emma (Parent)",
            quote:
              "A fun, positive way to build healthy habits early. Highly recommend for every family!",
          },
        ].map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="bg-green-50 p-6 rounded-xl shadow text-left"
          >
            <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
            <p className="font-semibold text-green-700">— {t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
