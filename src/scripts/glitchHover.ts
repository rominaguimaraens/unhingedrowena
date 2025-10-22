const registerGlitchHover = (selector = ".glitchy") => {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;
  els.forEach((el) => {
    el.addEventListener("pointerenter", () => {
      el.style.setProperty("filter", "hue-rotate(" + (Math.random()*60-30).toFixed(1) + "deg)");
    });
    el.addEventListener("pointerleave", () => {
      el.style.removeProperty("filter");
    });
  });
};
export default registerGlitchHover;
