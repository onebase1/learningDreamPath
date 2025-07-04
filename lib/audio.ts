// /lib/audio.ts
let warningAudio: HTMLAudioElement | null = null;

export const playTimeWarningBeep = (duration = 10000) => {
  // Prevent multiple instantiations if already playing
  if (warningAudio) return;

  warningAudio = new Audio("/sounds/time-warning.mp3");
  warningAudio.loop = true;
  warningAudio.play().catch((err) => {
    console.error("Failed to play warning sound:", err);
  });

  // Stop the audio after the specified duration (default 10 seconds)
  setTimeout(() => {
    if (warningAudio) {
      warningAudio.pause();
      warningAudio.currentTime = 0;
      warningAudio = null;
    }
  }, duration);
};