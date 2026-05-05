(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'tech-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;background:#070d1a;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, lines = [], nodes = [], pixels = [], tick = 0;

  const lineCols = ['0,150,255','0,200,255','60,140,255'];
  const nodeCols = ['0,180,255','0,220,200'];
  const pixelCols = ['0,150,255','0,220,255','100,200,255'];
  const grid = 28;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    lines = []; nodes = []; pixels = [];

    for (let x = 0; x < W; x += grid) {
      for (let y = 0; y < H; y += grid) {
        if (Math.random() < 0.4) {
          const horiz = Math.random() < 0.5;
          const len = (Math.floor(Math.random() * 3) + 1) * grid;
          lines.push({
            x, y, horiz, len,
            color: lineCols[Math.floor(Math.random() * lineCols.length)],
            prog: Math.random(),
            speed: Math.random() * 0.002 + 0.0002,  //Ändrar hastigheten på linjernas animation
            active: Math.random() < 0.6
          });
        }
        if (Math.random() < 0.07) {
          nodes.push({
            x, y,
            color: nodeCols[Math.floor(Math.random() * nodeCols.length)],
            pulse: Math.random() * Math.PI * 2
          });
        }
        if (Math.random() < 0.04) {
          pixels.push({
            x: x + Math.random() * grid,
            y: y + Math.random() * grid,
            sz: Math.random() * 5 + 2,
            alpha: Math.random() * 0.4 + 0.1,
            timer: Math.floor(Math.random() * 80),
            color: pixelCols[Math.floor(Math.random() * pixelCols.length)]
          });
        }
      }
    }
  }

  resize();

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(100,160,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += grid) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += grid) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // kretskort linjer
    lines.forEach(l => {
      if (!l.active) return;
      l.prog += l.speed; if (l.prog > 1) l.prog = 0;
      const ex = l.x + (l.horiz ? l.len : 0);
      const ey = l.y + (l.horiz ? 0 : l.len);
      ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(${l.color},0.18)`; ctx.lineWidth = 1; ctx.stroke();
      const px = l.x + (ex - l.x) * l.prog, py = l.y + (ey - l.y) * l.prog;
      ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${l.color},0.95)`; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${l.color},0.2)`; ctx.fill();
      ctx.beginPath(); ctx.arc(l.x, l.y, 2, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${l.color},0.4)`; ctx.fill();
      ctx.beginPath(); ctx.arc(ex, ey, 2, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${l.color},0.4)`; ctx.fill();
    });

    // pulserande noder
    nodes.forEach(n => {
      n.pulse += 0.04; //Ändrar hastigheten på nodernas pulsering
      const r = 3 + Math.sin(n.pulse) * 1;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${n.color},0.7)`; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, r*3.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${n.color},0.08)`; ctx.fill();
    });

    // pixlar
    pixels.forEach(p => {
      p.timer--;
      if (p.timer <= 0) {
        p.alpha = Math.random() * 0.4 + 0.1;
        p.timer = Math.floor(Math.random() * 80 + 30); //Ändrar intervallet för hur ofta pixlarna ändrar utseende. Mindre snabbare/Högre långsammare
        p.color = pixelCols[Math.floor(Math.random() * pixelCols.length)];
      }
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fillRect(p.x - p.sz/2, p.y - p.sz/2, p.sz, p.sz);
    });

    tick++;
    requestAnimationFrame(draw);
  }

  draw();
  window.addEventListener('resize', resize);
})();