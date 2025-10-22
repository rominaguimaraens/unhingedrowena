const setupStarfield = () => {
  const cvs = document.createElement("canvas");
  cvs.style.position = "fixed";
  cvs.style.inset = "0";
  cvs.style.zIndex = "0";
  cvs.style.pointerEvents = "none";
  document.body.prepend(cvs);
  const ctx = cvs.getContext("2d")!;
  const dpr = Math.max(1, devicePixelRatio || 1);

  let stars:{x:number;y:number;z:number;}[] = [];
  const count = 200;

  const resize = () => {
    cvs.width = innerWidth * dpr;
    cvs.height = innerHeight * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  resize(); addEventListener("resize", resize);

  for (let i=0;i<count;i++){ stars.push({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, z: Math.random()*1+0.3 }); }

  function tick(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (const s of stars){
      s.x += 0.05*s.z; if (s.x>innerWidth) s.x=0;
      ctx.fillStyle = "rgba(255,255,255,"+(0.4*s.z)+")";
      ctx.fillRect(s.x, s.y, 2*s.z, 2*s.z);
    }
    requestAnimationFrame(tick);
  }
  tick();
};
export default setupStarfield;
