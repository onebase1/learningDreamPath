import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface QuizAudioProgressProps {
  audioUrl: string;
}

const QuizAudioProgress: React.FC<QuizAudioProgressProps> = ({ audioUrl }) => {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.error('Audio autoplay failed:', error);
        }
      };
      
      if (isFirstRender.current) {
        playAudio();
        isFirstRender.current = false;
      }

      const updateProgress = () => {
        if (audio) {
          const currentTime = audio.currentTime || 0;
          const duration = audio.duration || 1;
          const value = (currentTime / duration) * 100;
          setProgress(value);
        }
      };

      audio.addEventListener('timeupdate', updateProgress);
      
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [audioUrl]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMutedState = !isMuted;
      audio.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="w-[200px] rounded-lg overflow-hidden">
      {/* Audio visualization section */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-center space-x-1">
          <div className="w-1 h-4 bg-gray-400"></div>
          <div className="w-1 h-6 bg-gray-400"></div>
          <div className="w-1 h-3 bg-gray-400"></div>
          <div className="w-1 h-5 bg-gray-400"></div>
        </div>
      </div>
      
      {/* Volume control section with black background */}
      <div className="bg-black p-2 flex items-center justify-end space-x-2">
        <button
          onClick={toggleMute}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <audio
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        autoPlay
      />
    </div>
  );
};

export default QuizAudioProgress;