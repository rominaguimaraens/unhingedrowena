import confetti from "canvas-confetti";

export const konami = (() => {
  const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let idx = 0;
  return () => {
    const onKey = (e: KeyboardEvent) => {
      idx = (e.key === seq[idx]) ? idx+1 : 0;
      if (idx === seq.length) {
        document.body.classList.add("scanlines-toggle");
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.2 } });
        setTimeout(()=>document.location.assign("/bios"), 900);
        idx = 0;
      }
    };
    window.addEventListener("keydown", onKey);
  };
})();

export const voidPortal = () => {
  let typed = "";
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) return;
    typed += e.key.toUpperCase();
    if (typed.endsWith("VOID")) {
      const dlg = document.createElement("dialog");
      dlg.style.padding = "0";
      dlg.innerHTML = `
        <div style="background:#0f0a0f;border:1px solid rgba(134,255,244,0.4);padding:20px 24px;border-radius:12px;min-width:320px">
          <h3 style="font-family:var(--font-display);margin:0 0 10px">enter the void?</h3>
          <p style="margin:0 0 16px;color:var(--muted)">sparkly pixel tunnel not responsible for time dilation</p>
          <button id="close" class="btn-jelly">ok cool</button>
        </div>`;
      document.body.appendChild(dlg);
      // basic glitter pop
      confetti({ particleCount: 50, spread: 70 });
      (dlg.querySelector("#close") as HTMLButtonElement).onclick = () => dlg.close();
      dlg.addEventListener("close", ()=> dlg.remove());
      dlg.showModal();
    }
  });
};
