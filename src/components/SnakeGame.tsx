import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Activity, RefreshCw, PlayCircle } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 120;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = snake.some(segment => segment.x === newFood?.x && segment.y === newFood?.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        setIsPaused(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          if (gameOver) resetGame();
          else setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-black glitch-border">
      <div className="flex justify-between w-full px-2 font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-[#ff00ff] tracking-tighter">DATA_HARVESTED</span>
          <span className="text-2xl font-bold text-[#00ffff] glitch-text">
            {score.toString().padStart(5, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase text-[#ff00ff] tracking-tighter flex items-center gap-1">
            <Activity size={10} /> MAX_CAPACITY
          </span>
          <span className="text-2xl font-bold text-[#00ffff] glitch-text">
            {highScore.toString().padStart(5, '0')}
          </span>
        </div>
      </div>

      <div 
        className="relative bg-black border-2 border-[#00ffff] overflow-hidden"
        style={{ 
          width: GRID_SIZE * 16, 
          height: GRID_SIZE * 16,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute ${
              i === 0 ? 'bg-[#00ffff] z-10' : 'bg-[#ff00ff]'
            }`}
            style={{
              width: '100%',
              height: '100%',
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              boxShadow: i === 0 ? '0 0 10px #00ffff' : 'none'
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-[#ffff00] animate-pulse"
          style={{
            width: '100%',
            height: '100%',
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />

        {/* Overlays */}
        {(gameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 p-4 text-center">
            {gameOver ? (
              <>
                <h2 className="text-3xl font-bold text-[#ff00ff] mb-2 glitch-text tracking-widest">SYSTEM_CRASH</h2>
                <p className="text-[#00ffff] mb-6 text-[12px] uppercase tracking-tighter">ENTITY_COLLISION_DETECTED</p>
                <button 
                  onClick={resetGame}
                  className="px-6 py-2 bg-[#00ffff] text-black hover:bg-[#ff00ff] transition-all duration-100 flex items-center gap-2 font-bold uppercase text-xs"
                >
                  <RefreshCw size={14} />
                  <span>REBOOT_SEQUENCE</span>
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-[#00ffff] mb-2 glitch-text tracking-widest">HALT_STATE</h2>
                <p className="text-[#ff00ff] mb-6 text-[12px] uppercase tracking-tighter">WAITING_FOR_INPUT_STREAM</p>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="px-6 py-2 bg-[#ff00ff] text-black hover:bg-[#00ffff] transition-all duration-100 flex items-center gap-2 font-bold uppercase text-xs"
                >
                  <PlayCircle size={14} />
                  <span>RESUME_PROCESS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 text-[10px] text-[#00ffff]/60 font-mono uppercase tracking-tighter">
        <span>[NAV: ARROWS]</span>
        <span>[INT: SPACE]</span>
      </div>
    </div>
  );
};
