"use client";

import { useEffect, useRef } from "react";
import { CELL_SIZE, GRID_SIZE } from "../game/utils";
import { GameState } from "../game/types";

interface GameBoardProps {
  gameState: GameState;
}

const GameBoard = ({ gameState }: GameBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { snake, food, isGameOver, isPaused } = gameState;

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#4CAF50" : "#8BC34A";
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      
      if (index === 0) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
          segment.x * CELL_SIZE + CELL_SIZE / 3,
          segment.y * CELL_SIZE + CELL_SIZE / 3,
          CELL_SIZE / 8,
          0,
          Math.PI * 2
        );
        ctx.arc(
          segment.x * CELL_SIZE + (CELL_SIZE / 3) * 2,
          segment.y * CELL_SIZE + CELL_SIZE / 3,
          CELL_SIZE / 8,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    
    ctx.fillStyle = "#E91E63";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    
    if (isGameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 15);
      ctx.font = "20px Arial";
      ctx.fillText(
        "Press Space to Restart",
        canvas.width / 2,
        canvas.height / 2 + 20
      );
    }

    
    if (isPaused && !isGameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", canvas.width / 2, canvas.height / 2 - 15);
      ctx.font = "20px Arial";
      ctx.fillText(
        "Press Space to Continue",
        canvas.width / 2,
        canvas.height / 2 + 20
      );
    }
  }, [snake, food, isGameOver, isPaused]);

  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      className="border border-gray-700 rounded shadow-lg"
    />
  );
};

export default GameBoard;
