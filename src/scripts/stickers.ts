export default function setupStickers(container: HTMLElement){
  const save = () => localStorage.setItem("stickers", container.innerHTML);
  const load = () => {
    const html = localStorage.getItem("stickers");
    if (html) container.innerHTML = html;
  };
  load();

  container.querySelectorAll<HTMLElement>(".sticker").forEach(bind);

  function bind(el: HTMLElement){
    el.style.position = "absolute";
    let ox=0, oy=0, dx=0, dy=0, drag=false;

    const onDown = (e: PointerEvent) => {
      drag = true; el.setPointerCapture(e.pointerId);
      ox = e.clientX; oy = e.clientY;
      const r = el.getBoundingClientRect();
      dx = r.left; dy = r.top;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const nx = dx + (e.clientX-ox);
      const ny = dy + (e.clientY-oy);
      el.style.left = `${nx}px`; el.style.top = `${ny}px`;
    };
    const onUp = (e: PointerEvent) => { drag=false; el.releasePointerCapture(e.pointerId); save(); };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
  }

  (container.querySelector("#reset-stickers") as HTMLButtonElement)?.addEventListener("click", ()=>{
    container.querySelectorAll(".sticker").forEach(s=>s.remove());
    localStorage.removeItem("stickers"); location.reload();
  });
}
