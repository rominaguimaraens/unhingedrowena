const combo = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"] as const;
export type KonamiCallback = () => void;

export const registerKonami = (handler: KonamiCallback) => {
  let idx = 0;
  const listener = (event: KeyboardEvent) => {
    idx = event.key === combo[idx] ? idx + 1 : 0;
    if (idx === combo.length) {
      handler();
      idx = 0;
    }
  };
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
};

export default registerKonami;
