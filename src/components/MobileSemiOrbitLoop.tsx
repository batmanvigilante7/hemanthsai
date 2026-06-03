import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const learningLoop = [
  ['01', 'Project', 'Curiosity creates direction.', 'Curiosity becomes real only when it finds a container. I start with a project because a project gives curiosity direction, pressure, and a place to turn into visible work.', 'spark'],
  ['02', 'Problem', 'Work reveals friction.', 'Once the project begins, the vague idea meets reality. Bugs, unclear structure, weak design, and missing logic reveal the real problem that needs attention.', 'crack'],
  ['03', 'Skill', 'Friction demands skill.', 'The problem decides what I need to learn next. Instead of collecting random theory, I build the skill that removes the friction in front of me.', 'ring'],
  ['04', 'Artifact', 'Skill becomes proof.', 'A skill becomes valuable when it leaves my head. It turns into a page, prototype, repo, note, demo, case study, or system that can be seen and improved.', 'cube'],
  ['05', 'Explanation', 'Proof needs clarity.', 'An artifact is not finished if I cannot explain it. Explanation forces me to clarify what I built, why it matters, and how the thinking works.', 'signal'],
  ['06', 'Feedback', 'Clarity invites correction.', 'Once the work is explained, reality can respond. Feedback shows what is unclear, weak, useful, overbuilt, or worth sharpening.', 'echo'],
  ['07', 'Iteration', 'Correction sparks curiosity.', 'Feedback sharpens the next version. Iteration closes one loop, but it also opens a new question, a better angle, and the next thing worth exploring.', 'loop'],
] as const;

type LoopItem = typeof learningLoop[number];
type PlanetSymbol = LoopItem[4];

function symbolGradient(symbol: PlanetSymbol) {
  return {
    spark: 'url(#mobileMercuryGrad)',
    crack: 'url(#mobileMarsGrad)',
    ring: 'url(#mobileSaturnGrad)',
    cube: 'url(#mobileEarthGrad)',
    signal: 'url(#mobileNeptuneGrad)',
    echo: 'url(#mobileJupiterGrad)',
    loop: 'url(#mobileUranusGrad)',
  }[symbol];
}

function pointOnOrbit(angle: number, radius: number, centerX: number, centerY: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: centerX + Math.cos(rad) * radius, y: centerY + Math.sin(rad) * radius };
}

function MiniPlanet({ symbol, radius = 7, opacity = 0.45 }: { symbol: PlanetSymbol; radius?: number; opacity?: number }) {
  const ringed = symbol === 'ring' || symbol === 'loop';
  return (
    <g opacity={opacity + 0.2}>
      {ringed && <ellipse rx={radius * 1.9} ry={radius * 0.48} fill="none" stroke="rgba(255,244,198,0.55)" strokeWidth="0.8" transform={symbol === 'loop' ? 'rotate(-44)' : 'rotate(-18)'} />}
      <circle r={radius} fill={symbolGradient(symbol)} stroke="rgba(255,255,255,0.26)" strokeWidth="0.75" />
      <circle cx={-radius * 0.28} cy={-radius * 0.32} r={radius * 0.34} fill="rgba(255,255,255,0.18)" />
      {symbol === 'spark' && <><circle cx={radius * 0.25} cy={-radius * 0.1} r={radius * 0.18} fill="rgba(20,20,20,0.28)" /><circle cx={-radius * 0.25} cy={radius * 0.22} r={radius * 0.14} fill="rgba(20,20,20,0.22)" /></>}
      {symbol === 'crack' && <path d={`M -${radius * 0.2} -${radius * 0.82} L ${radius * 0.12} -${radius * 0.18} L -${radius * 0.1} ${radius * 0.22} L ${radius * 0.28} ${radius * 0.78}`} fill="none" stroke="rgba(70,18,10,0.55)" strokeWidth="0.95" strokeLinecap="round" />}
      {symbol === 'cube' && <path d={`M -${radius * 0.55} -${radius * 0.12} C -${radius * 0.12} -${radius * 0.55}, ${radius * 0.28} -${radius * 0.32}, ${radius * 0.18} ${radius * 0.1} C -${radius * 0.1} ${radius * 0.36}, -${radius * 0.5} ${radius * 0.32}, -${radius * 0.55} -${radius * 0.12}`} fill="rgba(80,190,132,0.58)" />}
      {symbol === 'signal' && <><path d={`M -${radius * 0.7} ${-radius * 0.32} C -${radius * 0.2} ${-radius * 0.5}, ${radius * 0.2} ${-radius * 0.14}, ${radius * 0.72} ${-radius * 0.32}`} fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.7" /><path d={`M -${radius * 0.7} ${radius * 0.18} C -${radius * 0.2} 0, ${radius * 0.2} ${radius * 0.36}, ${radius * 0.72} ${radius * 0.18}`} fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.7" /></>}
      {symbol === 'echo' && <><path d={`M -${radius * 0.78} -${radius * 0.45} C -${radius * 0.25} -${radius * 0.37}, ${radius * 0.25} -${radius * 0.53}, ${radius * 0.78} -${radius * 0.45}`} fill="none" stroke="rgba(255,238,209,0.32)" strokeWidth="0.85" /><path d={`M -${radius * 0.78} ${radius * 0.22} C -${radius * 0.25} ${radius * 0.3}, ${radius * 0.25} ${radius * 0.14}, ${radius * 0.78} ${radius * 0.22}`} fill="none" stroke="rgba(111,48,24,0.4)" strokeWidth="0.85" /><ellipse cx={radius * 0.33} cy={radius * 0.18} rx={radius * 0.25} ry={radius * 0.13} fill="rgba(117,45,24,0.45)" /></>}
    </g>
  );
}

