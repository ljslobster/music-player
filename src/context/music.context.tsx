import { createContext, useCallback, useReducer, useRef, useState } from "react";
import musics from "../musics-mock.json";
import { Music } from "../models/music.model";
import { musicReducer } from "../reducers/music.reducer";
import { MUSIC_ACTIONS } from "../constants/music";

const initialMusic = musics[1];

const initialState: Music = {
  path: initialMusic.path,
  id: initialMusic.id,
  title: initialMusic.title,
  currentTime: 0,
  cover: initialMusic.cover,
  author: initialMusic.author,
  duration: initialMusic.duration,
};

interface MusicContextValue {
  state: Music;
  musicRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  handleNextMusic: () => void;
  handlePrevMusic: () => void;
  handleSetCurrentTime: (duration: number) => void;
  handlePlayMusic: () => void;
}

export const MusicContext = createContext({} as MusicContextValue);

export default function MusicPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const musicRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [state, dispatch] = useReducer(musicReducer, initialState);

  const handlePlayMusic = useCallback(() => {
    if (musicRef.current) {
      if (musicRef.current.paused) {
        musicRef.current.play();

        setIsPlaying(true);
      } else {
        musicRef.current.pause();

        setIsPlaying(false);
      }
    }

    console.log('play audio');
  }, []);
  
  const handleNextMusic = useCallback(() => {
    dispatch({ type: MUSIC_ACTIONS.NEXT_MUSIC, payload: 0 });
  }, []);
  
  const handlePrevMusic = useCallback(() => {
    dispatch({ type: MUSIC_ACTIONS.PREV_MUSIC, payload: 0 });
  }, []);
  
  const handleSetCurrentTime = useCallback(
    (duration: number) => {
      if (!musicRef.current) return;

      dispatch({
        type: MUSIC_ACTIONS.SET_CURRENT_TIME,
        payload: duration,
      });
      
      if (duration % 1 === 0) {
        musicRef.current.currentTime = duration;
      }
      
      if (duration === musicRef.current.duration) {
        handleNextMusic();
      }
    },
    [handleNextMusic]
  );

  musicRef.current ? musicRef.current.volume = 0.05 : null;

  return (
    <MusicContext.Provider
      value={{
        state,
        isPlaying,
        musicRef,
        handleNextMusic,
        handlePrevMusic,
        handleSetCurrentTime,
        handlePlayMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
