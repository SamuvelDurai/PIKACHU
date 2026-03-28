/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Gift, 
  Sparkles,
  Cake,
  Clock,
  Calendar,
  Star,
  Smile,
  Zap,
  Heart,
  Flame,
  Utensils,
  Coffee,
  Film,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

const INSIDE_JOKES = [
  "For being the best person i ever met ❤️",
  "For all the deep talks 🌙",
  "For that Caring of yours",
  "For always knowing how to make me laugh 😂",
  "For being the most loyal friend ever ❤️",
  "For your Kind Character",
  "For being my sunshine on rainy days ☀️"
];

const VOUCHERS = [
  { title: "Ice cream Treat🍦", desc: "I will give you icecream!", icon: <Utensils className="text-orange-400" /> },
  { title: "Ice Cream Treat🍦", desc: "I will give you icecream!", icon: <Film className="text-blue-400" /> },
  { title: "Food Treat", desc: "I will treat you with your fav food", icon: <Coffee className="text-amber-600" /> },
];

const BirthdayCake = ({ onBlowOut }: { onBlowOut: () => void }) => {
  const [blown, setBlown] = useState(false);
  const [candles, setCandles] = useState(Array(20).fill(true));

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    
    // Staggered blowout with slight randomness for a more natural "breath" feel
    candles.forEach((_, i) => {
      const delay = i * 35 + Math.random() * 150;
      setTimeout(() => {
        setCandles(prev => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      }, delay);
    });

    // Trigger confetti after a short delay when most candles are out
    setTimeout(onBlowOut, 700);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      <div className="relative cursor-pointer group" onClick={handleBlow}>
        {/* Sparkles around the cake while lit */}
        {!blown && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5],
                  x: [0, (Math.random() - 0.5) * 160],
                  y: [0, (Math.random() - 0.5) * 160]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 + Math.random() * 2, 
                  delay: Math.random() * 3 
                }}
                className="absolute top-1/2 left-1/2"
              >
                <Sparkles className="w-3 h-3 text-party-gold/30" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Wind Visual Effect */}
        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{ x: -200, opacity: 0, scaleY: 0.5 }}
              animate={{ x: 400, opacity: [0, 0.5, 0], scaleY: 1.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/5 blur-3xl rounded-full pointer-events-none z-40"
            />
          )}
        </AnimatePresence>

        {/* Cake Glow - fades out when candles are blown */}
        <AnimatePresence>
          {!blown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-party-gold/30 rounded-full blur-[60px] pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        {/* Candles */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 w-48 z-10">
          {candles.map((isLit, i) => (
            <div key={i} className="relative">
              <motion.div
                animate={{ 
                  height: isLit ? 24 : 18,
                  backgroundColor: isLit ? "#ff69b4" : "#4a5568" 
                }}
                className="w-1.5 rounded-full relative"
              >
                <AnimatePresence>
                  {isLit ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                        rotate: [0, 5, -5, 0]
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: Math.random() }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                    >
                      <Flame className="w-4 h-4 text-party-gold fill-party-gold" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="smoke"
                      initial={{ y: 0, opacity: 0.8, scale: 0.5 }}
                      animate={{ 
                        y: [-10, -50, -80], 
                        x: [0, 15, -15, 10],
                        opacity: [0.8, 0.3, 0], 
                        scale: [0.5, 1.8, 2.5] 
                      }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/10 rounded-full blur-[3px]"
                    />
                  )}
                </AnimatePresence>
                {/* Candle Wick */}
                <div className="w-0.5 h-1.5 bg-gray-800/60 absolute -top-1 left-1/2 -translate-x-1/2 rounded-full" />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Cake Layers with Frosting Details */}
        <div className="flex flex-col items-center relative z-5">
          {/* Frosting Drips */}
          <div className="absolute top-8 left-0 right-0 flex justify-around px-4 z-20 pointer-events-none">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-2 h-4 bg-white/30 rounded-full" style={{ marginTop: i % 2 === 0 ? '0px' : '6px' }} />
             ))}
          </div>

          <div className="w-32 h-12 bg-white/20 rounded-t-xl border-x-4 border-t-4 border-white/30 relative overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-2 bg-white/10" />
             {!blown && (
               <motion.div 
                 animate={{ opacity: [0.1, 0.3, 0.1] }} 
                 transition={{ repeat: Infinity, duration: 2 }} 
                 className="absolute inset-0 bg-party-gold/10 blur-md" 
               />
             )}
          </div>
          <div className="w-48 h-16 bg-white/10 rounded-t-xl border-x-4 border-t-4 border-white/20 -mt-2 relative overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-2 bg-white/10" />
             {!blown && (
               <motion.div 
                 animate={{ opacity: [0.05, 0.2, 0.05] }} 
                 transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} 
                 className="absolute inset-0 bg-party-gold/10 blur-md" 
               />
             )}
          </div>
          <div className="w-64 h-20 bg-white/5 rounded-t-xl border-x-4 border-t-4 border-white/10 -mt-2 relative overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-2 bg-white/10" />
             {!blown && (
               <motion.div 
                 animate={{ opacity: [0.02, 0.1, 0.02] }} 
                 transition={{ repeat: Infinity, duration: 2, delay: 1 }} 
                 className="absolute inset-0 bg-party-gold/10 blur-md" 
               />
             )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <motion.p 
            animate={blown ? { scale: [1, 1.1, 1] } : {}}
            className="text-sm font-bold uppercase tracking-widest text-party-gold animate-pulse"
          >
            {blown ? "WISH GRANTED! ✨" : "Make a wish & click to blow! 🎂"}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const LightningClick = () => {
  const [bolts, setBolts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setBolts(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBolts(prev => prev.filter(b => b.id !== id));
      }, 500);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {bolts.map(bolt => (
          <motion.div
            key={bolt.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2, rotate: [0, 45, -45, 0] }}
            exit={{ opacity: 0 }}
            style={{ left: bolt.x - 20, top: bolt.y - 20 }}
            className="absolute"
          >
            <Zap className="w-10 h-10 text-party-gold fill-party-gold drop-shadow-[0_0_10px_#ffd700]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Components ---

const ConfettiBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        const colors = ['#ff007f', '#ffd700', '#ffffff', '#2d004d'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // React to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          this.x -= dx * force * 0.05;
          this.y -= dy * force * 0.05;
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [surprised, setSurprised] = useState(false);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [showFinale, setShowFinale] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [pikachuMode, setPikachuMode] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Initialization ---
  useEffect(() => {
    // Carousel timer
    const interval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % INSIDE_JOKES.length);
    }, 4000);

    // Entrance sequence
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setSurprised(true);
        triggerConfetti(0.5, { spread: 70, origin: { y: 0.6 } });
      }, 500);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const triggerConfetti = (scalar = 1, options = {}) => {
    confetti({
      particleCount: Math.floor(150 * scalar),
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#ffd700', '#ffffff'],
      ...options
    });
  };

  const playSound = (type: 'pop' | 'tada' | 'cheer' | 'whoosh') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'tada') {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.5);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(ctx.currentTime + i * 0.1);
        o.stop(ctx.currentTime + i * 0.1 + 0.5);
      });
    } else if (type === 'whoosh') {
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      noise.connect(filter);
      filter.connect(g);
      g.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 0.5);
    }
  };

  const handleFinale = () => {
    setShowFinale(true);
    playSound('tada');
    
    // Massive confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // --- Renderers ---

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-party-purple z-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mb-8"
        >
          <Cake className="w-20 h-20 text-party-pink" />
        </motion.div>
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-full bg-party-pink shadow-[0_0_15px_rgba(255,0,127,0.8)]"
          />
        </div>
        <p className="mt-4 font-mono text-party-gold animate-pulse">PREPARING THE PARTY...</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen relative pb-20 transition-colors duration-1000",
      pikachuMode ? "bg-[#2d2d00]" : "bg-party-purple"
    )}>
      <ConfettiBackground />
      <LightningClick />
      
      {/* Pikachu Mode Toggle */}
      <button 
        onClick={() => {
          setPikachuMode(!pikachuMode);
          if (!pikachuMode) playSound('pop');
        }}
        className={cn(
          "fixed top-6 left-6 z-40 p-3 glass transition-all rounded-full flex items-center gap-2 px-4",
          pikachuMode ? "bg-party-gold text-party-purple" : "hover:bg-white/20"
        )}
      >
        <Zap className={cn("w-5 h-5", pikachuMode && "fill-current")} />
        <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">
          {pikachuMode ? "Pikachu Mode ON" : "Pikachu Mode"}
        </span>
      </button>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16">
          <motion.h1
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "text-4xl sm:text-6xl md:text-8xl font-black mb-4 tracking-tighter select-none cursor-default",
              showFinale ? "text-party-gold" : "text-white"
            )}
          >
            {showFinale ? (
              <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }}>
                YOU ARE THE BEST! 👑
              </motion.span>
            ) : (
              <span className="flex items-center justify-center gap-4">
                {pikachuMode && <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-party-gold fill-party-gold animate-pulse" />}
                SURPRISE, PIKACHU💛 💗!
                {pikachuMode && <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-party-gold fill-party-gold animate-pulse" />}
              </span>
            )}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-party-pink font-medium neon-text mb-8"
          >
            {showFinale ? "HAPPY 20TH BIRTHDAY TO MY FAVORITE HUMAN!" : "Happy Birthday 💗! It's time to celebrate! ✨"}
          </motion.p>
        </section>

        {/* Carousel Section */}
        <section className="max-w-2xl mx-auto mb-20">
          <div className="glass p-8 text-center relative overflow-hidden">
            <div className="absolute top-2 left-2 opacity-20"><Sparkles /></div>
            <div className="absolute bottom-2 right-2 opacity-20"><Sparkles /></div>
            
            <h3 className="text-xs uppercase tracking-[0.3em] text-party-gold mb-6 font-bold">Why You're Awesome</h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={jokeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-2xl md:text-3xl font-bold italic glitch"
                data-text={INSIDE_JOKES[jokeIndex]}
              >
                {INSIDE_JOKES[jokeIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Stats Section: 20 Years of Awesome */}
        <section className="max-w-4xl mx-auto mb-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
            <Clock className="text-party-gold" />
            20 Years of Awesome
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Years", value: "20", icon: <Star className="text-party-pink" /> },
              { label: "Months", value: "240", icon: <Calendar className="text-party-gold" /> },
              { label: "Weeks", value: "1,043", icon: <Zap className="text-blue-400" /> },
              { label: "Days", value: "7,305", icon: <Smile className="text-green-400" /> },
              { label: "Hours", value: "175,320", icon: <Clock className="text-purple-400" /> },
              { label: "Minutes", value: "10.5M+", icon: <Sparkles className="text-party-pink" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 text-center flex flex-col items-center justify-center gap-2 hover:bg-white/20 transition-all cursor-default"
              >
                <div className="p-2 bg-white/5 rounded-full mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-party-pink font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Gift Section */}
        <section className="max-w-2xl mx-auto mb-20 px-4">
          <div className="glass p-10 text-center relative overflow-hidden group">
            <AnimatePresence mode="wait">
              {!giftOpened ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-6"
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex justify-center"
                  >
                    <Gift className="w-24 h-24 text-party-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">You have a special delivery!</h3>
                  <p className="text-white/60">Click the gift to unwrap a heartfelt message.</p>
                  <button
                    onClick={() => {
                      setGiftOpened(true);
                      playSound('pop');
                      triggerConfetti(0.4);
                    }}
                    className="bg-party-gold text-party-purple font-black px-8 py-3 rounded-full hover:scale-105 transition-transform active:scale-95"
                  >
                    UNWRAP GIFT 🎁
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="opened"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 py-4"
                >
                  <div className="flex justify-center">
                    <Heart className="w-20 h-20 text-party-pink fill-party-pink animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black text-party-pink neon-text">To My PIKACHU💛 ,</h3>
                  <p className="text-lg leading-relaxed italic">
                    "You are my Favourite person💗; you are a constant source of joy and inspiration. 
                    May your 20th year be as bright and beautiful as your smile. 
                    Thank you for being exactly who you are. HAPPY BIRTHDAY PIKACHU💛"
                  </p>
                  <div className="text-party-gold font-bold tracking-widest uppercase text-sm">Forever Grateful ❤️</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Voucher Book Section */}
        <section className="max-w-4xl mx-auto mb-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
            <ShoppingBag className="text-party-pink" />
            Pikachu's Mystery Vouchers
          </h2>
          
          <div className={cn(
            "grid gap-6 transition-all duration-500",
            selectedVoucher === null ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 max-w-md mx-auto"
          )}>
            {VOUCHERS.map((voucher, i) => {
              const isSelected = selectedVoucher === i;
              const hasSelected = selectedVoucher !== null;

              if (hasSelected && !isSelected) return null;

              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={!hasSelected ? { y: -5, scale: 1.02 } : {}}
                  onClick={() => {
                    if (!hasSelected) {
                      setSelectedVoucher(i);
                      playSound('pop');
                      triggerConfetti(0.3);
                    }
                  }}
                  className={cn(
                    "glass p-8 border-2 border-dashed transition-all cursor-pointer relative overflow-hidden",
                    !hasSelected 
                      ? "border-white/20 hover:border-party-gold/50" 
                      : "border-party-gold shadow-[0_0_30px_rgba(255,215,0,0.4)] bg-white/10"
                  )}
                >
                  {!hasSelected ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-party-gold/20 transition-colors">
                        <Gift className="w-8 h-8 text-party-gold/40" />
                      </div>
                      <h4 className="font-black text-2xl text-white/90 tracking-tighter">COUPON {i + 1}</h4>
                      <p className="text-[10px] text-party-pink mt-3 font-black tracking-[0.2em] uppercase">Click to Reveal ✨</p>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-6">
                        <div className="p-5 bg-party-gold/20 rounded-2xl ring-4 ring-party-gold/10">
                          {React.cloneElement(voucher.icon as React.ReactElement, { className: "w-10 h-10" })}
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{voucher.title}</h3>
                      <p className="text-party-pink font-medium italic mb-6">"{voucher.desc}"</p>
                      
                      <div className="pt-6 border-t border-white/10">
                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-party-gold mb-2">
                          Wish Granted Successfully
                        </div>
                        <div className="flex justify-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 text-party-gold fill-party-gold" />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Birthday Cake Section */}
        <section className="max-w-2xl mx-auto mb-20">
          <BirthdayCake onBlowOut={() => {
            playSound('whoosh');
            setTimeout(() => playSound('pop'), 400);
            triggerConfetti(0.8, { spread: 100, particleCount: 200 });
          }} />
        </section>

        {/* Finale Button Section */}
        <section className="text-center py-20">
          {!showFinale ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFinale}
              className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-party-pink to-party-gold group-hover:from-party-pink group-hover:to-party-gold hover:text-white focus:ring-4 focus:outline-none focus:ring-party-pink/50"
            >
              <span className="relative px-6 sm:px-10 py-4 sm:py-5 transition-all ease-in duration-75 bg-party-purple rounded-full group-hover:bg-opacity-0 text-white text-xl sm:text-2xl font-black flex items-center gap-3">
                <Gift className="w-8 h-8" />
                Click for Final Surprise 🎁
              </span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-center gap-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="text-4xl"
                  >
                    🎈
                  </motion.div>
                ))}
              </div>
              <h2 className="text-4xl font-black text-party-gold neon-text">
                Happy Birthday! 🎉
Thank you for being such an incredible person. You truly deserve all the happiness in the universe.
May your day be filled with joy, laughter, and everything you’ve been wishing for. 💖
! 🚀✨
              </h2>
            </motion.div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center text-white/20 text-xs py-10 font-mono">
        MADE WITH ❤️ FOR PIKACHU💛💗 • 2026
      </footer>

      {/* Floating Balloons Animation for Finale */}
      <AnimatePresence>
        {showFinale && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "110vh", x: `${Math.random() * 100}vw`, rotate: 0 }}
                animate={{ 
                  y: "-20vh", 
                  x: `${Math.random() * 100}vw`,
                  rotate: Math.random() * 360 
                }}
                transition={{ 
                  duration: Math.random() * 4 + 3, 
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute text-6xl"
              >
                {['🎈', '🎉', '✨', '🎂', '💖'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
