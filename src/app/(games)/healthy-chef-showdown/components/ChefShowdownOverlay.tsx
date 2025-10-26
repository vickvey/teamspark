import React from 'react';
import { ChefShowdownGameState } from '../types';

interface ChefShowdownOverlayProps {
    gameState: ChefShowdownGameState;
    winner: 'player' | 'ai' | 'tie' | null;
    playerScore: number;
    aiScore: number;
    onStartGame: () => void;
}

interface ResultDisplayProps {
    winner: 'player' | 'ai' | 'tie' | null;
    playerScore: number;
    aiScore: number;
    onStartGame: () => void;
}

const JudgingSpinner = () => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-4xl text-white mt-4">Judging...</p>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ winner, playerScore, aiScore, onStartGame }) => {
    let message = "It's a tie!";
    let textColor = "text-blue-400";
    if (winner === 'player') {
        message = "You Win!";
        textColor = "text-green-400";
    } else if (winner === 'ai') {
        message = "AI Chef Wins!";
        textColor = "text-red-400";
    }

    return (
        <div className="text-center">
            <h2 className={`text-7xl font-bold drop-shadow-lg ${textColor}`}>{message}</h2>
            <p className="text-3xl text-white mt-4">Your Score: {playerScore}</p>
            <p className="text-3xl text-white mt-2">AI's Score: {aiScore}</p>
            <button onClick={onStartGame} className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-10 rounded-full text-3xl transition-transform transform hover:scale-105 shadow-lg">
                Play Again
            </button>
        </div>
    );
};


const ChefShowdownOverlay: React.FC<ChefShowdownOverlayProps> = ({ gameState, winner, playerScore, aiScore, onStartGame }) => {
    if (gameState === 'playing') return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-30 p-4">
            {gameState === 'start' && (
                <div className="text-center">
                    <h1 className="text-6xl md:text-8xl text-orange-400 drop-shadow-lg">Healthy Chef Showdown</h1>
                    <p className="text-xl md:text-2xl text-white mt-4 max-w-lg">Drag healthy ingredients to your dish to get the highest score. Beat the AI Chef!</p>
                    <button onClick={onStartGame} className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-3xl transition-transform transform hover:scale-105 shadow-lg">
                        Start Cooking!
                    </button>
                </div>
            )}
            {gameState === 'judging' && <JudgingSpinner />}
            {gameState === 'result' && <ResultDisplay winner={winner} playerScore={playerScore} aiScore={aiScore} onStartGame={onStartGame} />}
        </div>
    );
};

export default ChefShowdownOverlay;