"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, useTransform } from "framer-motion";

interface CoinBalanceProps {
  balance: number;
}

const CoinBalance: React.FC<CoinBalanceProps> = ({ balance }) => {
  const spring = useSpring(balance, { mass: 0.8, stiffness: 100, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  const hasMounted = useRef(false);
  const [renderValue, setRenderValue] = useState(balance);

  // Subscribe to spring updates
  useEffect(() => {
    const unsubscribe = display.onChange((val) => setRenderValue(val));
    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (hasMounted.current) {
      spring.set(balance); // ✅ only one argument
    } else {
      spring.set(balance); // same here
      hasMounted.current = true;
    }
  }, [spring, balance]);

  return (
    <div className="absolute top-4 right-4 bg-black/40 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-50">
      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-800 font-bold text-xl">
        C
      </div>
      <span className="text-2xl font-bold text-white w-20 text-left">
        {renderValue}
      </span>
    </div>
  );
};

export default CoinBalance;
