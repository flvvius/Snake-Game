export type Position = {
  x: number;
  y: number;
};

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type GameState = {
  snake: Position[];
  food: Position;
  direction: Direction;
  isGameOver: boolean;
  score: number;
  isPaused: boolean;
};

export type GameAction =
  | { type: "MOVE_SNAKE" }
  | { type: "CHANGE_DIRECTION"; payload: Direction }
  | { type: "RESET_GAME" }
  | { type: "TOGGLE_PAUSE" };
