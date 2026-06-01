import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  Brush,
  Code2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  PenTool,
  Target,
  X,
  Zap,
  type LucideProps,
} from 'lucide-react';

type Project = {
  number: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
};

type Pillar = {
  number: string;
  title: string;
  text: string;
  icon: ComponentType<LucideProps>;
};

type DashboardItem = {
  title: string;
  text: string;
};

type EvidenceItem = {
  title: string;
  caption: string;
  src: string;
  alt: string;
  label: string;
  className: string;
  imgClassName?: string;
  tone?: 'natural' | 'soft' | 'mono';
};

const asset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const images = {
  hero: asset('hero-cutout.png'),
  martial: asset('martial.webp'),
  stage: asset('stage.webp'),
  shotput: asset('shotput.webp'),
  blazer: asset('blazer.webp'),
};

const navLinks = [
  { label: 'Identity', href: '#identity' },
  { label: 'Pressure', href: '#pressure' },
  { label: 'Proof', href: '#proof' },
  { label: 'System', href: '#system' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'Github', href: 'https://github.com/hemanthsairoyal7', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Instagram },
  { label: 'Mail', href: 'mailto:hemanthsairoyal7@gmail.com', icon: Mail },
];

const projects: Project[] = [
  {
    number: '01',
    name: 'Proof Hub',
    type: 'In progress',
    description:
      'This website is my first public attempt at turning scattered interests, experiences, notes, and experiments into one visible identity.',
    tags: ['Portfolio', 'Identity', 'Proof'],
  },
  {
    number: '02',
    name: 'AI Workflow Lab',
    type: 'Exploring',
    description:
      'Experiments with AI tools, automations, agents, and workflows that can become practical leverage instead of just curiosity.',
    tags: ['AI', 'Automation', 'Systems'],
  },
  {
    number: '03',
    name: 'UX Field Notes',
    type: 'Collecting',
    description:
      'A growing collection of interface observations, product thinking, design breakdowns, and notes from learning how better digital experiences are made.',
    tags: ['UX', 'Writing', 'Product'],
  },
];

const dashboard: DashboardItem[] = [
  { title: 'Background', text: 'GITAM CSE · IIT Madras BS learner · Sainik School Korukonda alumnus' },
  { title: 'Current Direction', text: 'Building a visible proof hub around AI, software, design, writing, and learning in public.' },
  { title: 'Builder Stack', text: 'React · TypeScript · Tailwind · Python · AI tools · GitHub · Figma · UX thinking' },
  { title: 'Performance Proof', text: 'Sports and martial arts shaped my relationship with repetition, pressure, and feedback.' },
  { title: 'Learning Loop', text: 'Project → Problem → Skill → Artifact → Explanation → Feedback' },
  { title: 'Reach Me', text: 'Email · GitHub · LinkedIn · Instagram' },
];

const pillars: Pillar[] = [
  { number: '01', title: 'AI + Automation', text: 'Using AI tools and models to build workflows, prototypes, and systems faster.', icon: BrainCircuit },
  { number: '02', title: 'Frontend Engineering', text: 'React, TypeScript, Tailwind, responsive interfaces, and interactive landing pages.', icon: Code2 },
  { number: '03', title: 'UX / Product Thinking', text: 'Understanding user flows, clarity, positioning, interaction, and product value.', icon: PenTool },
  { number: '04', title: 'Writing / Storytelling', text: 'Turning ideas into narratives, notes, frameworks, and visual communication.', icon: Brush },
  { number: '05', title: 'Execution Systems', text: 'Using sprints, proof loops, and feedback cycles to convert ideas into output.', icon: Target },
];

const obsessions = [
  'AI leverage',
  'UX psychology',
  'Startup validation',
  'Cinematic storytelling',
  'Investing mental models',
  'Execution psychology',
  'Product communication',
  'Personal proof systems',
];

const systemSteps = ['Project', 'Problem', 'Skill', 'Artifact', 'Explanation', 'Feedback', 'Iteration'];

const evidence: EvidenceItem[] = [
  {
    title: 'Discipline',
    caption: 'Martial arts shaped repetition before ambition had words.',
    src: images.martial,
    alt: 'Martial arts discipline',
    label: 'Martial arts',
    className: 'md:col-span-2 h-[340px] sm:h-[440px]',
    imgClassName: 'object-[50%_24%]',
    tone: 'soft',
  },
  {
    title: 'Voice',
    caption: 'Public speaking turned ideas into presence.',
    src: images.stage,
    alt: 'Stage speaking',
    label: 'Stage speaking',
    className: 'md:col-span-3 h-[280px] sm:h-[360px]',
    imgClassName: 'object-[50%_34%]',
    tone: 'natural',
  },
  {
    title: 'Pressure',
    caption: 'Sport taught me that execution reveals character.',
    src: images.shotput,
    alt: 'Shotput action',
    label: 'Shotput',
    className: 'md:col-span-5 h-[280px] sm:h-[430px]',
    imgClassName: 'object-[52%_center]',
    tone: 'soft',
  },
];

