"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-32 bg-linear-to-r from-primary to-secondary text-foreground text-center w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6"
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
          variant="default"
          onClick={() => router.push("/child")}
        >
          Join Now for Free 🌟
        </Button>
      </motion.div>
    </section>
  );
}
