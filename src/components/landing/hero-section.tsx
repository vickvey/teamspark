"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="py-32 text-center flex flex-col items-center justify-center bg-linear-to-b from-background/50 to-background w-full">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-extrabold text-5xl md:text-7xl text-foreground mb-6"
      >
        The Health Manager for your Kid 🌱
      </motion.h1>

      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl text-foreground/70 mb-8"
      >
        Are you worried about your child&apos;s health?
      </motion.h4>

      <motion.h5
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-foreground/80 mb-2"
      >
        Our platform makes learning about healthy habits fun and engaging!
      </motion.h5>

      <motion.h6
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl text-foreground/60 mb-10"
      >
        Educate your child in a well-organized, gamified way.
      </motion.h6>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-4 justify-center mt-6"
      >
        <Button
          size="lg"
          variant="default"
          onClick={() => router.push("/child")}
        >
          Get Started 🚀
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push("/learn-more")}
        >
          Learn More 💡
        </Button>
      </motion.div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="mt-20"
      >
        <Image
          height={500}
          width={500}
          src="/images/kids-healthy-lifestyle.svg"
          alt="Kids learning about health"
          className="mx-auto w-3/4 md:w-1/2"
        />
      </motion.div>
    </section>
  );
}
