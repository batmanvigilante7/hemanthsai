import { useEffect, useMemo, useState, type ReactNode, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Brush, Code2, Github, Instagram, Linkedin, Mail, Menu, PenTool, Target, X, Zap } from 'lucide-react';
import MobileSemiOrbitLoop from './components/MobileSemiOrbitLoop';
import IdentityStack from './components/IdentityStack';
import ThoughtWorkspace from './components/ThoughtWorkspace';
import { CardContainer, CardBody, CardItem } from './components/ui/3d-card';

const asset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const images = {
 hero: asset('hero-current.webp.webp'),
  martial: asset('karate-roots.webp.webp'),
  stage: asset('stage.webp'),
  shotput: asset('shotput.webp'),
  blazer: asset('blazer-v2.webp.webp'),
  tepe: asset('tepe-exhibition.webp'),
  sainik: asset('sainik-school.webp'),
  gitam: asset('gitam-sign.webp'),
  ncc: asset('ncc.webp'),
  voice: asset('voice.webp'),

  identityStructure: asset('identity-structure.webp'),
  identityDiscipline: asset('identity-discipline.webp'),
  identityVoice: asset('identity-voice.webp'),
  identityBuilder: asset('identity-builder.webp'),
};

const identitySignals = [
  {
    number: '01',
    title: 'Structure',
    line: 'Standards before speed.',
    text: 'Structured environments taught me accountability, presence, and the value of carrying myself with seriousness before chasing outcomes.',
    story: 'Structure is the part of me that came before ambition. It is the habit of respecting routines, showing up with presence, and understanding that standards are not decoration — they are the operating system. This signal connects Sainik School, NCC, and every environment that taught me to take myself seriously before asking the world to do the same.',
    origin: 'Sainik School / NCC',
    compound: 'Better standards',
    image: images.identityStructure,
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
    image: images.identityDiscipline,
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
    image: images.identityVoice,
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
    image: images.identityBuilder,
    alt: 'Hemanth Sai working on a laptop',
    objectPosition: '50% 45%',
  },
] as const;

const socials = [
  ['Github', 'https://github.com/hemanthsairoyal7', Github],
  ['LinkedIn', 'https://www.linkedin.com/', Linkedin],
  ['Instagram', 'https://www.instagram.com/', Instagram],
  ['Mail', 'mailto:hemanthsairoyal7@gmail.com', Mail],
] as const;

const navLinks = [
  ['Identity', '#identity'],
  ['Workspace', '#thought-workspace'],
  ['Proof', '#proof'],
  ['Stack', '#work'],
  ['Story', '#before-code'],
  ['Contact', '#contact'],
] as const;

const learningStack = [
  ['01', 'AI Curiosity', 'AI feels like leverage, not a trend.', 'I’m learning how AI can help me think, build, automate, and turn ideas into working prototypes faster.', 'Tools / Workflows / Product Ideas', 'AI pulls me because it changes the distance between an idea and a prototype. I do not want to treat it like a shortcut; I want to understand how it can extend thinking, speed up learning, and help me build useful experiments with fewer limits.'],
  ['02', 'Literature & Meaning', 'Language reveals what plain data misses.', 'Literature sharpens how I understand people, emotion, conflict, beauty, and the meaning beneath the surface.', 'Language / Emotion / Human Depth', 'Literature keeps me connected to the human side of everything I build. It trains attention, empathy, rhythm, and interpretation — qualities that matter whether I am writing, designing an experience, or understanding what people actually care about.'],
  ['03', 'Startup Instinct', 'Ideas become real only when they meet people.', 'I’m drawn to startups because they combine risk, speed, users, product decisions, and the courage to build before everything is certain.', 'Products / Users / Execution', 'Startups interest me because they force ideas to face reality. I am drawn to the messy middle where a problem, a user, a product, and a decision collide — because that is where curiosity becomes judgment and judgment becomes momentum.'],
  ['04', 'Storytelling Sense', 'A good story makes things memorable.', 'I naturally look for the thread behind people, products, and moments — the reason something feels worth paying attention to.', 'Narrative / Positioning / Memory', 'Storytelling is how I make sense of complexity. I look for the hidden thread in people, products, and moments — the thing that makes something memorable, believable, and worth following. It shapes how I communicate and how I imagine products.'],
  ['05', 'Sports & Discipline', 'Pressure teaches faster than motivation.', 'Sports taught me repetition, competition, resilience, and the value of showing up even when the mood is not there.', 'Pressure / Practice / Consistency', 'Sports gave me a physical understanding of consistency. Repetition, competition, fatigue, and pressure taught me that growth is not always dramatic — sometimes it is just showing up again, correcting the mistake, and refusing to become soft.'],
  ['06', 'Leadership Energy', 'Standards rise when someone carries them first.', 'I’m pulled toward organizing, leading, and raising the quality of a team or mission when I believe the work matters.', 'Presence / Ownership / Teams', 'Leadership attracts me because good work changes when someone accepts responsibility for the standard. I like organizing people around a mission, creating clarity, and raising the energy of a team when the work deserves seriousness.'],
  ['07', 'Financial Freedom', 'Money means options, not just status.', 'Financial freedom drives me because it means choice, independence, better environments, and the ability to build without being limited by circumstances.', 'Freedom / Environments / Independence', 'Financial freedom is the anchor because it connects ambition to choice. For me, money is not just status — it is independence, access to better environments, and the freedom to build, learn, and choose without being trapped by circumstance.'],
] as const;

const dashboard = [
  ['Background', 'GITAM CSE student · Sainik School Korukonda alumnus · building a visible proof system'],
  ['Current Direction', 'Building a visible proof hub around AI, software, design, writing, and learning in public.'],
  ['Builder Stack', 'React · TypeScript · Tailwind · Python · AI tools · GitHub · Figma · UX thinking'],
  ['Performance Proof', 'Sports and martial arts shaped my relationship with repetition, pressure, and feedback.'],
  ['Learning Loop', 'Project → Problem → Skill → Artifact → Explanation → Feedback'],
  ['Reach Me', 'Email · GitHub · LinkedIn · Instagram'],
];

const pillars = [
  ['01', 'AI + Automation', 'Using AI tools and models to build workflows, prototypes, and systems faster.', BrainCircuit],
  ['02', 'Frontend Engineering', 'React, TypeScript, Tailwind, responsive interfaces, and interactive landing pages.', Code2],
  ['03', 'UX / Product Thinking', 'Understanding user flows, clarity, positioning, interaction, and product value.', PenTool],
  ['04', 'Writing / Storytelling', 'Turning ideas into narratives, notes, frameworks, and visual communication.', Brush],
  ['05', 'Execution Systems', 'Using sprints, proof loops, and feedback cycles to convert ideas into output.', Target],
] as const;

