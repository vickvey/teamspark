import React from "react";
import { Germ } from "../types";
import { GERM_VARIANTS } from "../constants";

interface GermProps {
  germ: Germ;
  onBust: (id: number, points: number) => void;
}

const GermComponent: React.FC<GermProps> = ({ germ, onBust }) => {
  const [isBusted, setIsBusted] = React.useState(false);
  const variantDetails = GERM_VARIANTS[germ.variant];

  const handleClick = () => {
    setIsBusted(true);
    // The animation takes 300ms, so we wait before removing it from the DOM
    setTimeout(() => {
      onBust(germ.id, variantDetails.points);
    }, 300);
  };

  const animationClass =
    germ.variant === "pink"
      ? "animate-wiggle animation-duration-500"
      : "animate-wiggle";

  return (
    <div
      className={`absolute cursor-pointer transition-transform duration-200 hover:scale-110 ${
        isBusted ? "animate-pop" : ""
      }`}
      style={{ top: `${germ.y}%`, left: `${germ.x}%` }}
      onClick={handleClick}
    >
      <variantDetails.Icon
        className={`${variantDetails.size} ${animationClass}`}
      />
    </div>
  );
};

export default GermComponent;
