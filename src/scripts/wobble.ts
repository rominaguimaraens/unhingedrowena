export default function wobble(selector = "[data-wobble]"){
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  els.forEach((el)=>{
    const r = (Math.random()*4 - 2).toFixed(2);
    const s = (Math.random()*2 - 1).toFixed(2);
    el.style.transform = `rotate(${r}deg) skew(${s}deg)`;
  });
}
