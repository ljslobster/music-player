import { MUSIC_ACTIONS } from "../constants/music";


export interface Music {
  id: number;
  path: string;
  title: string;
  currentTime: number;
  cover: string;
  author: string;
  duration: number;
}

export type MusicActions = typeof MUSIC_ACTIONS[keyof typeof MUSIC_ACTIONS];

export interface MusicActionsType {
  type: MusicActions
  payload: number
}