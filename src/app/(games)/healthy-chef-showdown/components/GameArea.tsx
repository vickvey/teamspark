
import React from 'react';
import { Germ } from '../types';
import GermComponent from './Germ';

interface GameAreaProps {
  germs: Germ[];
  onBustGerm: (id: number, points: number) => void;
}

const GameArea: React.FC<GameAreaProps> = ({ germs, onBustGerm }) => {
  return (
    <div className="w-full h-full">
      {germs.map(germ => (
        <GermComponent key={germ.id} germ={germ} onBust={onBustGerm} />
      ))}
    </div>
  );
};

export default GameArea;
