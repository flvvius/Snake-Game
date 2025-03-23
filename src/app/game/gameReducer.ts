import { GameAction, GameState } from "./types";
import {
  checkCollision,
  checkFoodCollision,
  createInitialState,
  generateFood,
  growSnake,
  isValidDirection,
  moveSnake,
} from "./utils";

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "MOVE_SNAKE": {
      if (state.isGameOver || state.isPaused) {
        return state;
      }

      const newSnake = moveSnake(state.snake, state.direction);

      
      if (checkCollision(newSnake)) {
        return { ...state, isGameOver: true };
      }

      
      if (checkFoodCollision(newSnake, state.food)) {
        const grownSnake = growSnake(newSnake);
        return {
          ...state,
          snake: grownSnake,
          food: generateFood(grownSnake),
          score: state.score + 10,
        };
      }

      return { ...state, snake: newSnake };
    }

    case "CHANGE_DIRECTION": {
      if (state.isGameOver || state.isPaused) {
        return state;
      }

      const newDirection = action.payload;

      
      if (!isValidDirection(state.direction, newDirection)) {
        return state;
      }

      return { ...state, direction: newDirection };
    }

    case "RESET_GAME": {
      return createInitialState();
    }

    case "TOGGLE_PAUSE": {
      return { ...state, isPaused: !state.isPaused };
    }

    default:
      return state;
  }
};
