"use client";

import { GameState } from "../game/types";
import { useState, useEffect } from "react";

interface ControlsProps {
  gameState: GameState;
  onRestart: () => void;
  onPause: () => void;
}

const Controls = ({ gameState, onRestart, onPause }: ControlsProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Score: {gameState.score}</div>
        <div className="space-x-2">
          <button
            onClick={onPause}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {gameState.isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Restart
          </button>
        </div>
      </div>

      {isTouchDevice && (
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mt-4">
          <div></div>
          <button
            className="up-btn p-4 bg-gray-700 text-white rounded text-2xl"
            data-direction="UP"
            aria-label="Move Up"
          >
            ↑
          </button>
          <div></div>
          <button
            className="left-btn p-4 bg-gray-700 text-white rounded text-2xl"
            data-direction="LEFT"
            aria-label="Move Left"
          >
            ←
          </button>
          <div></div>
          <button
            className="right-btn p-4 bg-gray-700 text-white rounded text-2xl"
            data-direction="RIGHT"
            aria-label="Move Right"
          >
            →
          </button>
          <div></div>
          <button
            className="down-btn p-4 bg-gray-700 text-white rounded text-2xl"
            data-direction="DOWN"
            aria-label="Move Down"
          >
            ↓
          </button>
          <div></div>
        </div>
      )}

      <div className="mt-4 text-gray-600">
        <h3 className="font-semibold text-lg">Controls:</h3>
        <p>Use arrow keys to move the snake. Space to pause/resume.</p>
      </div>
    </div>
  );
};

export default Controls;
