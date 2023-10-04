type minutes = `${string}${string}:${string}${string}`;

export function secondsToMinutes(seconds: number): minutes {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${secondsLeft
    .toString()
    .padStart(2, "0")}`;
}
