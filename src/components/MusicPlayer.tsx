import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, VolumeX, Radio, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  color: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "VOID_RESONANCE",
    artist: "NULL_POINTER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00ffff"
  },
  {
    id: 2,
    title: "STATIC_DRIFT",
    artist: "BUFFER_OVERFLOW",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "GHOST_IN_SHELL",
    artist: "KERNEL_PANIC",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#ffff00"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("STREAM_ERROR:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSkip = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="w-full max-w-sm bg-black p-6 glitch-border font-mono">
      <div className="flex flex-col items-center">
        {/* Visualizer Placeholder */}
        <div className="w-full h-32 bg-black border border-[#00ffff]/30 mb-6 relative overflow-hidden flex items-end justify-around p-2">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [10, 80, 20, 60, 10] : 5 }}
              transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
              className="w-1 bg-[#00ffff]"
              style={{ opacity: 0.5 + Math.random() * 0.5 }}
            />
          ))}
          <div className="absolute top-2 left-2 text-[8px] text-[#ff00ff] uppercase tracking-widest animate-pulse">
            SIGNAL_STRENGTH: 88%
          </div>
        </div>

        {/* Track Info */}
        <div className="w-full mb-6 border-l-2 border-[#ff00ff] pl-4">
          <motion.div 
            key={currentTrack.id}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-[10px] text-[#00ffff]/60 uppercase">STREAM_ID: {currentTrack.id.toString().padStart(3, '0')}</span>
            <h3 className="text-xl font-bold text-[#00ffff] glitch-text uppercase tracking-widest">
              {currentTrack.title}
            </h3>
            <p className="text-[#ff00ff] text-[12px] font-bold uppercase tracking-tighter">
              SRC: {currentTrack.artist}
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="h-1 w-full bg-[#00ffff]/10 relative">
            <motion.div 
              className="h-full bg-[#00ffff] shadow-[0_0_10px_#00ffff]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-50" />
          </div>
          <div className="flex justify-between mt-1 text-[8px] text-[#00ffff] uppercase">
            <span>{Math.floor(progress)}%_LOADED</span>
            <span>PARITY_CHECK: OK</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => handleSkip('prev')}
            className="text-[#00ffff] hover:text-[#ff00ff] transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className={`w-12 h-12 border-2 flex items-center justify-center transition-all duration-75 ${
              isPlaying 
                ? 'bg-[#00ffff] border-[#00ffff] text-black' 
                : 'bg-black border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff]/10'
            }`}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>

          <button 
            onClick={() => handleSkip('next')}
            className="text-[#00ffff] hover:text-[#ff00ff] transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Meta Info */}
        <div className="mt-6 w-full flex justify-between items-center text-[8px] text-[#00ffff]/40 border-t border-[#00ffff]/20 pt-4">
          <div className="flex items-center gap-1">
            <Radio size={8} />
            <span>ENCRYPTED_LINK</span>
          </div>
          <div className="flex items-center gap-1">
            <Terminal size={8} />
            <span>BIT_RATE: 320KBPS</span>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => handleSkip('next')}
      />
    </div>
  );
};
