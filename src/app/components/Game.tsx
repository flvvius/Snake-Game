"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { Direction } from "../game/types";
import { createInitialState, GAME_SPEED } from "../game/utils";
import { gameReducer } from "../game/gameReducer";
import GameBoard from "./GameBoard";
import Controls from "./Controls";

const Game = () => {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialState());
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          dispatch({ type: "CHANGE_DIRECTION", payload: "UP" });
          break;
        case "ArrowDown":
          dispatch({ type: "CHANGE_DIRECTION", payload: "DOWN" });
          break;
        case "ArrowLeft":
          dispatch({ type: "CHANGE_DIRECTION", payload: "LEFT" });
          break;
        case "ArrowRight":
          dispatch({ type: "CHANGE_DIRECTION", payload: "RIGHT" });
          break;
        case " ":
          
          if (gameState.isGameOver) {
            dispatch({ type: "RESET_GAME" });
          } else {
            dispatch({ type: "TOGGLE_PAUSE" });
          }
          break;
        default:
          break;
      }
    },
    [gameState.isGameOver]
  );

  
  const handleTouchControl = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const direction = target.dataset.direction as Direction | undefined;

    if (direction) {
      dispatch({ type: "CHANGE_DIRECTION", payload: direction });
    }
  }, []);

  
  useEffect(() => {
    const runGameLoop = () => {
      gameLoopRef.current = setInterval(() => {
        dispatch({ type: "MOVE_SNAKE" });
      }, GAME_SPEED);
    };

    
    if (!gameState.isGameOver && !gameState.isPaused) {
      runGameLoop();
    }

    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.isGameOver, gameState.isPaused]);

  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  
  useEffect(() => {
    
    document.addEventListener("click", handleTouchControl);

    return () => {
      document.removeEventListener("click", handleTouchControl);
    };
  }, [handleTouchControl]);

  const handleRestart = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const handlePause = () => {
    dispatch({ type: "TOGGLE_PAUSE" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Snake Game</h1>
      <GameBoard gameState={gameState} />
      <Controls
        gameState={gameState}
        onRestart={handleRestart}
        onPause={handlePause}
      />
    </div>
  );
};

export default Game;
