"use client";
import { motion } from "framer-motion";
import { VIDEO_CATEGORIES } from "../dashboard/child/education/constants";

const categoryExcerpts = VIDEO_CATEGORIES.slice(0, 3); // Show only first 3 categories on landing

export default function EducationSection() {
  return (
    <section className="py-24 bg-background/50 w-full text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-foreground mb-4"
      >
        Educational Content 📚
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto px-6"
      >
        Engaging videos and content to help kids learn about health, nutrition,
        and wellness
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
        {categoryExcerpts.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="bg-card border border-border rounded-xl p-8 shadow-md hover:shadow-lg transition group"
          >
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition">
              {category.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">
              {category.title}
            </h3>
            <p className="text-foreground/70 mb-4">
              {category.videos[0].description}
            </p>
            <div className="text-sm text-foreground/50">
              {category.videos.length} learning videos
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
          Explore All Content
        </button>
      </motion.div>
    </section>
  );
}
