import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { X } from 'lucide-react';

const asset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const identitySignals = [
  {
    number: '01',
    title: 'Structure',
    line: 'Standards before speed.',
    text: 'Structured environments taught me accountability, presence, and the value of carrying myself with seriousness before chasing outcomes.',
    story: 'Structure is the part of me that came before ambition. It is the habit of respecting routines, showing up with presence, and understanding that standards are not decoration — they are the operating system. This signal connects Sainik School, NCC, and every environment that taught me to take myself seriously before asking the world to do the same.',
    origin: 'Sainik School / NCC',
    compound: 'Better standards',
    image: asset('identity-structure.webp'),
    alt: 'Hemanth Sai in NCC uniform on horseback',
    objectPosition: '50% 30%',
  },
  {
    number: '02',
    title: 'Discipline',
    line: 'Practice before confidence.',
    text: 'Karate taught me repetition, body control, discomfort, and the quiet confidence that comes from doing hard things before anyone is watching.',
    story: 'Discipline is not a motivational quote for me. It is physical. It came from repetition, training, correction, fatigue, and the silent work nobody claps for. Karate made confidence feel earned, not borrowed. That same pattern now moves into learning, coding, design, and building — repeat, refine, sharpen, return.',
    origin: 'Karate / Training',
    compound: 'Consistent execution',
    image: asset('identity-discipline.webp'),
    alt: 'Karate training collage from Hemanth Sai’s early years',
    objectPosition: '50% 22%',
  },
  {
    number: '03',
    title: 'Voice',
    line: 'Ideas need expression.',
    text: 'Speaking taught me that clarity is power. A thought becomes more useful when it can be communicated, understood, and remembered.',
    story: 'Voice is the bridge between thinking and impact. Public speaking trained me to hold an idea in front of people and make it clear enough to land. This matters because building is not only about making things; it is also about explaining why they matter, what they change, and why someone should care.',
    origin: 'Public speaking / Stage',
    compound: 'Clear communication',
    image: asset('identity-voice.webp'),
    alt: 'Hemanth Sai speaking at a podium',
    objectPosition: '50% 28%',
  },
  {
    number: '04',
    title: 'Builder Mode',
    line: 'Visible work beats hidden potential.',
    text: 'Now the same pattern moves into technology: turning curiosity into projects, systems, pages, notes, prototypes, and proof that can be seen and improved.',
    story: 'Builder Mode is where all the earlier signals become visible. Structure gives the base, discipline keeps the rhythm, voice explains the work, and technology becomes the arena. I am learning to convert curiosity into artifacts: interfaces, repos, systems, notes, demos, case studies, and products that can survive feedback.',
    origin: 'AI / Software / Product',
    compound: 'Shippable artifacts',
    image: asset('identity-builder.webp'),
    alt: 'Hemanth Sai working on a laptop',
    objectPosition: '50% 45%',
  },
] as const;

type IdentitySignal = typeof identitySignals[number];

function FadeIn({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function ImageFrame({ src, alt, label, className = '', imgStyle }: { src: string; alt: string; label: string; className?: string; imgStyle?: CSSProperties }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`noise group relative overflow-hidden bg-white/[0.04] ${className}`}>
      {!broken ? <img src={src} alt={alt} onError={() => setBroken(true)} loading="lazy" style={imgStyle} className="h-full w-full object-cover brightness-100 contrast-105 saturate-[0.92] transition-transform duration-1000 group-hover:scale-[1.035]" /> : <div className="flex h-full min-h-[240px] w-full items-center justify-center bg-[linear-gradient(135deg,#171717,#050505)] px-5 text-center"><span className="rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.35em] text-white/55">{label}</span></div>}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.36))]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

