export const musicPlay = (src) => {
  const audio = new Audio(src);
  audio.play();
};