import {
  useCallback,
  useEffect,
  useRef,
} from "react";
import progress from "./progress-bar.module.css";
import { secondsToMinutes } from "../../utils";
import { useMusic } from "../../hooks/music";

export const ProgressBar = () => {
  const { state: currentMusic, handleSetCurrentTime } = useMusic();

  const { duration, currentTime } = currentMusic;

  const barRef = useRef<HTMLDivElement>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const durationMinutes = secondsToMinutes(Math.floor(duration));
  const currentTimeMinutes = secondsToMinutes(Math.floor(currentTime));

  const applyPercentage = (percentage: number) => {
    if (!barRef.current) return;

    barRef.current.style.width = `${percentage * 100}%`;
  };

  useEffect(() => {
    const percentage = currentTime / duration;

    applyPercentage(percentage);
  }, [currentTime, duration]);

  const handleMouseDown = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !barContainerRef.current) return;

    const movePos = event.nativeEvent.offsetX;
    const barWidth = barContainerRef.current.clientWidth;
    const percentage = movePos / barWidth;
    const newTime = Math.round(duration * percentage);

    handleSetCurrentTime(newTime);

    applyPercentage(percentage);
  };

  return (
    <section className={progress.container}>
      <header className={progress.header}>
        <span className={progress.minute}>{currentTimeMinutes}</span>
        <span className={progress.minute}>{durationMinutes}</span>
      </header>
      <main
        className={progress.main}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={barContainerRef}
      >
        <div className={progress.bar} ref={barRef}></div>
      </main>
    </section>
  );
};