const obsessions = ['AI leverage', 'UX psychology', 'Startup validation', 'Cinematic storytelling', 'Investing mental models', 'Execution psychology', 'Product communication', 'Personal proof systems'];
const learningLoop = [
  ['01', 'Project', 'Curiosity creates direction.', 'Curiosity becomes real only when it finds a container. I start with a project because a project gives curiosity direction, pressure, and a place to turn into visible work.'],
  ['02', 'Problem', 'Work reveals friction.', 'Once the project begins, the vague idea meets reality. Bugs, unclear structure, weak design, and missing logic reveal the real problem that needs attention.'],
  ['03', 'Skill', 'Friction demands skill.', 'The problem decides what I need to learn next. Instead of collecting random theory, I build the skill that removes the friction in front of me.'],
  ['04', 'Artifact', 'Skill becomes proof.', 'A skill becomes valuable when it leaves my head. It turns into a page, prototype, repo, note, demo, case study, or system that can be seen and improved.'],
  ['05', 'Explanation', 'Proof needs clarity.', 'An artifact is not finished if I cannot explain it. Explanation forces me to clarify what I built, why it matters, and how the thinking works.'],
  ['06', 'Feedback', 'Clarity invites correction.', 'Once the work is explained, reality can respond. Feedback shows what is unclear, weak, useful, overbuilt, or worth sharpening.'],
  ['07', 'Iteration', 'Correction sparks curiosity.', 'Feedback sharpens the next version. Iteration closes one loop, but it also opens a new question, a better angle, and the next thing worth exploring.'],
] as const;