function ActivePlanet({ symbol }: { symbol: PlanetSymbol }) {
  const ringed = symbol === 'ring' || symbol === 'loop';
  return (
    <g filter="url(#mobilePlanetGlow)">
      <motion.circle r="24" fill="rgba(255,217,106,0.07)" stroke="rgba(255,217,106,0.28)" strokeWidth="1" animate={{ r: [21, 26, 21], opacity: [0.65, 1, 0.65] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.g animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        {ringed && <ellipse rx={symbol === 'ring' ? 31 : 29} ry={symbol === 'ring' ? 8 : 7} fill="none" stroke="url(#mobileRingGrad)" strokeWidth="2.1" transform={symbol === 'loop' ? 'rotate(-44)' : 'rotate(-18)'} />}
        <circle r="13.5" fill={symbolGradient(symbol)} stroke="rgba(255,255,255,0.36)" strokeWidth="1" />
        <circle r="13.5" fill="url(#mobilePlanetGlass)" />
        <circle cx="-4.2" cy="-4.8" r="4.2" fill="rgba(255,255,255,0.24)" />
        {symbol === 'spark' && <><circle cx="4.4" cy="-1.5" r="2.3" fill="rgba(20,20,20,0.28)" /><circle cx="-4.8" cy="4.3" r="1.9" fill="rgba(20,20,20,0.22)" /></>}
        {symbol === 'crack' && <path d="M -2 -11 L 3 -3 L -1 2 L 5 10" fill="none" stroke="rgba(60,15,8,0.62)" strokeWidth="1.65" strokeLinecap="round" />}
        {symbol === 'cube' && <><path d="M -9 -1 C -5 -8, 4 -7, 3 -1 C 1 4, -7 6, -9 -1" fill="rgba(78,188,130,0.62)" /><path d="M 2 7 C 5 3, 9 3, 10 8 C 6 10, 4 10, 2 7" fill="rgba(75,184,128,0.48)" /></>}
        {symbol === 'signal' && [-5, 0, 5].map((y, idx) => <path key={y} d={`M -10 ${y} C -3 ${y - 2}, 4 ${y + 2}, 10 ${y}`} fill="none" stroke={idx === 1 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.24)'} strokeWidth={idx === 1 ? '1.15' : '0.9'} strokeLinecap="round" />)}
        {symbol === 'echo' && <><path d="M -12 -7 C -5 -5.4, 4 -8.6, 12 -7" fill="none" stroke="rgba(255,238,210,0.4)" strokeWidth="1.05" strokeLinecap="round" /><path d="M -12 1 C -5 2.6, 4 -0.6, 12 1" fill="none" stroke="rgba(104,45,22,0.5)" strokeWidth="1.5" strokeLinecap="round" /><path d="M -12 9 C -5 10.6, 4 7.4, 12 9" fill="none" stroke="rgba(255,238,210,0.4)" strokeWidth="1.05" strokeLinecap="round" /><ellipse cx="5" cy="3.4" rx="3.5" ry="1.9" fill="rgba(111,43,24,0.55)" /></>}
      </motion.g>
    </g>
  );
}

export default function MobileSemiOrbitLoop() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const activeItem = learningLoop[active];
  const radius = 188;
  const centerX = -74;
  const centerY = 250;
  const activeAngle = 0;

  const planets = useMemo(() => learningLoop.map((item, index) => {
    const base = index * (360 / learningLoop.length);
    const rotation = -active * (360 / learningLoop.length);
    const angle = base + rotation;
    const point = pointOnOrbit(angle, radius, centerX, centerY);
    const distance = Math.abs(((angle - activeAngle + 540) % 360) - 180);
    const opacity = Math.max(0.18, 0.56 - distance / 300);
    return { item, index, angle, point, opacity };
  }), [active]);

  useEffect(() => {
    if (modalOpen) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % learningLoop.length), 3900);
    return () => window.clearInterval(id);
  }, [modalOpen]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const go = (next: number) => setActive((next + learningLoop.length) % learningLoop.length);

  return (
    <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#07080b] text-white shadow-[0_34px_140px_rgba(0,0,0,0.45)] sm:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(255,207,87,0.16),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(141,162,255,0.18),transparent_30%),linear-gradient(180deg,#050506,#08090c_58%,#050506)]" />
      <div className="relative px-5 pt-6">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#ffd96a]/70"><span className="h-2 w-2 rounded-full bg-[#ffd96a] shadow-[0_0_18px_rgba(255,217,106,0.7)]" /> Mobile loop</p>
        <h3 className="max-w-[9ch] text-[clamp(2.7rem,15vw,4.4rem)] font-black uppercase leading-[0.84] tracking-[-0.085em]">My Learning Loop</h3>
      </div>

      <div
        className="relative h-[430px] overflow-hidden"
        onTouchStart={(event) => setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY })}
        onTouchEnd={(event) => {
          if (!touchStart) return;
          const dx = event.changedTouches[0].clientX - touchStart.x;
          const dy = event.changedTouches[0].clientY - touchStart.y;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 36) go(dx < 0 ? active + 1 : active - 1);
        }}
      >
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 390 500" aria-label="Mobile semi-orbit learning loop">
          <defs>
            <filter id="mobileSoftGlow" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="14" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="mobilePlanetGlow" x="-220%" y="-220%" width="540%" height="540%"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <radialGradient id="mobileSunGrad" cx="38%" cy="32%" r="64%"><stop offset="0%" stopColor="#fff8d7" /><stop offset="28%" stopColor="#ffd96a" /><stop offset="58%" stopColor="#ff9e3d" /><stop offset="100%" stopColor="#ff6f1f" stopOpacity="0" /></radialGradient>
            <radialGradient id="mobilePlanetGlass" cx="32%" cy="26%" r="68%"><stop offset="0%" stopColor="rgba(255,255,255,0.92)" /><stop offset="24%" stopColor="rgba(255,255,255,0.32)" /><stop offset="58%" stopColor="rgba(255,255,255,0.08)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></radialGradient>
            <radialGradient id="mobileMercuryGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff4ca" /><stop offset="42%" stopColor="#b8aa88" /><stop offset="100%" stopColor="#3d3933" /></radialGradient>
            <radialGradient id="mobileMarsGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#ffd2aa" /><stop offset="44%" stopColor="#d86b42" /><stop offset="100%" stopColor="#48140c" /></radialGradient>
            <radialGradient id="mobileSaturnGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff5c8" /><stop offset="44%" stopColor="#d7b56f" /><stop offset="100%" stopColor="#5e4522" /></radialGradient>
            <radialGradient id="mobileEarthGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#eaf7ff" /><stop offset="39%" stopColor="#49a2c8" /><stop offset="68%" stopColor="#2e8b73" /><stop offset="100%" stopColor="#0d2536" /></radialGradient>
            <radialGradient id="mobileNeptuneGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#dfe9ff" /><stop offset="43%" stopColor="#5578ff" /><stop offset="100%" stopColor="#152454" /></radialGradient>
            <radialGradient id="mobileJupiterGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff3d6" /><stop offset="42%" stopColor="#d59d64" /><stop offset="100%" stopColor="#54301c" /></radialGradient>
            <radialGradient id="mobileUranusGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#eeffff" /><stop offset="45%" stopColor="#7fe2df" /><stop offset="100%" stopColor="#17484d" /></radialGradient>
            <linearGradient id="mobileRingGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0)" /><stop offset="42%" stopColor="rgba(255,244,198,0.72)" /><stop offset="68%" stopColor="rgba(255,217,106,0.42)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></linearGradient>
          </defs>

          <circle cx={centerX} cy={centerY} r={radius + 44} fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" strokeDasharray="4 10" />
          <circle cx={centerX} cy={centerY} r="96" fill="url(#mobileSunGrad)" filter="url(#mobileSoftGlow)" />
          <circle cx={centerX - 16} cy={centerY - 18} r="33" fill="rgba(255,255,255,0.14)" />
          <text x={centerX + 38} y={centerY - 5} textAnchor="middle" fontSize="10" fontWeight="850" letterSpacing=".08em" fill="rgba(255,248,220,.92)">Learning</text>
          <text x={centerX + 38} y={centerY + 10} textAnchor="middle" fontSize="10" fontWeight="850" letterSpacing=".08em" fill="rgba(255,248,220,.86)">by Building</text>
          <line x1="62" y1={centerY} x2="104" y2={centerY} stroke="rgba(255,217,106,0.65)" strokeWidth="1" />

          {planets.map(({ item, index, point, opacity }) => index === active ? null : <g key={item[1]} transform={`translate(${point.x} ${point.y})`}><MiniPlanet symbol={item[4]} radius={7} opacity={opacity} /></g>)}
          <motion.g key={activeItem[1]} initial={{ opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} transform={`translate(${pointOnOrbit(0, radius, centerX, centerY).x} ${pointOnOrbit(0, radius, centerX, centerY).y})`}><ActivePlanet symbol={activeItem[4]} /></motion.g>
        </svg>

        <motion.button
          type="button"
          key={activeItem[1]}
          onClick={() => setModalOpen(true)}
          initial={{ opacity: 0, y: 16, scale: 0.96, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[92px] top-1/2 w-[calc(100%-108px)] -translate-y-1/2 rounded-[1.55rem] border border-white/15 bg-white/[0.07] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_22px_90px_rgba(0,0,0,0.36)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between gap-3"><span className="text-[9px] font-black uppercase tracking-[0.27em] text-[#ffd96a]/70">{activeItem[0]} / 07</span><span className="h-8 w-8 rounded-full border border-[#ffd96a]/25 bg-white/[0.06]" /></div>
          <h4 className="mt-3 text-[clamp(2rem,11vw,3rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">{activeItem[1]}</h4>
          <p className="mt-3 text-[15px] font-black leading-tight tracking-[-0.045em] text-white/86">{activeItem[2]}</p>
          <p className="mt-4 inline-flex rounded-full border border-white/15 bg-white/[0.055] px-3 py-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/48">Open full stage ↗</p>
        </motion.button>
      </div>

      <div className="relative mx-4 mb-4 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.055] px-3 py-3 backdrop-blur-2xl">
        <span className="min-w-12 text-[10px] font-black tracking-[0.2em] text-[#ffd96a]/70">{activeItem[0]} / 07</span>
        <div className="flex gap-1.5">{learningLoop.map((item, index) => <button key={item[1]} type="button" onClick={() => go(index)} className={`h-1.5 rounded-full transition-all ${active === index ? 'w-5 bg-[#ffd96a]' : 'w-1.5 bg-white/20'}`} aria-label={`Go to ${item[1]}`} />)}</div>
        <div className="flex gap-2"><button type="button" onClick={() => go(active - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-white/55">←</button><button type="button" onClick={() => go(active + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-white/55">→</button></div>
      </div>

      {modalOpen && (
        <motion.div className="fixed inset-0 z-[100] flex items-end bg-black/65 p-3 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
          <motion.article initial={{ y: 34, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()} className="relative max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto rounded-[2rem] border border-white/20 bg-[#090a0d]/85 p-5 text-white shadow-[0_44px_160px_rgba(0,0,0,0.72)] backdrop-blur-3xl">
            <button type="button" onClick={() => setModalOpen(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.08] text-white/70"><X className="h-5 w-5" /></button>
            <div className="mx-auto mb-5 h-1 w-11 rounded-full bg-white/20" />
            <p className="text-[9px] font-black uppercase tracking-[0.27em] text-[#ffd96a]/70">{activeItem[0]} / 07</p>
            <h4 className="mt-5 pr-12 text-[clamp(3rem,16vw,5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em]">{activeItem[1]}</h4>
            <p className="mt-5 text-[22px] font-black leading-tight tracking-[-0.055em] text-white/92">{activeItem[2]}</p>
            <p className="mt-5 text-sm font-medium leading-[1.8] text-white/68">{activeItem[3]}</p>
          </motion.article>
        </motion.div>
      )}
    </div>
  );
}