function FadeIn({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageFrame({
  src,
  alt,
  label,
  className = '',
  imgClassName = '',
  priority = false,
  fit = 'cover',
  tone = 'natural',
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  tone?: 'natural' | 'soft' | 'mono';
}) {
  const [broken, setBroken] = useState(false);
  const toneClass =
    tone === 'mono'
      ? 'grayscale brightness-105 contrast-110 saturate-0'
      : tone === 'soft'
        ? 'brightness-100 contrast-105 saturate-[0.92]'
        : 'brightness-100 contrast-105 saturate-100';
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className={`noise group relative overflow-hidden bg-white/[0.04] ${className}`}>
      {!broken ? (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          loading={priority ? 'eager' : 'lazy'}
          className={`h-full w-full ${fitClass} ${toneClass} transition-transform duration-700 group-hover:scale-[1.018] md:duration-1000 md:group-hover:scale-[1.035] ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[linear-gradient(135deg,#171717,#050505)] px-5 text-center">
          <span className="rounded-full border border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/55 sm:text-xs sm:tracking-[0.35em]">
            {label}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.34))]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.45)] sm:shadow-[inset_0_0_100px_rgba(0,0,0,0.55)]" />
    </div>
  );
}

function Button({ children, href = '#' }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="liquid-glass group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:scale-[1.02] hover:bg-white/[0.07] sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.2em]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
    </a>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-current/45 sm:text-xs sm:tracking-[0.32em]">{children}</p>;
}

function SectionHeading({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2 className={`max-w-5xl text-[clamp(2.45rem,12vw,5.8rem)] font-black uppercase leading-[0.92] tracking-[-0.075em] ${light ? 'text-white' : 'text-black'}`}>
      {children}
    </h2>
  );
}

function Divider({ text }: { text: string }) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-9 sm:py-14 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="relative flex animate-marquee-left whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.075] sm:text-[12vw] lg:text-[8vw]">
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className="mx-5 sm:mx-8">
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}

function Hero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section id="arrival" className="noise relative min-h-[100svh] overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.11),transparent_28%),radial-gradient(circle_at_10%_86%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,#050505,#0b0b0b)]" />
      <nav className="fixed left-0 right-0 top-0 z-40 px-3 py-3 sm:px-6 sm:py-4">
        <div className="liquid-glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 sm:px-5 sm:py-3">
          <a href="#arrival" className="max-w-[58vw] truncate text-sm font-black uppercase tracking-[-0.04em] sm:text-base">
            Hemanth Sai<span className="text-white/50">.</span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs font-medium uppercase tracking-[0.24em] text-white/65 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full text-white lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="hidden lg:block">
            <Button href="mailto:hemanthsairoyal7@gmail.com">Connect with me</Button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-black/95 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden">
          {navLinks.map((link) => (
            <a onClick={() => setOpen(false)} key={link.label} href={link.href} className="block border-b border-white/10 py-5 text-[clamp(2rem,10vw,3rem)] font-black uppercase leading-none tracking-[-0.06em]">
              {link.label}
            </a>
          ))}
          <div className="mt-7">
            <Button href="mailto:hemanthsairoyal7@gmail.com">Connect with me</Button>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl content-center gap-10 px-5 pb-10 pt-24 sm:px-7 sm:pb-12 sm:pt-28 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10">
        <div className="relative z-10">
          <FadeIn>
            <p className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.21em] text-white/60 sm:gap-3 sm:text-xs sm:tracking-[0.32em]">
              <Zap className="h-4 w-4 shrink-0" />
              AI / Software / Design / Writing / Discipline
            </p>
          </FadeIn>
          <motion.h1
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[10ch] text-[clamp(3.5rem,16vw,8.15rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-white"
          >
            Building proof, not noise.
          </motion.h1>
          <FadeIn delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72 sm:mt-7 sm:text-xl">
              I’m still early, but I’m building in public — turning curiosity across AI, software, design, and storytelling into visible proof.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <span className="liquid-glass inline-flex max-w-full items-center gap-3 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-xs sm:tracking-[0.22em]">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" />
                <span>Currently turning scattered ideas into visible projects</span>
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Button href="#work">See what I’m building</Button>
              <Button href="mailto:hemanthsairoyal7@gmail.com">Connect with me</Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08} className="relative mx-auto w-full max-w-[min(78vw,360px)] sm:max-w-[410px] lg:max-w-[500px]">
          <div className="absolute inset-x-6 bottom-2 top-16 rounded-full bg-white/10 blur-3xl" />
          <div className="relative rounded-[2.4rem] border border-white/10 bg-white/[0.035] p-3 shadow-[0_40px_140px_rgba(0,0,0,0.5)] sm:rounded-[3.2rem] sm:p-4">
            <ImageFrame
              src={images.hero}
              alt="Hemanth Sai cutout portrait"
              label="Hero portrait"
              priority
              fit="contain"
              tone="natural"
              className="relative aspect-[4/5] rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)] sm:rounded-[2.5rem]"
              imgClassName="scale-[1.03] object-bottom"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Glass({ title, text }: { title: string; text: string }) {
  return (
    <div className="liquid-glass rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6">
      <h3 className="mb-3 text-lg font-black uppercase tracking-[-0.04em] sm:text-xl">{title}</h3>
      <p className="text-sm leading-relaxed text-white/62">{text}</p>
    </div>
  );
}

function Identity() {
  return (
    <section id="identity" className="bg-[#070707] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="text-[18vw] font-black uppercase leading-none tracking-[-0.09em] text-white/10 sm:text-[14vw] lg:text-[8rem]">
            Identity
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr] lg:block">
            <ImageFrame
              src={images.martial}
              alt="Martial arts discipline"
              label="Martial arts"
              tone="soft"
              className="aspect-[4/5] rounded-[2rem] border border-white/10 sm:aspect-auto sm:h-[520px] sm:rounded-[3rem] lg:h-[620px]"
              imgClassName="object-[50%_22%]"
            />
            <div className="liquid-glass rounded-[2rem] p-5 sm:hidden">
              <p className="text-sm leading-relaxed text-white/62">Discipline is where the story started — repetition, feedback, and showing up when it is uncomfortable.</p>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <FadeIn>
              <p className="max-w-4xl text-[clamp(1.55rem,6.4vw,2.7rem)] font-light leading-[1.13] tracking-[-0.055em] text-white/86">
                I’m still early, but the pattern is clear: discipline from sport, voice from speaking, curiosity from technology, and a growing need to turn ideas into visible work.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Glass title="Discipline" text="Repetition, pressure, and physical practice shaped how I learn." />
                <Glass title="Voice" text="Speaking and writing help me make ideas clearer before I build around them." />
              </div>
            </FadeIn>
            <FadeIn delay={0.16}>
              <ImageFrame
                src={images.stage}
                alt="Podium speaking"
                label="Podium speaking"
                tone="natural"
                className="mt-5 aspect-[16/10] rounded-[1.75rem] border border-white/10 sm:rounded-[2.2rem]"
                imgClassName="object-[50%_34%]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pressure() {
  return (
    <section id="pressure" className="overflow-hidden bg-black px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <FadeIn className="order-2 lg:order-1">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/55 sm:mb-5 sm:tracking-[0.34em]">Forged under pressure</p>
          <h2 className="max-w-5xl text-[clamp(3rem,13vw,8.2rem)] font-black uppercase leading-[0.84] tracking-[-0.08em]">
            Execution reveals character.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:mt-6 sm:text-lg">
            Pressure has been one of my oldest teachers — from sports and martial arts to leadership and building. I trust repetition, feedback, and performance more than empty motivation.
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
}

function Proof() {
  return (
    <section id="proof" className="bg-white px-5 py-16 text-black sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Proof dashboard</SectionLabel>
          <SectionHeading>Credibility without resume noise.</SectionHeading>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {dashboard.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.035}>
              <div className="min-h-[180px] rounded-[1.5rem] border border-black/10 bg-black/[0.035] p-5 sm:min-h-[220px] sm:rounded-[2rem] sm:p-7">
                <p className="mb-6 text-xs uppercase tracking-[0.28em] text-black/35 sm:mb-8">0{index + 1}</p>
                <h3 className="mb-3 text-xl font-black uppercase tracking-[-0.05em] sm:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-black/60 sm:text-base">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function System() {
  return (
    <section id="system" className="bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="text-[18vw] font-black uppercase leading-none tracking-[-0.09em] text-white/10 sm:text-[14vw] lg:text-[8rem]">The System</h2>
          <p className="mt-5 max-w-3xl text-xl font-light leading-relaxed text-white/75 sm:mt-6 sm:text-2xl">
            I learn best through building. A project exposes the problem, the problem forces the skill, and the artifact gives me something real to improve.
          </p>
        </FadeIn>
        <div className="hide-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto pb-4 sm:mt-14">
          {systemSteps.map((step, index) => (
            <div key={step} className="liquid-glass min-w-[210px] snap-start rounded-[1.5rem] p-6 sm:min-w-[260px] sm:rounded-[2rem] sm:p-7">
              <p className="text-5xl font-black text-white/15 sm:text-6xl">0{index + 1}</p>
              <h3 className="mt-9 text-xl font-black uppercase tracking-[-0.05em] sm:mt-10 sm:text-2xl">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={index * 0.06} className={index % 2 === 1 ? 'lg:ml-auto' : ''}>
      <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/18 sm:rounded-[2.5rem] sm:p-7 lg:max-w-4xl lg:p-8">
        <div className="flex items-start justify-between gap-5">
          <span className="text-6xl font-black tracking-[-0.08em] text-white/13 sm:text-7xl">{project.number}</span>
          <span className="liquid-glass rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/60">{project.type}</span>
        </div>
        <h3 className="mt-8 text-[clamp(2.1rem,9vw,4.1rem)] font-black uppercase leading-none tracking-[-0.07em]">{project.name}</h3>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/64 sm:text-lg">{project.description}</p>
        <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </FadeIn>
  );
}

function Work() {
  return (
    <section id="work" className="bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Work in progress</SectionLabel>
          <h2 className="text-[18vw] font-black uppercase leading-none tracking-[-0.09em] text-white/10 sm:text-[14vw] lg:text-[8rem]">Taking Shape</h2>
          <p className="mt-5 max-w-3xl text-xl font-light leading-relaxed text-white/72 sm:text-2xl">
            I’m not showing a fake wall of finished products. These are the initiatives I’m actively trying to turn into visible proof.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-5 lg:mt-14 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading>Capability pillars.</SectionHeading>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="rounded-[1.5rem] border border-black/10 bg-black/[0.035] p-5 sm:rounded-[2rem] sm:p-6">
                <Icon className="mb-7 h-8 w-8 sm:mb-10" />
                <p className="text-sm text-black/35">{pillar.number}</p>
                <h3 className="mt-4 text-lg font-black uppercase tracking-[-0.04em] sm:text-xl">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/60">{pillar.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Obsessions() {
  return (
    <section className="bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel>Current explorations</SectionLabel>
          <SectionHeading light>The ideas I keep returning to.</SectionHeading>
        </FadeIn>
        <div className="mt-10 grid gap-3.5 sm:mt-14 md:grid-cols-2">
          {obsessions.map((obsession, index) => (
            <FadeIn key={obsession} delay={index * 0.03}>
              <div className="liquid-glass flex min-h-16 items-center justify-between gap-5 rounded-[1.5rem] px-5 py-5 sm:rounded-[2rem] sm:px-6 sm:py-6">
                <span className="text-xl font-semibold tracking-[-0.05em] sm:text-2xl">{obsession}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/35 sm:text-xs sm:tracking-[0.24em]">Active</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading>Proof is not always digital.</SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-6 sm:text-lg">
            These images are not decoration. They are reminders of discipline, pressure, communication, and the person behind the screen.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-5">
          {evidence.map((item) => (
            <FadeIn key={item.title} className={item.className}>
              <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/[0.035] sm:rounded-[2rem]">
                <ImageFrame src={item.src} alt={item.alt} label={item.label} tone={item.tone} className="absolute inset-0 h-full w-full" imgClassName={item.imgClassName} />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/58">{item.title}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/78 sm:text-base">{item.caption}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#050505] px-5 py-20 text-white sm:px-8 sm:py-28 md:px-10">
      <div className="liquid-glass mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] md:grid-cols-[0.86fr_1.14fr] md:rounded-[4rem]">
        <ImageFrame src={images.blazer} alt="Blazer portrait" label="Blazer portrait" tone="natural" className="aspect-[4/5] md:min-h-[580px]" imgClassName="object-[42%_18%] scale-[1.08]" />
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-16">
          <FadeIn>
            <h2 className="text-[clamp(2.4rem,11vw,5.8rem)] font-black uppercase leading-[0.88] tracking-[-0.08em]">
              Still early. Still building.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/66 sm:mt-7 sm:text-lg">
              I’m interested in AI, software, design, writing, product thinking, and ambitious people who care about visible proof.
            </p>
            <div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4">
              <Button href="mailto:hemanthsairoyal7@gmail.com">Email me</Button>
              <div className="flex justify-center gap-3 sm:justify-start">
                {socials.map((social) => {
                  const Icon = social.icon;
                  const external = social.href.startsWith('http');
                  return (
                    <a key={social.label} href={social.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={social.label} className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-white/75 hover:text-white">
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505]">
      <Hero />
      <Divider text="DISCIPLINE" />
      <Identity />
      <Divider text="PRESSURE" />
      <Pressure />
      <Proof />
      <System />
      <Divider text="EXECUTION" />
      <Work />
      <Capabilities />
      <Obsessions />
      <Evidence />
      <Contact />
    </main>
  );
}