function FadeIn({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function ImageFrame({
  src,
  alt,
  label,
  className = '',
  imgClassName = '',
  imgStyle,
  priority = false,
  fit = 'cover',
  tone = 'natural',
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  tone?: 'natural' | 'soft' | 'mono';
}) {
  const [broken, setBroken] = useState(false);
  const toneClass = tone === 'mono' ? 'grayscale brightness-105 contrast-110 saturate-0' : tone === 'soft' ? 'brightness-100 contrast-105 saturate-[0.92]' : 'brightness-100 contrast-105 saturate-100';
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
  return <div className={`noise group relative overflow-hidden bg-white/[0.04] ${className}`}>{!broken ? <img src={src} alt={alt} onError={() => setBroken(true)} loading={priority ? 'eager' : 'lazy'}
                                                                                                         style={imgStyle} className={`h-full w-full ${fitClass} ${toneClass} transition-transform duration-700 group-hover:scale-[1.018] md:duration-1000 md:group-hover:scale-[1.035] ${imgClassName}`} /> : <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[linear-gradient(135deg,#171717,#050505)] px-5 text-center"><span className="rounded-full border border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/55 sm:text-xs sm:tracking-[0.35em]">{label}</span></div>}<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.34))]" /><div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.45)] sm:shadow-[inset_0_0_100px_rgba(0,0,0,0.55)]" /></div>;
}

function Button({ children, href = '#' }: { children: ReactNode; href?: string }) { return <a href={href} className="liquid-glass group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:scale-[1.02] hover:bg-white/[0.07] sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.2em]">{children}<ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></a>; }
const SectionLabel = ({ children }: { children: ReactNode }) => <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-current/45 sm:text-xs sm:tracking-[0.32em]">{children}</p>;
const SectionHeading = ({ children, light = false }: { children: ReactNode; light?: boolean }) => <h2 className={`max-w-5xl text-[clamp(2.45rem,12vw,5.8rem)] font-black uppercase leading-[0.92] tracking-[-0.075em] ${light ? 'text-white' : 'text-black'}`}>{children}</h2>;
function Divider({ text }: { text: string }) { return <section className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-9 sm:py-14 md:py-16"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" /><div className="relative flex animate-marquee-left whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.075] sm:text-[12vw] lg:text-[8vw]">{[0, 1, 2, 3].map((item) => <span key={item} className="mx-5 sm:mx-8">{text}</span>)}</div></section>; }

function Hero() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <section id="arrival" className="noise relative min-h-[100svh] overflow-hidden bg-[#050505] text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.11),transparent_28%),radial-gradient(circle_at_10%_86%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,#050505,#0b0b0b)]" /><nav className="fixed left-0 right-0 top-0 z-40 px-3 py-3 sm:px-6 sm:py-4"><div className="liquid-glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 sm:px-5 sm:py-3"><a href="#arrival" className="max-w-[58vw] truncate text-sm font-black uppercase tracking-[-0.04em] sm:text-base">Hemanth Sai<span className="text-white/50">.</span></a><div className="hidden items-center gap-7 lg:flex">{navLinks.map(([label, href]) => <a key={label} href={href} className="text-xs font-medium uppercase tracking-[0.24em] text-white/65 transition hover:text-white">{label}</a>)}</div><button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full text-white lg:hidden" aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button><div className="hidden lg:block"><Button href="mailto:hemanthsairoyal7@gmail.com">Connect with me</Button></div></div></nav>{open && <div className="fixed inset-0 z-30 overflow-y-auto bg-black/95 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden">{navLinks.map(([label, href]) => <a onClick={() => setOpen(false)} key={label} href={href} className="block border-b border-white/10 py-5 text-[clamp(2rem,10vw,3rem)] font-black uppercase leading-none tracking-[-0.06em]">{label}</a>)}<div className="mt-7"><Button href="mailto:hemanthsairoyal7@gmail.com">Connect with me</Button></div></div>}<div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl content-center gap-10 px-5 pb-10 pt-24 sm:px-7 sm:pb-12 sm:pt-28 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10"><div className="relative z-10"><FadeIn><p className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.21em] text-white/60 sm:gap-3 sm:text-xs sm:tracking-[0.32em]"><Zap className="h-4 w-4 shrink-0" />AI / Software / Design / Writing / Discipline</p></FadeIn><motion.h1 initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-[10ch] text-[clamp(3.5rem,16vw,8.15rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-white">Learning by building.</motion.h1><FadeIn delay={0.12}><p className="mt-5 max-w-xl text-base leading-relaxed text-white/72 sm:mt-7 sm:text-xl">I’m Hemanth Sai, a CSE student building at the intersection of AI, software, and design. Turning curiosity into craft.</p></FadeIn><FadeIn delay={0.2}><div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"><span className="liquid-glass inline-flex max-w-full items-center gap-3 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-xs sm:tracking-[0.22em]"><span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" />2nd-year B.Tech CSE student at GITAM University</span></div><div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4"><Button href="#work">See what I’m building</Button><Button href="#before-code">Explore my story</Button></div></FadeIn></div><FadeIn delay={0.08} className="relative mx-auto w-full max-w-[min(78vw,360px)] sm:max-w-[410px] lg:max-w-[500px]"><div className="absolute inset-x-6 bottom-2 top-16 rounded-full bg-white/10 blur-3xl" /><div className="relative rounded-[2.4rem] border border-white/10 bg-white/[0.035] p-3 shadow-[0_40px_140px_rgba(0,0,0,0.5)] sm:rounded-[3.2rem] sm:p-4">
                    <ImageFrame
                      src={images.hero}
                      alt="Hero portrait"
                      label="Hero portrait"
                      tone="soft"
                      className="aspect-[4/5] w-full"
                      imgClassName="object-[50%_35%]"
                    />
                  </div>
                </FadeIn>
              </div>
            </section>;
}
function Glass({ title, text }: { title: string; text: string }) { return <div className="liquid-glass rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6"><h3 className="mb-3 text-lg font-black uppercase tracking-[-0.04em] sm:text-xl">{title}</h3><p className="text-sm leading-relaxed text-white/62">{text}</p></div>; }
function IdentitySignalModal({ signal, onClose }: { signal: typeof identitySignals[number]; onClose: () => void }) {
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
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 34, scale: 0.94, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="noise relative grid max-h-[88svh] w-full max-w-6xl overflow-y-auto rounded-[2.25rem] border border-white/25 bg-white/[0.12] text-white shadow-[0_44px_180px_rgba(0,0,0,0.78)] backdrop-blur-3xl md:grid-cols-[0.92fr_1.08fr] md:rounded-[3.5rem]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.055)_34%,rgba(141,162,255,0.10)_68%,rgba(255,255,255,0.08))]" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/18 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8da2ff]/18 blur-3xl" />

        <div className="relative min-h-[280px] p-3 md:min-h-[620px] md:p-4">
          <ImageFrame
            src={signal.image}
            alt={signal.alt}
            label={signal.title}
            tone="soft"
            className="h-full min-h-[280px] rounded-[1.75rem] border border-white/12 md:min-h-[590px] md:rounded-[3rem]"
            imgStyle={{ objectPosition: signal.objectPosition }}
          />
        </div>

        <div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-12">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/[0.10] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl transition hover:bg-white/[0.18] hover:text-white"
            aria-label="Close identity signal"
          >
            <X className="h-5 w-5" />
          </button>

          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/44">
            {signal.number} / Identity Signal
          </p>

          <h3 className="mt-5 pr-14 text-[clamp(2.7rem,11vw,6.8rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-white">
            {signal.title}
          </h3>

          <p className="mt-6 max-w-2xl text-2xl font-black leading-tight tracking-[-0.055em] text-white/90 sm:text-3xl">
            {signal.line}
          </p>

          <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/68 sm:text-lg">
            {signal.story}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/14 bg-white/[0.08] p-4 backdrop-blur-2xl">
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">Origin</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/78">{signal.origin}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/14 bg-black/20 p-4 backdrop-blur-2xl">
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">How it compounds</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/78">{signal.compound}</p>
            </div>
          </div>

          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.24em] text-white/34">
            Tap outside or press Esc to close
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
function Identity() {
  const [activeSignal, setActiveSignal] = useState<number | null>(null);

  return (
    <section id="identity" className="relative overflow-hidden bg-[#070707] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.075),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(141,162,255,0.10),transparent_30%),linear-gradient(180deg,#070707,#050505)]" />

      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/45 sm:text-xs sm:tracking-[0.32em]">
            Identity
          </p>

          <h2 className="max-w-6xl text-[clamp(3rem,13vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">
            The pattern behind the proof.
          </h2>

          <p className="mt-6 max-w-4xl text-lg font-light leading-relaxed text-white/72 sm:text-2xl">
            Before I became interested in AI, software, and product building, I was shaped by structure,
            discipline, voice, and execution.
          </p>

          <p className="mt-5 max-w-4xl text-base leading-relaxed text-white/56 sm:text-lg">
            The environments changed — training grounds, uniforms, stages, classrooms, and laptops — but
            the pattern stayed the same: learn under pressure, communicate with clarity, and turn intent
            into visible work.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2">
          {identitySignals.map((signal, index) => (
            <FadeIn key={signal.title} delay={index * 0.05}>
              <button type="button" onClick={() => setActiveSignal(index)} className="block h-full w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707]">
                <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_34px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_44px_150px_rgba(141,162,255,0.16)] sm:rounded-[2.5rem]">
                  <ImageFrame
                    src={signal.image}
                    alt={signal.alt}
                    label={signal.title}
                    tone="soft"
                    className="aspect-[4/5] border-b border-white/10 md:aspect-[4/5]"
                    imgStyle={{ objectPosition: signal.objectPosition }}
                  />

                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/38">
                        {signal.number}
                      </p>

                      <p className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/45 transition group-hover:border-white/20 group-hover:bg-white/[0.10] group-hover:text-white/70">
                        Open Signal
                      </p>
                    </div>

                    <h3 className="mt-6 text-[clamp(2rem,7vw,3.5rem)] font-black uppercase leading-[0.86] tracking-[-0.075em] text-white">
                      {signal.title}
                    </h3>

                    <p className="mt-4 text-lg font-black leading-snug tracking-[-0.04em] text-white/86">
                      {signal.line}
                    </p>

                    <p className="mt-4 text-sm font-medium leading-relaxed text-white/58 sm:text-base">
                      {signal.text}
                    </p>

                    <p className="mt-5 text-[9px] font-black uppercase tracking-[0.24em] text-white/36 transition group-hover:text-white/58">
                      Tap to reveal deeper layer
                    </p>
                  </div>
                </article>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
      {activeSignal !== null && <IdentitySignalModal signal={identitySignals[activeSignal]} onClose={() => setActiveSignal(null)} />}
    </section>
  );
}
function Pressure() {
  return (
    <section id="pressure" className="overflow-hidden bg-black px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <FadeIn className="order-2 lg:order-1">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/55 sm:mb-5 sm:tracking-[0.34em]">
            Forged under pressure
          </p>

          <h2 className="max-w-5xl text-[clamp(3rem,13vw,8.2rem)] font-black uppercase leading-[0.84] tracking-[-0.08em]">
            Execution reveals character.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:mt-6 sm:text-lg">
            Pressure has been one of my oldest teachers — from sports and martial arts to leadership and building.
            I trust repetition, feedback, and performance more than empty motivation.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="order-1 lg:order-2">
          <ImageFrame
            src={images.shotput}
            alt="Shotput action"
            label="Shotput performance"
            tone="soft"
            className="aspect-[16/10] rounded-[2rem] border border-white/10 shadow-[0_50px_140px_rgba(0,0,0,0.55)] sm:aspect-[16/9] sm:rounded-[3rem] lg:aspect-[16/10]"
            imgClassName="object-[52%_center]"
          />
        </FadeIn>
      </div>
    </section>
  );
}function Proof() { return <section id="proof" className="bg-white px-5 py-16 text-black sm:px-8 sm:py-24 md:px-10"><div className="mx-auto max-w-7xl"><FadeIn><SectionLabel>Proof dashboard</SectionLabel><SectionHeading>Credibility without resume noise.</SectionHeading></FadeIn><div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">{dashboard.map(([title, text], index) => <FadeIn key={title} delay={index * 0.035}><div className="min-h-[180px] rounded-[1.5rem] border border-black/10 bg-black/[0.035] p-5 sm:min-h-[220px] sm:rounded-[2rem] sm:p-7"><p className="mb-6 text-xs uppercase tracking-[0.28em] text-black/35 sm:mb-8">0{index + 1}</p><h3 className="mb-3 text-xl font-black uppercase tracking-[-0.05em] sm:text-2xl">{title}</h3><p className="text-sm leading-relaxed text-black/60 sm:text-base">{text}</p></div></FadeIn>)}</div></div></section>; }
function SvgLoopNode({ item, index, active, isNext, intensity, onOpen }: { item: typeof learningLoop[number]; index: number; active: boolean; isNext: boolean; intensity: number; onOpen: () => void }) {
  const [number, title] = item;
  const angle = -90 + index * (360 / learningLoop.length);
  const radius = 278;
  const x = 380 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 380 + radius * Math.sin((angle * Math.PI) / 180);
  const nodeRadius = active ? 54 : 48;
  const nextGlowRadius = 72 + intensity * 14;

  return <motion.g role="button" tabIndex={0} aria-label={`Open ${title} learning loop step`} onClick={onOpen} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onOpen(); }} className="cursor-pointer outline-none" initial={{ opacity: 0, scale: 0.86 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.42, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.045 }} style={{ transformOrigin: `${x}px ${y}px` }}>
    {isNext && <motion.circle cx={x} cy={y} r={nextGlowRadius} fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.26)" strokeWidth="1.2" initial={false} animate={{ r: [nextGlowRadius - 6, nextGlowRadius + 6, nextGlowRadius - 6], opacity: [0.26, 0.68, 0.26] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />}
    <circle cx={x} cy={y} r={nodeRadius + 14} fill="rgba(255,255,255,0.055)" opacity={active ? 1 : isNext ? 0.76 : 0.55} />
    <circle cx={x} cy={y} r={nodeRadius} fill={active ? 'rgba(255,255,255,0.18)' : isNext ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.075)'} stroke={active ? 'rgba(255,255,255,0.62)' : isNext ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.2)'} strokeWidth={active ? 2 : isNext ? 1.7 : 1.4} />
    <circle cx={x} cy={y} r={nodeRadius - 9} fill="rgba(5,5,5,0.34)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    {active && <circle cx={x} cy={y} r={nodeRadius + 22} fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="1" strokeDasharray="5 8" />}
    <text x={x} y={y - 9} textAnchor="middle" className="select-none fill-white/50 text-[10px] font-black uppercase tracking-[0.24em]">{number}</text>
    <text x={x} y={y + 17} textAnchor="middle" className="select-none fill-white text-[13px] font-black uppercase tracking-[-0.04em]">{title}</text>
  </motion.g>;
}
function LoopDetailPanel({ item, onReset }: { item: typeof learningLoop[number]; onReset: () => void }) { const [number, title, belief, story] = item; return <motion.article key={title} initial={{ opacity: 0, x: 24, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="noise relative overflow-hidden rounded-[2.25rem] border border-white/14 bg-white/[0.065] p-7 text-white shadow-[0_34px_130px_rgba(0,0,0,0.52)] backdrop-blur-3xl"><div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" /><div className="relative"><div className="flex items-start justify-between gap-5"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/42">{number} / Selected orbit</p><button type="button" onClick={onReset} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:border-white/20 hover:bg-white/[0.09] hover:text-white/72">Reset</button></div><h3 className="mt-5 text-[clamp(2.4rem,6vw,4.6rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">{title}</h3><p className="mt-6 text-xl font-black leading-snug tracking-[-0.045em] text-white/88">{belief}</p><p className="mt-5 text-sm font-medium leading-relaxed text-white/64 sm:text-base">{story}</p><div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">Transition</p><p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/76">{belief}</p></div></div></motion.article>; }
function MobileLoopCard({ item, index, active, onToggle }: { item: typeof learningLoop[number]; index: number; active: boolean; onToggle: () => void }) { const [number, title, belief, story] = item; return <FadeIn delay={index * 0.035}><button type="button" onClick={onToggle} className={`group w-full overflow-hidden rounded-[1.5rem] border p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 ${active ? 'border-white/28 bg-white/[0.105]' : 'border-white/10 bg-white/[0.045]'}`}><span className="flex items-start gap-4"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border text-xs font-black transition ${active ? 'border-white/40 bg-white/15 text-white' : 'border-white/10 bg-white/[0.06] text-white/60'}`}>{number}</span><span className="flex-1"><span className="block text-2xl font-black uppercase tracking-[-0.055em] text-white">{title}</span><span className="mt-2 block text-sm leading-relaxed text-white/58">{belief}</span></span><span className="text-xl text-white/45">{active ? '−' : '+'}</span></span><motion.div initial={false} animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"><p className="mt-5 border-t border-white/10 pt-5 text-sm font-medium leading-relaxed text-white/66">{story}</p><div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">Transition</p><p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-white/70">{belief}</p></div></motion.div></button></FadeIn>; }
function System() {
  const [activeLoop, setActiveLoop] = useState<number | null>(null);
  const activeItem = activeLoop !== null ? learningLoop[activeLoop] : null;
  const orbitRadius = 278;
  const circumference = 2 * Math.PI * orbitRadius;
  const activeProgress = activeLoop === null ? 1 / learningLoop.length : (activeLoop + 1) / learningLoop.length;
  const progressOffset = circumference * (1 - activeProgress);
  const nextLoop = activeLoop === null ? 0 : (activeLoop + 1) % learningLoop.length;
  const sunIntensity = activeLoop === null ? 0.16 : (activeLoop + 1) / learningLoop.length;
  const sunOuterRadius = 144 + sunIntensity * 38;
  const sunMiddleRadius = 106 + sunIntensity * 28;
  const sunCoreRadius = 82 + sunIntensity * 20;
  const startBeamOpacity = activeLoop === null ? 0.72 : 0;
  const centerEyebrow = activeItem ? `${activeItem[0]} / ${activeItem[1]}` : 'Starting point';
  const centerTitle = activeItem ? activeItem[1] : 'Curiosity';
  const centerSubtitle = activeItem ? activeItem[2] : 'creates direction';
  const centerSubtitleLines = centerSubtitle.split(' ').reduce<string[]>((lines, word) => {
    const next = lines.length ? `${lines[lines.length - 1]} ${word}` : word;
    if (next.length > 22 && lines.length < 2) return [...lines, word];
    if (!lines.length) return [word];
    return [...lines.slice(0, -1), next];
  }, []);
  const projectAngle = -90;
  const beamLeft = {
    x: 380 + (orbitRadius - 62) * Math.cos(((projectAngle - 7) * Math.PI) / 180),
    y: 380 + (orbitRadius - 62) * Math.sin(((projectAngle - 7) * Math.PI) / 180),
  };
 const beamRight = {
  x: 380 + (orbitRadius - 62) * Math.cos(((projectAngle + 7) * Math.PI) / 180),
  y: 380 + (orbitRadius - 62) * Math.sin(((projectAngle + 7) * Math.PI) / 180),
};

const beamTip = {
  x: 380 + (orbitRadius - 10) * Math.cos((projectAngle * Math.PI) / 180),
  y: 380 + (orbitRadius - 10) * Math.sin((projectAngle * Math.PI) / 180),
};
  return (
    <section
      id="system"
      className="relative overflow-hidden bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(141,162,255,0.15),transparent_30%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.07),transparent_28%),linear-gradient(180deg,#050505,#080808)]" />
      <div className="absolute left-1/2 top-1/2 h-[980px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

      <div className="relative mx-auto max-w-[1500px]">
        <FadeIn>
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/45 sm:text-xs sm:tracking-[0.32em]">
            Operating method
          </p>
          <h2 className="text-[clamp(3rem,13vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-white">
            My Learning Loop
          </h2>
          <p className="mt-5 max-w-3xl text-xl font-light leading-relaxed text-white/72 sm:text-2xl">
            Curiosity starts the system. Projects expose the path. Iteration brings the next question back into focus.
          </p>
        </FadeIn>

        <div className="mt-12 hidden items-center gap-8 lg:grid lg:grid-cols-[minmax(720px,860px)_1fr] xl:gap-12">
          <div className="relative aspect-square w-full max-w-[860px]">
            <svg
              className="h-full w-full scale-[1.18] overflow-visible"
              viewBox="0 0 760 760"
              aria-label="Learning loop solar system diagram"
            >
              <defs>
                <filter id="orbitGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="sunActiveGlow">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

               <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stopColor="rgba(255,248,178,0.96)" />
  <stop offset="38%" stopColor="rgba(255,213,74,0.62)" />
  <stop offset="72%" stopColor="rgba(255,151,38,0.25)" />
  <stop offset="100%" stopColor="rgba(255,151,38,0)" />
</radialGradient>
              </defs>

              <g opacity="0.75">
                <circle cx="132" cy="156" r="1.4" fill="rgba(255,255,255,0.36)" />
                <circle cx="618" cy="186" r="1.1" fill="rgba(255,255,255,0.28)" />
                <circle cx="114" cy="512" r="1" fill="rgba(255,255,255,0.24)" />
                <circle cx="644" cy="542" r="1.5" fill="rgba(255,255,255,0.32)" />
                <circle cx="228" cy="88" r="0.9" fill="rgba(255,255,255,0.22)" />
                <circle cx="528" cy="684" r="1" fill="rgba(255,255,255,0.26)" />
                <circle cx="690" cy="356" r="0.85" fill="rgba(255,255,255,0.2)" />
                <circle cx="76" cy="344" r="0.9" fill="rgba(255,255,255,0.18)" />
                <motion.circle cx="588" cy="92" r="1.2" fill="rgba(255,255,255,0.28)" animate={{ opacity: [0.18, 0.62, 0.18] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }} />
                <motion.circle cx="198" cy="648" r="1.25" fill="rgba(255,255,255,0.24)" animate={{ opacity: [0.12, 0.55, 0.12] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }} />
              </g>

              <circle cx="380" cy="380" r="314" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              <circle cx="380" cy="380" r={orbitRadius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" strokeDasharray="3 12" />
              {activeLoop === null && (
  <motion.g
    initial={false}
    animate={{ opacity: [startBeamOpacity * 0.6, startBeamOpacity, startBeamOpacity * 0.6] }}
    transition={{ duration: 2.15, repeat: Infinity, ease: 'easeInOut' }}
  >
    <path
      d={`M 380 380 L ${beamLeft.x} ${beamLeft.y} Q ${beamTip.x} ${beamTip.y - 18} ${beamRight.x} ${beamRight.y} Z`}
      fill="rgba(255,203,64,0.24)"
      stroke="rgba(255,232,146,0.48)"
      strokeWidth="1.4"
      filter="url(#orbitGlow)"
    />
    <path
      d={`M 380 380 L ${beamTip.x} ${beamTip.y}`}
      stroke="rgba(255,244,180,0.72)"
      strokeWidth="6"
      strokeLinecap="round"
      filter="url(#orbitGlow)"
    />
  </motion.g>
)}
              <circle cx="380" cy="380" r={orbitRadius} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" strokeLinecap="round" filter="url(#orbitGlow)" />
              <motion.circle
                cx="380"
                cy="380"
                r={orbitRadius}
                fill="none"
                stroke="rgba(255,226,136,0.85)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={false}
                animate={{ strokeDashoffset: progressOffset, opacity: activeLoop === null ? 0.42 : 1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                transform="rotate(-90 380 380)"
                filter="url(#orbitGlow)"
              />
              <circle cx="380" cy="380" r="218" fill="none" stroke="rgba(141,162,255,0.13)" strokeWidth="1" />

              <motion.circle
                cx="380"
                cy="380"
                fill="url(#sunGlow)"
                animate={{ r: sunOuterRadius, opacity: 0.78 + sunIntensity * 0.22 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                filter="url(#sunActiveGlow)"
              />
              <motion.circle cx="380" cy="380" animate={{ r: sunMiddleRadius }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} fill={`rgba(255,196,54,${0.24 + sunIntensity * 0.12})`} stroke={`rgba(255,238,160,${0.36 + sunIntensity * 0.24})`} strokeWidth="1.6" />
              <motion.circle cx="380" cy="380" animate={{ r: sunCoreRadius }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} fill={`rgba(255,214,74,${0.34 + sunIntensity * 0.18})`} stroke={`rgba(255,248,190,${0.48 + sunIntensity * 0.24})`} strokeWidth="1.4" />
<motion.circle
  cx="380"
  cy="380"
  animate={{ r: 76 + sunIntensity * 18, opacity: 0.34 + sunIntensity * 0.42 }}
  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  fill="rgba(255,230,120,0.28)"
/>

              <motion.text
                key={`eyebrow-${centerEyebrow}`}
                x="380"
                y={activeItem ? 335 : 354}
                textAnchor="middle"
                className="select-none fill-white/45 text-[10px] font-black uppercase tracking-[0.28em]"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                {centerEyebrow}
              </motion.text>

              <motion.text
                key={`title-${centerTitle}`}
                x="380"
                y={activeItem ? 376 : 383}
                textAnchor="middle"
                className="select-none fill-white text-[22px] font-black uppercase tracking-[-0.07em]"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                {centerTitle}
              </motion.text>

              {centerSubtitleLines.map((line, index) => (
                <motion.text
                  key={`${centerSubtitle}-${index}`}
                  x="380"
                  y={activeItem ? 405 + index * 18 : 410}
                  textAnchor="middle"
                  className="select-none fill-white/72 text-[12px] font-bold uppercase tracking-[0.06em]"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.04 }}
                >
                  {line}
                </motion.text>
              ))}

              {learningLoop.map((item, index) => (
                <SvgLoopNode
                  key={item[1]}
                  item={item}
                  index={index}
                  active={activeLoop === index}
                  isNext={nextLoop === index}
                  intensity={sunIntensity}
                  onOpen={() => setActiveLoop(index)}
                />
              ))}
            </svg>
          </div>

          <div>
            {activeItem ? (
              <LoopDetailPanel item={activeItem} onReset={() => setActiveLoop(null)} />
            ) : (
              <motion.article
                initial={{ opacity: 0, x: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="noise relative overflow-hidden rounded-[2.25rem] border border-white/14 bg-white/[0.055] p-7 text-white shadow-[0_34px_130px_rgba(0,0,0,0.52)] backdrop-blur-3xl"
              >
                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                <div className="flex items-start justify-between gap-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/42">
                    Starting point
                  </p>
                  <button type="button" onClick={() => setActiveLoop(null)} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/35 transition hover:border-white/20 hover:bg-white/[0.09] hover:text-white/62">
                    Reset
                  </button>
                </div>
                <h3 className="mt-5 text-[clamp(2.4rem,6vw,4.6rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
                  Curiosity.
                </h3>
                <p className="mt-6 text-xl font-black leading-snug tracking-[-0.045em] text-white/88">
                  Curiosity creates direction before the first project begins.
                </p>
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/64 sm:text-base">
                  The loop starts when something feels interesting enough to test. That spark becomes a project, and the project begins exposing the next stage.
                </p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/36">
                    Transition
                  </p>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/76">
                    Curiosity creates direction
                  </p>
                </div>
              </motion.article>
            )}
          </div>
        </div>

        <div className="lg:hidden">
          <MobileSemiOrbitLoop />
        </div>
      </div>
    </section>
  );
}
function LearningStackCard({ item, index, onOpen }: { item: typeof learningStack[number]; index: number; onOpen: () => void }) { const [number, title, belief, meaning, focus] = item; const wide = index === learningStack.length - 1; return <FadeIn delay={index * 0.035} className={wide ? 'xl:col-span-3' : ''}><button type="button" onClick={onOpen} className="block h-full w-full cursor-pointer text-left"><article className={`group flex h-full min-h-[360px] flex-col rounded-[1.75rem] border border-white/75 bg-white/62 p-5 text-black shadow-[0_34px_120px_rgba(56,76,116,0.18)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/78 sm:min-h-[390px] sm:rounded-[2.25rem] sm:p-7 ${wide ? 'xl:min-h-[310px]' : ''}`}><div className="flex items-start justify-between gap-5"><span className="text-6xl font-black tracking-[-0.08em] text-black/14 sm:text-7xl">{number}</span><span className="rounded-full border border-[#8da2ff]/25 bg-white/65 px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-black/55 sm:text-[10px]">Learning</span></div><h3 className="mt-8 text-[clamp(2rem,8vw,3.5rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-black">{title}</h3><p className="mt-5 text-lg font-black leading-snug tracking-[-0.04em] text-black/88 sm:text-xl">{belief}</p><p className="mt-5 flex-1 text-sm font-medium leading-relaxed text-black/68 sm:text-base">{meaning}</p><div className="mt-7 rounded-2xl border border-[#8da2ff]/20 bg-white/58 p-4 backdrop-blur-xl"><p className="text-[9px] font-black uppercase tracking-[0.22em] text-black/42">Focus</p><p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-black/72 sm:text-sm">{focus}</p></div><p className="mt-5 text-[9px] font-black uppercase tracking-[0.24em] text-black/45">Tap to open deeper note</p></article></button></FadeIn>; }
function LearningStackModal({ item, onClose }: { item: typeof learningStack[number]; onClose: () => void }) { const [number, title, belief, meaning, focus, story] = item; useEffect(() => { const closeOnKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; window.addEventListener('keydown', closeOnKey); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', closeOnKey); document.body.style.overflow = ''; }; }, [onClose]); return <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#eef2ff]/30 px-4 py-8 backdrop-blur-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.article initial={{ opacity: 0, y: 34, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()} className="noise max-h-[88svh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white/70 p-6 text-black shadow-[0_44px_180px_rgba(56,76,116,0.28)] backdrop-blur-3xl sm:p-8 md:rounded-[3rem] md:p-10"><button type="button" onClick={onClose} className="float-right grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/55 text-black/70 backdrop-blur-xl"><X className="h-5 w-5" /></button><p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/48">{number} / Learning Stack</p><h3 className="mt-5 max-w-3xl text-[clamp(2.5rem,12vw,5.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-black">{title}</h3><p className="mt-6 max-w-2xl text-xl font-black leading-snug tracking-[-0.045em] text-black/86 sm:text-2xl">{belief}</p><p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-black/68 sm:text-lg">{story}</p><div className="mt-8 rounded-3xl border border-[#8da2ff]/20 bg-white/60 p-5 backdrop-blur-xl"><p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">How it shows up</p><p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-black/72 sm:text-base">{focus}</p></div><p className="mt-7 text-[10px] font-black uppercase tracking-[0.24em] text-black/42">Tap outside or press Esc to close</p></motion.article></motion.div>; }
function Work() { const [activeLearning, setActiveLearning] = useState<number | null>(null); return <section id="work" className="relative overflow-hidden bg-[#edf1f7] px-5 py-16 text-black sm:px-8 sm:py-24 md:px-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.96),transparent_34%),radial-gradient(circle_at_86%_10%,rgba(197,210,255,0.56),transparent_31%),radial-gradient(circle_at_52%_92%,rgba(236,245,255,0.88),transparent_39%),linear-gradient(135deg,#f8fafc_0%,#e8edf4_42%,#f4f7fb_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.45),transparent_38%,rgba(141,162,255,0.10)_68%,transparent)]" /><div className="relative mx-auto max-w-[1500px]"><FadeIn><p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-black sm:text-xs sm:tracking-[0.32em]">Active learning stack</p><h2 className="max-w-6xl text-[clamp(3rem,14vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-black">The Learning Stack</h2><p className="mt-5 max-w-3xl text-xl font-medium leading-relaxed text-black/70 sm:text-2xl">The interests, instincts, and disciplines I’m actively building around.</p></FadeIn><div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 xl:grid-cols-3">{learningStack.map((item, index) => <LearningStackCard key={item[1]} item={item} index={index} onOpen={() => setActiveLearning(index)} />)}</div></div>{activeLearning !== null && <LearningStackModal item={learningStack[activeLearning]} onClose={() => setActiveLearning(null)} />}</section>; }
function Capabilities() { return <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-24 md:px-10"><div className="mx-auto max-w-7xl"><FadeIn><SectionHeading>Capability pillars.</SectionHeading></FadeIn><div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">{pillars.map(([number, title, text, Icon]) => <div key={title} className="rounded-[1.5rem] border border-black/10 bg-black/[0.035] p-5 sm:rounded-[2rem] sm:p-6"><Icon className="mb-7 h-8 w-8 sm:mb-10" /><p className="text-sm text-black/35">{number}</p><h3 className="mt-4 text-lg font-black uppercase tracking-[-0.04em] sm:text-xl">{title}</h3><p className="mt-4 text-sm leading-relaxed text-black/60">{text}</p></div>)}</div></div></section>; }
function Obsessions() { return <section className="bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10"><div className="mx-auto max-w-7xl"><FadeIn><SectionLabel>Current explorations</SectionLabel><SectionHeading light>The ideas I keep returning to.</SectionHeading></FadeIn><div className="mt-10 grid gap-3.5 sm:mt-14 md:grid-cols-2">{obsessions.map((obsession, index) => <FadeIn key={obsession} delay={index * 0.03}><div className="liquid-glass flex min-h-16 items-center justify-between gap-5 rounded-[1.5rem] px-5 py-5 sm:rounded-[2rem] sm:px-6 sm:py-6"><span className="text-xl font-semibold tracking-[-0.05em] sm:text-2xl">{obsession}</span><span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/35 sm:text-xs sm:tracking-[0.24em]">Active</span></div></FadeIn>)}</div></div></section>; }
function ChapterCard({ chapter, onOpen, className = '' }: { chapter: readonly [string, string, string, string, string, string, string, string]; onOpen: () => void; className?: string }) {
  const [number, title, caption, src, alt, label, imgClassName] = chapter;
  return (
    <FadeIn className={className}>
      <CardContainer divisor={35} containerClassName="py-0 h-full w-full flex items-stretch justify-stretch" className="w-full h-full">
        <CardBody className="chapter-card group relative h-full w-full rounded-[1.5rem] border border-black/10 bg-black/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:rounded-[2rem] flex flex-col justify-end [transform-style:preserve-3d]">
          <button
            type="button"
            onClick={onOpen}
            className="absolute inset-0 z-30 w-full h-full cursor-pointer outline-none bg-transparent border-0"
            aria-label={`Read story: ${title}`}
          >
            <span className="sr-only">Read story: {title}</span>
          </button>
          
          {/* Soft highlight glow follows hover */}
          <div className="chapter-card-glow" />

          {/* Image layer */}
          <CardItem
            translateZ="70"
            className="absolute inset-0 h-full w-full z-0 select-none pointer-events-none rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"
          >
            <ImageFrame
              src={src}
              alt={alt}
              label={label}
              tone="soft"
              fit="cover"
              className="h-full w-full"
              imgClassName={`chapter-card-img ${imgClassName}`}
            />
          </CardItem>
          
          {/* Gradient Overlay */}
          <CardItem
            translateZ="0"
            className="absolute inset-0 z-10 rounded-[1.5rem] sm:rounded-[2rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))] w-full h-full"
          >
            {null}
          </CardItem>
          
          {/* Content layer */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white sm:p-5 lg:p-6 flex flex-col pointer-events-none [transform-style:preserve-3d]">
            <CardItem
              translateZ="70"
              translateY={-5}
              className="chapter-chip mb-2 text-[9px] uppercase tracking-[0.2em] text-white/58 sm:text-[10px]"
            >
              <span className="font-bold">{number}</span>
              <span className="text-white/30">/</span>
              <span>{label}</span>
            </CardItem>
            
            <CardItem
              translateZ="55"
              translateY={-4}
              className="w-full"
            >
              <h3 className="chapter-card-title max-w-xl text-[clamp(1.35rem,3.4vw,2.55rem)] font-black uppercase leading-[0.92] tracking-[-0.055em] text-white">
                {title}
              </h3>
            </CardItem>
            
            <CardItem
              translateZ="35"
              translateY={-2}
              className="w-full"
            >
              <p className="chapter-card-caption max-w-xl text-xs leading-relaxed text-white/78 sm:text-sm lg:text-[0.95rem] mt-3">
                {caption}
              </p>
            </CardItem>
            
            <CardItem
              translateZ="20"
              className="w-full"
            >
              <p className="mt-4 text-[9px] uppercase tracking-[0.24em] text-white/48">
                Tap to read the story
              </p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </FadeIn>
  );
}

function ChapterStoryModal({ chapter, onClose }: { chapter: readonly [string, string, string, string, string, string, string, string]; onClose: () => void }) {
  const [number, title, , src, alt, label, imgClassName, story] = chapter;
  useEffect(() => { const closeOnKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; window.addEventListener('keydown', closeOnKey); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', closeOnKey); document.body.style.overflow = ''; }; }, [onClose]);
  return <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/76 px-4 py-8 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.article initial={{ opacity: 0, y: 34, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()} className="noise grid max-h-[88svh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#090909] text-white shadow-[0_44px_180px_rgba(0,0,0,0.78)] md:grid-cols-[0.92fr_1.08fr] md:rounded-[3rem]"><div className="relative min-h-[260px] md:min-h-[560px]"><ImageFrame src={src} alt={alt} label={label} tone="soft" fit="cover" className="absolute inset-0 h-full w-full rounded-t-[2rem] md:rounded-l-[3rem] md:rounded-r-none md:rounded-t-none" imgClassName={imgClassName} /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" /></div><div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-10"><button type="button" onClick={onClose} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70"><X className="h-5 w-5" /></button><p className="text-[10px] uppercase tracking-[0.28em] text-white/40">{number} / {label}</p><h3 className="mt-5 pr-12 text-[clamp(2.2rem,9vw,4.8rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">{title}</h3><p className="mt-7 text-base leading-relaxed text-white/72 sm:text-lg">{story}</p><p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-white/35">Tap outside or press Esc to close</p></div></motion.article></motion.div>;
}

function BeforeCode() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const chapters = [
    ['01', 'Seven Years of Structure', 'Seven years at Sainik School Korukonda shaped my relationship with routine, standards, accountability, and brotherhood.', images.sainik, 'Sainik School Korukonda passing out batch', 'Structure', 'object-[50%_48%]', 'Seven years at Sainik School Korukonda gave me my first real understanding of structure. Routine, accountability, standards, and brotherhood were not ideas there — they were daily practice. It shaped how I respond to pressure and why I respect discipline before ambition.'],
    ['02', 'Discipline Into Leadership', 'NCC turned discipline into responsibility — command, presence, and carrying yourself with standards.', images.ncc, 'NCC portrait', 'Leadership', 'object-[50%_42%]', 'NCC helped me understand that discipline is not just personal. It becomes leadership when people depend on how you carry yourself. It taught me presence, responsibility, and the importance of standards when you are part of something bigger than yourself.'],
    ['03', 'Turning Ideas Visible', 'TEPE was where building became public — explaining, demonstrating, and turning curiosity into interaction.', images.tepe, 'TEPE exhibition demonstration', 'Builder Mode', 'object-[50%_45%]', 'TEPE was one of the first places where curiosity became visible. I was not just learning privately; I was explaining, demonstrating, and making ideas interactive for others. It pushed me toward building things that can be shown, questioned, and improved.'],
    ['04', 'Voice', 'Ideas become useful only when they can be communicated clearly.', images.voice, 'Public speaking close-up', 'Voice', 'object-[50%_36%]', 'Public speaking taught me that ideas do not matter much if they stay trapped inside your head. Voice gave me a way to structure thoughts, explain clearly, and stand behind what I believe. It connects my technical curiosity with communication.'],
    ['05', 'Present Chapter', 'GITAM is the current arena — software, AI, design, product thinking, and sharper proof.', images.gitam, 'GITAM campus portrait', 'GITAM', 'object-[50%_45%]', 'GITAM is my current arena. This is where I am exploring software, AI, design, and product thinking while learning how to turn scattered curiosity into visible work. I am still early, but this is where the builder version of me is taking shape.'],
  ] as const;

  return (
    <section id="before-code" className="bg-white px-5 py-16 text-black sm:px-8 md:px-10 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Before the code</SectionLabel>
          <SectionHeading>The chapters that formed me.</SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-6 sm:text-lg">
            These are not decorative images. They are proof of the environments, pressure, discipline, and people that shaped how I build now.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:mt-14 md:mt-10 md:grid-cols-6 md:gap-6 md:items-stretch">
          <ChapterCard chapter={chapters[0]} onOpen={() => setActiveChapter(0)} className="aspect-[16/9] md:aspect-auto md:col-span-2" />
          <ChapterCard chapter={chapters[1]} onOpen={() => setActiveChapter(1)} className="min-h-[520px] md:min-h-0 md:col-span-2" />
          <ChapterCard chapter={chapters[2]} onOpen={() => setActiveChapter(2)} className="aspect-[16/9] md:aspect-auto md:col-span-2" />
          <ChapterCard chapter={chapters[3]} onOpen={() => setActiveChapter(3)} className="aspect-[4/5] md:aspect-auto md:col-span-3" />
          <ChapterCard chapter={chapters[4]} onOpen={() => setActiveChapter(4)} className="aspect-[16/9] md:aspect-auto md:col-span-3" />
        </div>
      </div>
      {activeChapter !== null && <ChapterStoryModal chapter={chapters[activeChapter]} onClose={() => setActiveChapter(null)} />}
    </section>
  );
}
function Contact() { return <section id="contact" className="bg-[#050505] px-5 py-20 text-white sm:px-8 sm:py-28 md:px-10"><div className="liquid-glass mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] md:grid-cols-[0.86fr_1.14fr] md:rounded-[4rem]"><ImageFrame src={images.blazer} alt="Blazer portrait" label="Blazer portrait" tone="natural" className="aspect-[4/5] md:min-h-[580px]" imgClassName="object-[45%_16%] scale-[1.06]" /><div className="flex flex-col justify-center p-6 sm:p-8 md:p-16"><FadeIn><h2 className="text-[clamp(2.4rem,11vw,5.8rem)] font-black uppercase leading-[0.88] tracking-[-0.08em]">Still early. Still building.</h2><p className="mt-6 max-w-2xl text-base leading-relaxed text-white/66 sm:mt-7 sm:text-lg">I’m interested in AI, software, design, writing, product thinking, and ambitious people who care about visible proof.</p><div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4"><Button href="mailto:hemanthsairoyal7@gmail.com">Email me</Button><div className="flex justify-center gap-3 sm:justify-start">{socials.map(([label, href, Icon]) => { const external = href.startsWith('http'); return <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={label} className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-white/75 hover:text-white"><Icon className="h-5 w-5" /></a>; })}</div></div></FadeIn></div></div></section>; }
export default function PortfolioApp() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505]">
      <Hero />
      <Divider text="DISCIPLINE" />
      <IdentityStack />
      <Divider text="INVESTIGATIONS" />
      <ThoughtWorkspace />
      <Divider text="PRESSURE" />
      <Proof />
      <System />
      <Divider text="EXECUTION" />
      <Work />
      <Capabilities />
      <Obsessions />
      <BeforeCode />
      <Contact />
    </main>
  );
}
