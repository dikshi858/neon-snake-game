import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Cpu, ShieldAlert, Wifi } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#00ffff] font-mono selection:bg-[#ff00ff] selection:text-black">
      {/* Glitch Overlays */}
      <div className="static-noise" />
      <div className="scanline" />
      
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Top Status Bar */}
        <div className="w-full flex justify-between items-center mb-12 border-b border-[#00ffff]/20 pb-2 text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Cpu size={10} /> CORE_TEMP: 42°C</span>
            <span className="flex items-center gap-1 text-[#ff00ff] animate-pulse"><ShieldAlert size={10} /> SECURITY_BREACH_DETECTED</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Wifi size={10} /> UPLINK: STABLE</span>
            <span>USER: UNKNOWN_ENTITY</span>
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-12 relative">
          <motion.h1 
            initial={{ skewX: -20, opacity: 0 }}
            animate={{ skewX: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter uppercase glitch-text mb-2"
          >
            NEON_SNAKE.EXE
          </motion.h1>
          <div className="h-1 w-full bg-[#ff00ff] mb-4" />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="text-[12px] uppercase tracking-[0.3em] text-[#00ffff]"
          >
            [INITIATING_NEURAL_LINK] // [HARVEST_DATA_OR_PERISH]
          </motion.p>
        </header>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start w-full max-w-6xl">
          
          {/* System Logs */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:flex flex-col gap-4"
          >
            <div className="p-4 bg-black border border-[#00ffff]/30 glitch-border">
              <h3 className="text-[10px] font-bold uppercase text-[#ff00ff] mb-3 border-b border-[#ff00ff]/30 pb-1">SYSTEM_LOGS</h3>
              <div className="space-y-2 text-[9px] text-[#00ffff]/70 leading-tight">
                <p>{'>'} BOOTING_KERNEL...</p>
                <p>{'>'} LOADING_SNAKE_MODULE_V4.0</p>
                <p className="text-[#ff00ff]">{'>'} WARNING: BUFFER_OVERFLOW_NEAR</p>
                <p>{'>'} AUDIO_SYNTHESIS_ACTIVE</p>
                <p>{'>'} WAITING_FOR_USER_INPUT...</p>
              </div>
            </div>

            <div className="p-4 bg-black border border-[#ff00ff]/30 glitch-border">
              <h3 className="text-[10px] font-bold uppercase text-[#00ffff] mb-3 border-b border-[#00ffff]/30 pb-1">PROTOCOL_INFO</h3>
              <p className="text-[9px] text-[#ff00ff]/70 leading-relaxed uppercase">
                THE_GRID_IS_YOUR_PRISON. THE_SNAKE_IS_YOUR_WILL. 
                CONSUME_THE_FRAGMENTS. IGNORE_THE_VOICES.
              </p>
            </div>
          </motion.div>

          {/* Core Game */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center"
          >
            <SnakeGame />
          </motion.div>

          {/* Audio Interface */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex justify-center"
          >
            <MusicPlayer />
          </motion.div>
        </div>

        {/* Bottom Terminal */}
        <footer className="mt-16 w-full max-w-4xl border-t border-[#00ffff]/20 pt-4">
          <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-[#00ffff]/40">
            <span>TERMINAL_ID: 0x7F_99_A1</span>
            <span className="animate-pulse">CONNECTED_TO_THE_VOID</span>
            <span>ENCRYPTION: AES-256-GLITCH</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
