import { Direction, Position } from "./types";

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const GAME_SPEED = 150;

export const createInitialState = () => {
  
  const snake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ];

  return {
    snake,
    food: generateFood(snake),
    direction: "RIGHT" as Direction,
    isGameOver: false,
    score: 0,
    isPaused: false,
  };
};

export const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  let foodOnSnake = true;

  while (foodOnSnake) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    foodOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
  }

  return newFood!;
};

export const moveSnake = (
  snake: Position[],
  direction: Direction
): Position[] => {
  const head = { ...snake[0] };

  switch (direction) {
    case "UP":
      head.y -= 1;
      break;
    case "DOWN":
      head.y += 1;
      break;
    case "LEFT":
      head.x -= 1;
      break;
    case "RIGHT":
      head.x += 1;
      break;
  }

  return [head, ...snake.slice(0, -1)];
};

export const checkCollision = (snake: Position[]): boolean => {
  const head = snake[0];

  
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }

  
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
};

export const checkFoodCollision = (
  snake: Position[],
  food: Position
): boolean => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};

export const growSnake = (snake: Position[]): Position[] => {
  return [...snake, { ...snake[snake.length - 1] }];
};

export const isValidDirection = (
  currentDir: Direction,
  newDir: Direction
): boolean => {
  return !(
    (currentDir === "UP" && newDir === "DOWN") ||
    (currentDir === "DOWN" && newDir === "UP") ||
    (currentDir === "LEFT" && newDir === "RIGHT") ||
    (currentDir === "RIGHT" && newDir === "LEFT")
  );
};
