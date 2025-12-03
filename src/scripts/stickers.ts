export default function setupStickers(container: HTMLElement) {
  const save = () => localStorage.setItem("stickers", container.innerHTML);
  const load = () => {
    const html = localStorage.getItem("stickers");
    if (html) container.innerHTML = html;
  };

  const initialized = container.dataset.stickersInit === "true";
  if (!initialized) {
    load();
  }
  container.dataset.stickersInit = "true";

  container.querySelectorAll<HTMLElement>(".sticker").forEach((el) => {
    if (el.dataset.stickerBound === "true") return;
    bind(el);
    el.dataset.stickerBound = "true";
  });

  if (container.dataset.resetBound !== "true") {
    const resetBtn = container.querySelector("#reset-stickers") as HTMLButtonElement | null;
    resetBtn?.addEventListener("click", () => {
      container.querySelectorAll(".sticker").forEach((s) => s.remove());
      localStorage.removeItem("stickers");
      location.reload();
    });
    container.dataset.resetBound = "true";
  }

  function bind(el: HTMLElement) {
    el.style.position = "absolute";
    let ox = 0, oy = 0, dx = 0, dy = 0, drag = false;

    const onDown = (e: PointerEvent) => {
      drag = true;
      el.setPointerCapture(e.pointerId);
      ox = e.clientX;
      oy = e.clientY;
      const r = el.getBoundingClientRect();
      dx = r.left;
      dy = r.top;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const nx = dx + (e.clientX - ox);
      const ny = dy + (e.clientY - oy);
      el.style.left = `${nx}px`;
      el.style.top = `${ny}px`;
    };
    const onUp = (e: PointerEvent) => {
      drag = false;
      el.releasePointerCapture(e.pointerId);
      save();
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
  }
}
