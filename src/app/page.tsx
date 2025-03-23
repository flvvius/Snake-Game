import Game from "./components/Game";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play Snake Game Online | Free Browser Game",
  description:
    "Play the classic Snake game for free in your browser. Control the snake with arrow keys, collect food, and try to beat your high score!",
  alternates: {
    canonical: "https://snake-game-iota-orcin.vercel.app",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Snake Game</h1>
          <p className="text-xl">A classic snake game built with Next.js</p>
        </div>
        <div className="bg-white/10 shadow-2xl rounded-lg p-6">
          <Game />
        </div>
        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>
            Use arrow keys to control the snake. Collect the red food to grow
            and earn points.
          </p>
          <p className="mt-2">Press space bar to pause/resume the game.</p>
        </footer>
      </div>
    </main>
  );
}
