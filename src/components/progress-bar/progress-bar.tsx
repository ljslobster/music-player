import { useEffect, useRef } from "react";
import progress from "./progress-bar.module.css";
import { secondsToMinutes } from "../../utils";
import { useMusic } from "../../hooks/music";

export const ProgressBar = () => {
  const { state: currentMusic, handleSetCurrentTime } = useMusic();
  const inputRef = useRef<HTMLInputElement>(null);

  const { duration, currentTime } = currentMusic;

  const durationMinutes = secondsToMinutes(Math.floor(duration));
  const currentTimeMinutes = secondsToMinutes(Math.floor(currentTime));

  useEffect(() => {
    const percentage = (currentTime / duration) * 100;
    if (inputRef.current) {
      inputRef.current.style.setProperty("--progress", `${percentage}%`);
    }
  }, [currentTime, duration]);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetCurrentTime(parseInt(event.target.value));
  };
  
  return (
    <section className={progress.container}>
      <header className={progress.header}>
        <span className={progress.minute}>{currentTimeMinutes}</span>
        <span className={progress.minute}>{durationMinutes}</span>
      </header>
      <input
        type="range"
        min={0}
        max={currentMusic.duration}
        onChange={handleProgressChange}
        value={currentMusic.currentTime}
        className={progress.main}
        ref={inputRef}
      />
    </section>
  );
};
