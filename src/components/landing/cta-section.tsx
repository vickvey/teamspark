"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-32 bg-linear-to-r from-green-500 to-blue-500 text-white text-center w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Ready to make healthy fun? 🎯
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Button
          size="lg"
          className="bg-white text-green-600 font-bold text-lg hover:bg-green-50"
          onClick={() => router.push("/child")}
        >
          Join Now for Free 🌟
        </Button>
      </motion.div>
    </section>
  );
}
