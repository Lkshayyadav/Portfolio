'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface SpriteSet {
  [key: string]: [number, number][];
}

const SPRITE_SETS: SpriteSet = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

// Gentle, cute walking speed
const NEKO_SPEED = 8;
const FRAME_TIME = 120; // ms per animation frame

type CatState = 'following' | 'resting' | 'going_home' | 'at_home';

export default function OnekoCat() {
  const nekoRef = useRef<HTMLDivElement>(null);
  
  const nekoPos = useRef<Position>({ x: 120, y: 120 });
  const targetPos = useRef<Position>({ x: 120, y: 120 });
  
  const [catState, setCatState] = useState<CatState>('following');
  const [displayPos, setDisplayPos] = useState<Position>({ x: 120, y: 120 });

  const catStateRef = useRef<CatState>(catState);
  catStateRef.current = catState;

  const frameCount = useRef(0);
  const idleTime = useRef(0);
  const idleAnimation = useRef<string | null>(null);
  const idleAnimationFrame = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number | null>(null);

  const setSprite = (name: string, frame: number) => {
    if (!nekoRef.current) return;
    const spriteSet = SPRITE_SETS[name] || SPRITE_SETS.idle;
    const sprite = spriteSet[frame % spriteSet.length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  };

  const handleIdle = () => {
    idleTime.current += 1;

    if (idleTime.current > 10 && Math.floor(Math.random() * 100) === 0 && !idleAnimation.current) {
      const avail = ["sleeping", "scratchSelf"];
      if (nekoPos.current.x < 32) avail.push("scratchWallW");
      if (nekoPos.current.y < 32) avail.push("scratchWallN");
      if (nekoPos.current.x > window.innerWidth - 32) avail.push("scratchWallE");
      if (nekoPos.current.y > window.innerHeight - 32) avail.push("scratchWallS");

      idleAnimation.current = avail[Math.floor(Math.random() * avail.length)];
      idleAnimationFrame.current = 0;
    }

    if (idleAnimation.current === "sleeping") {
      if (idleAnimationFrame.current < 8) {
        setSprite("tired", 0);
      } else {
        setSprite("sleeping", Math.floor(idleAnimationFrame.current / 4));
      }
      if (idleAnimationFrame.current > 192) {
        idleAnimation.current = null;
      }
    } else if (idleAnimation.current && idleAnimation.current.startsWith("scratch")) {
      setSprite(idleAnimation.current, idleAnimationFrame.current);
      if (idleAnimationFrame.current > 9) {
        idleAnimation.current = null;
      }
    } else {
      setSprite("idle", 0);
    }
    idleAnimationFrame.current += 1;
  };

  const tick = () => {
    frameCount.current += 1;

    // Handle home target
    if (catStateRef.current === 'going_home') {
      targetPos.current = { x: 48, y: 48 };
    }

    // Handle resting or sleeping at home
    if (catStateRef.current === 'resting' || catStateRef.current === 'at_home') {
      setSprite("sleeping", Math.floor(frameCount.current / 4));
      return;
    }

    const diffX = nekoPos.current.x - targetPos.current.x;
    const diffY = nekoPos.current.y - targetPos.current.y;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    // Arrived at target
    if (distance < NEKO_SPEED || distance < 16) {
      if (catStateRef.current === 'going_home') {
        setCatState('at_home');
        setSprite("sleeping", 0);
        return;
      }
      handleIdle();
      return;
    }

    // Moving & Running legs animation
    idleAnimation.current = null;
    idleAnimationFrame.current = 0;

    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";

    // Animate leg frames (alternates between frame 0 & 1)
    setSprite(direction, Math.floor(frameCount.current / 2));

    const newX = nekoPos.current.x - (diffX / distance) * NEKO_SPEED;
    const newY = nekoPos.current.y - (diffY / distance) * NEKO_SPEED;

    const clampedX = Math.min(Math.max(16, newX), window.innerWidth - 16);
    const clampedY = Math.min(Math.max(16, newY), window.innerHeight - 16);

    nekoPos.current = { x: clampedX, y: clampedY };
    setDisplayPos({ x: clampedX, y: clampedY });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (catStateRef.current === 'following') {
        targetPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const loop = (timestamp: number) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;
      if (timestamp - lastTimestamp.current > FRAME_TIME) {
        lastTimestamp.current = timestamp;
        tick();
      }
      animationFrameId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Click on Cat -> Toggle Rest vs Follow
  const handleCatClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (catStateRef.current === 'resting' || catStateRef.current === 'at_home') {
      setCatState('following');
    } else {
      setCatState('resting');
    }
  }, []);

  // Click on Cat House Widget -> Toggle Send Home vs Call Back
  const handleHouseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (catStateRef.current === 'at_home' || catStateRef.current === 'going_home') {
      setCatState('following');
    } else {
      setCatState('going_home');
    }
  }, []);

  return (
    <>
      {/* Cat House Widget on Top Left */}
      <div 
        onClick={handleHouseClick}
        className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[2147483646] pointer-events-auto cursor-pointer select-none scale-90 sm:scale-100 origin-top-left"
        title={catState === 'at_home' || catState === 'going_home' ? "Click to call cat back!" : "Click to send cat home!"}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2.5 shadow-lg flex items-center space-x-3"
        >
          {/* House Window & Wings */}
          <div className="relative w-9 h-9 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
            {/* Animated Wings */}
            <motion.span
              animate={{ rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="absolute -left-2 top-1 text-xs"
            >
              🪽
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="absolute -right-2 top-1 text-xs"
            >
              🪽
            </motion.span>
            
            <span className="text-lg">🏠</span>
            
            {catState === 'at_home' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 text-xs"
              >
                💤
              </motion.span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
              Cat Home {catState === 'at_home' && <span className="text-emerald-500 text-[10px]">(Sleeping 💤)</span>}
            </span>
            <span className="text-[9px] text-neutral-500 dark:text-neutral-400">
              {catState === 'going_home' ? 'Running home...' : catState === 'at_home' ? 'Click to call cat back' : 'Click to send cat home'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Cat Sprite */}
      <div
        ref={nekoRef}
        onClick={handleCatClick}
        title={catState === 'resting' ? "Click to wake cat up!" : "Click to make cat nap here!"}
        style={{
          width: '32px',
          height: '32px',
          position: 'fixed',
          pointerEvents: 'auto',
          cursor: 'pointer',
          imageRendering: 'pixelated',
          left: `${displayPos.x - 16}px`,
          top: `${displayPos.y - 16}px`,
          zIndex: 2147483647,
          backgroundImage: 'url(/oneko.gif)',
        }}
      />
    </>
  );
}