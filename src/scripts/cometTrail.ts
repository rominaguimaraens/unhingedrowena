// Minimal canvas particle comet for the whole site
const setupComet = () => {
  const c = document.createElement("canvas");
  c.style.position = "fixed";
  c.style.inset = "0";
  c.style.pointerEvents = "none";
  c.style.zIndex = "100";
  document.body.appendChild(c);
  const ctx = c.getContext("2d")!;
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  const resize = () => {
    c.width = innerWidth * dpr;
    c.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
  };
  resize();
  addEventListener("resize", resize);

  type P = { x:number; y:number; vx:number; vy:number; life:number; };
  const parts:P[] = [];
  let mx = innerWidth/2, my = innerHeight/2;

  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY;
    for (let i=0;i<6;i++){
      parts.push({ x:mx, y:my, vx:(Math.random()-0.5)*1.2, vy:(Math.random()-0.5)*1.2, life: 1 });
    }
  });

  function tick(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (let i=parts.length-1;i>=0;i--){
      const p = parts[i];
      p.x += p.vx; p.y += p.vy; p.life -= 0.016;
      if (p.life<=0){ parts.splice(i,1); continue; }
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,10);
      g.addColorStop(0, "rgba(134,255,244,0.9)");
      g.addColorStop(0.5, "rgba(255,60,199,0.6)");
      g.addColorStop(1, "rgba(170,131,250,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x,p.y,10,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
};
export default setupComet;