function IdentitySignalModal({ signal, onClose }: { signal: IdentitySignal; onClose: () => void }) {
  useEffect(() => {
    const closeOnKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', closeOnKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.article initial={{ opacity: 0, y: 34, scale: 0.94, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()} className="noise relative grid max-h-[88svh] w-full max-w-6xl overflow-y-auto rounded-[2.25rem] border border-white/25 bg-white/[0.12] text-white shadow-[0_44px_180px_rgba(0,0,0,0.78)] backdrop-blur-3xl md:grid-cols-[0.92fr_1.08fr] md:rounded-[3.5rem]">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.055)_34%,rgba(141,162,255,0.10)_68%,rgba(255,255,255,0.08))]" />
        <div className="relative min-h-[300px] p-3 md:min-h-[620px] md:p-4"><ImageFrame src={signal.image} alt={signal.alt} label={signal.title} className="h-full min-h-[300px] rounded-[1.75rem] border border-white/12 md:min-h-[590px] md:rounded-[3rem]" imgStyle={{ objectPosition: signal.objectPosition }} /></div>
        <div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-12"><button type="button" onClick={onClose} className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/[0.10] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl transition hover:bg-white/[0.18] hover:text-white" aria-label="Close identity signal"><X className="h-5 w-5" /></button><p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/44">{signal.number} / Identity Signal</p><h3 className="mt-5 pr-14 text-[clamp(2.7rem,11vw,6.8rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-white">{signal.title}</h3><p className="mt-6 max-w-2xl text-2xl font-black leading-tight tracking-[-0.055em] text-white/90 sm:text-3xl">{signal.line}</p><p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/68 sm:text-lg">{signal.story}</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-[1.5rem] border border-white/14 bg-white/[0.08] p-4 backdrop-blur-2xl"><p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">Origin</p><p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/78">{signal.origin}</p></div><div className="rounded-[1.5rem] border border-white/14 bg-black/20 p-4 backdrop-blur-2xl"><p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">How it compounds</p><p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/78">{signal.compound}</p></div></div></div>
      </motion.article>
    </motion.div>
  );
}

function IdentityStackCard({ signal, index, progress, onOpen }: { signal: IdentitySignal; index: number; progress: MotionValue<number>; onOpen: () => void }) {
  const total = identitySignals.length;
  const segment = 1 / total;
  const start = index * segment;
  const end = Math.min(1, start + segment * 1.35);
  const scale = useTransform(progress, [start, end, 1], [1, 0.94 - index * 0.018, 0.86 - index * 0.012]);
  const y = useTransform(progress, [start, end, 1], [index * 26, index * 12, -index * 10]);
  const rotateX = useTransform(progress, [start, end], [0, -7]);
  const opacity = useTransform(progress, [Math.max(0, start - 0.08), start, 1], [0.72, 1, 1]);

  return (
    <motion.button
      type="button"
      style={{ scale, y, rotateX, opacity, transformPerspective: 1200, zIndex: 20 + index }}
      onClick={onOpen}
      className="group absolute inset-x-0 top-0 mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] text-left text-white shadow-[0_34px_140px_rgba(0,0,0,0.48)] outline-none backdrop-blur-3xl transition duration-300 hover:border-white/24 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-white/55 focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707] md:grid-cols-[0.98fr_1.02fr] md:rounded-[3rem]"
    >
      <ImageFrame src={signal.image} alt={signal.alt} label={signal.title} className="aspect-[4/3] border-b border-white/10 md:aspect-[16/10] md:border-b-0 md:border-r" imgStyle={{ objectPosition: signal.objectPosition }} />
      <div className="flex min-h-[310px] flex-col justify-center p-5 sm:p-7 md:min-h-[420px] md:p-9 lg:p-11">
        <div className="flex items-start justify-between gap-5"><p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/38">{signal.number}</p><p className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/45 transition group-hover:border-white/20 group-hover:bg-white/[0.10] group-hover:text-white/70">Open Signal</p></div>
        <h3 className="mt-7 text-[clamp(2.4rem,8vw,5.2rem)] font-black uppercase leading-[0.84] tracking-[-0.085em] text-white md:mt-8">{signal.title}</h3>
        <p className="mt-5 max-w-xl text-xl font-black leading-snug tracking-[-0.05em] text-white/88 sm:text-2xl">{signal.line}</p>
        <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white/58 sm:text-base">{signal.text}</p>
        <p className="mt-7 text-[9px] font-black uppercase tracking-[0.24em] text-white/36 transition group-hover:text-white/58">Layer {index + 1} of 4 · Tap to reveal deeper layer</p>
      </div>
    </motion.button>
  );
}

export default function IdentityStack() {
  const container = useRef<HTMLElement | null>(null);
  const [activeSignal, setActiveSignal] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section id="identity" ref={container} className="relative min-h-[420vh] overflow-visible bg-[#070707] px-5 py-16 text-white sm:min-h-[440vh] sm:px-8 sm:py-24 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.075),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(141,162,255,0.10),transparent_30%),linear-gradient(180deg,#070707,#050505)]" />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn><p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/45 sm:text-xs sm:tracking-[0.32em]">Identity</p><h2 className="max-w-6xl text-[clamp(3rem,13vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">The pattern behind the proof.</h2><p className="mt-6 max-w-4xl text-lg font-light leading-relaxed text-white/72 sm:text-2xl">Before I became interested in AI, software, and product building, I was shaped by structure, discipline, voice, and execution.</p><p className="mt-5 max-w-4xl text-base leading-relaxed text-white/56 sm:text-lg">The environments changed — training grounds, uniforms, stages, classrooms, and laptops — but the pattern stayed the same: learn under pressure, communicate with clarity, and turn intent into visible work.</p></FadeIn>
        <div className="sticky top-[5.5rem] mt-12 h-[78svh] min-h-[650px] overflow-visible py-4 sm:top-24 sm:mt-16 sm:h-[82vh] lg:top-28" style={{ perspective: 1200 }}>
          <div className="relative mx-auto h-full w-full max-w-6xl">
            {identitySignals.map((signal, index) => <IdentityStackCard key={signal.title} signal={signal} index={index} progress={scrollYProgress} onOpen={() => setActiveSignal(index)} />)}
          </div>
        </div>
      </div>
      {activeSignal !== null && <IdentitySignalModal signal={identitySignals[activeSignal]} onClose={() => setActiveSignal(null)} />}
    </section>
  );
}
