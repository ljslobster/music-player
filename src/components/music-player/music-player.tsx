import music from "./music-player.module.css";
import { ProgressBar } from "../progress-bar/progress-bar";
import { useMusic } from "../../hooks/music";
import { Next, Pause, Play, Prev } from "../icons";
import { useEffect } from "react";

export default function MusicPlayer() {
  const {
    state: currentMusic,
    musicRef,
    handlePrevMusic,
    handleNextMusic,
    handlePlayMusic,
    isPlaying,
    handleSetCurrentTime,
  } = useMusic();

  useEffect(() => {
    if (isPlaying) {
      musicRef.current?.play();
    } 
  }, [currentMusic.id, isPlaying, musicRef])

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    handleSetCurrentTime(event.currentTarget.currentTime);
  };


  return (
    <article className={music.container}>
      <img
        src={currentMusic.cover}
        alt={`${currentMusic.title} cover`}
        className={music.cover}
        loading="lazy"
      />
      <aside>
        <h2 className={music.title}>{currentMusic.title}</h2>
        <p className={music.author}>{currentMusic.author}</p>
      </aside>
      <ProgressBar />
      <section className={music.controls}>
        <button className={music.prev} onClick={handlePrevMusic}>
          <Prev />
        </button>
        <button className={music.play} onClick={handlePlayMusic}>
          {
            isPlaying ? <Pause /> : <Play />
          }
        </button>
        <button className={music.next} onClick={handleNextMusic}>
          <Next />
        </button>
      </section>
      <audio
        src={currentMusic.path}
        onTimeUpdate={handleTimeUpdate}
        ref={musicRef}
      ></audio>
    </article>
  );
}
