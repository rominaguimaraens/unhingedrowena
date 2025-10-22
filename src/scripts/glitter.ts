export default function glitter(){
  const c = document.createElement("canvas");
  Object.assign(c.style, { position:"fixed", inset:"0", pointerEvents:"none", zIndex:"3" });
  document.body.appendChild(c);
  const ctx = c.getContext("2d")!;
  let W=innerWidth, H=innerHeight, dpr=Math.max(1, devicePixelRatio||1);
  function resize(){ W=innerWidth; H=innerHeight; c.width=W*dpr; c.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  resize(); addEventListener("resize", resize);

  const stars = Array.from({length: 90}).map(()=>({
    x: Math.random()*W, y: Math.random()*H,
    r: Math.random()*1.8 + 0.6, t: Math.random()*Math.PI*2, s: Math.random()*0.015 + 0.005
  }));

  function tick(){
    ctx.clearRect(0,0,W,H);
    for(const st of stars){
      st.t += st.s;
      const a = 0.25 + Math.abs(Math.sin(st.t))*0.75;
      ctx.globalAlpha = a;
      const g = ctx.createRadialGradient(st.x,st.y,0,st.x,st.y,8);
      g.addColorStop(0,"#ffffff");
      g.addColorStop(0.4,"#FF6AD5");
      g.addColorStop(0.8,"#86FFF4");
      g.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(st.x,st.y,st.r*6,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}
