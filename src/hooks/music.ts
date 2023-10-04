import { useContext } from "react";
import { MusicContext } from "../context/music.context";

export function useMusic() {
  const state = useContext(MusicContext);

  if (!state) {
    throw new Error("useMusic must be used within a MusicProvider");
  }

  return state;
}