import { MUSIC_ACTIONS } from "../constants/music";
import musics from "../musics-mock.json"
import { Music, MusicActionsType } from "../models/music.model";

export function musicReducer(state: Music, action: MusicActionsType): Music {
  const { type, payload } = action;

  if (type === MUSIC_ACTIONS.NEXT_MUSIC) {
    const currentMusicIndex = musics.findIndex(music => music.id === state.id);
    const nextMusic = musics[currentMusicIndex + 1] ?? musics[0];

    return {
      ...nextMusic,
      currentTime: 0
    }
  }

  if (type === MUSIC_ACTIONS.PREV_MUSIC) {
    const currentMusicIndex = musics.findIndex(music => music.id === state.id);
    const prevMusic = musics[currentMusicIndex - 1] ?? musics[musics.length - 1];

    return {
      ...prevMusic,
      currentTime: 0
    }
  }

  if (type === MUSIC_ACTIONS.SET_CURRENT_TIME) {
    return {
      ...state,
      currentTime: payload,
    }
  }




  return state;
}
