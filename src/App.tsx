import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    type: 'Personal OS',
    description:
      'A living identity and proof-of-work hub that consolidates projects, frameworks, experiments, sports discipline, writing, and builder journey into one public system.',
    tags: ['Portfolio', 'Identity', 'Proof'],
  },
  {
    number: '02',
    name: 'AI Workflow Lab',
    type: 'Product Sprint',
    description:
      'A lab for building AI tools, automations, prototypes, and workflow systems around real problems — using AI as leverage, not just as a toy.',
    tags: ['AI', 'Automation', 'Systems'],
  },
  {
    number: '03',
    name: 'UX Field Notes',
    type: 'Writing System',
    description:
      'A library of observations, UX principles, product thinking, and frameworks from learning, experiments, and real interface breakdowns.',
    tags: ['UX', 'Writing', 'Frameworks'],
  },
];

const dashboard: DashboardItem[] = [
  {
    title: 'Background',
    text: 'GITAM CSE · IIT Madras BS learner · Sainik School Korukonda alumnus',
  },
  {
    title: 'Current Mission',
    text: 'Build the Hemanth Sai Proof Hub — AI products, UX case studies, frameworks, experiments, writing, and visible artifacts.',
  },
  {
    title: 'Builder Stack',
    text: 'React · TypeScript · Tailwind · Python · AI tools · GitHub · Figma · UX thinking · product strategy',
  },
  {
    title: 'Performance Proof',
    text: 'Athlete and martial artist with medals across sports. Competitive discipline shapes how I learn and execute.',
  },
  {
    title: 'Operating Mode',
    text: 'Project → Problem → Skill → Artifact → Explanation → Feedback',
  },
  {
    title: 'Reach Me',
    text: 'Email · GitHub · LinkedIn · Instagram',
  },
];

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'AI + Automation',
    text: 'Using AI tools and models to build workflows, prototypes, and systems faster.',
    icon: BrainCircuit,
  },
  {
    number: '02',
    title: 'Frontend Engineering',
    text: 'React, TypeScript, Tailwind, responsive interfaces, and interactive landing pages.',
    icon: Code2,
  },
  {
    number: '03',
    title: 'UX / Product Thinking',
    text: 'Understanding user flows, clarity, positioning, interaction, and product value.',
    icon: PenTool,
  },
  {
    number: '04',
    title: 'Storytelling / Content',
    text: 'Turning ideas into narratives, posts, frameworks, and visual communication.',
    icon: Brush,
  },
  {
    number: '05',
    title: 'Execution Systems',
    text: 'Using campaigns, sprints, proof loops, and feedback cycles to convert ideas into output.',
    icon: Target,
  },
];

const obsessions = [
  'AI leverage',
  'UX psychology',
  'Startup validation',
  'Cinematic storytelling',
  'Investing mental models',
  'Execution psychology',
  'Native advertising',
  'Personal brand systems',
];

const systemSteps = ['Obsession', 'Structure', 'Critique', 'MVP', 'Proof', 'Feedback', 'Iteration'];

function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
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
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  return (
    <div className={`noise group relative overflow-hidden bg-white/[0.04] ${className}`}>
      {!broken ? (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          loading={priority ? 'eager' : 'lazy'}
          className={`h-full w-full object-cover brightness-95 contrast-110 saturate-110 transition-transform duration-700 group-hover:scale-[1.025] md:duration-1000 md:group-hover:scale-105 ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-[linear-gradient(135deg,#171717,#050505)] px-5 text-center">
          <span className="rounded-full border border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white/55 sm:text-xs sm:tracking-[0.35em]">
            {label}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.42))]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] sm:shadow-[inset_0_0_120px_rgba(0,0,0,0.68)]" />
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
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-10 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_55%)]" />
      <div className="relative flex animate-marquee-left whitespace-nowrap text-[24vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.08] sm:text-[13vw] lg:text-[10vw]">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_10%_85%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,#050505,#0b0b0b)]" />

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
            <Button href="mailto:hemanthsairoyal7@gmail.com">Build with me</Button>
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
            <Button href="mailto:hemanthsairoyal7@gmail.com">Build with me</Button>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl content-center gap-8 px-5 pb-10 pt-24 sm:px-7 sm:pb-12 sm:pt-28 lg:grid-cols-[1.06fr_0.94fr] lg:items-end lg:px-10">
        <div className="relative z-10">
          <FadeIn>
            <p className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.21em] text-white/60 sm:gap-3 sm:text-xs sm:tracking-[0.32em]">
              <Zap className="h-4 w-4 shrink-0" />
              AI / Product / Design / Execution / Storytelling
            </p>
          </FadeIn>

          <motion.h1
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[10ch] text-[clamp(3.7rem,17vw,8.2rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-white"
          >
            I build proof, not noise.
          </motion.h1>

          <FadeIn delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72 sm:mt-7 sm:text-xl">
              AI-native builder shaping products, systems, and stories that survive reality.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <span className="liquid-glass inline-flex max-w-full items-center gap-3 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-xs sm:tracking-[0.22em]">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-white" />
                <span>Currently building intelligent systems</span>
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Button href="#work">Enter the Proof Hub</Button>
              <Button href="mailto:hemanthsairoyal7@gmail.com">Build with me</Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08} className="relative mx-auto w-full max-w-[min(76vw,320px)] sm:max-w-[380px] lg:max-w-[430px]">
          <div className="absolute inset-8 rounded-full bg-white/10 blur-3xl" />
          <ImageFrame
            src={images.hero}
            alt="Hemanth Sai cutout portrait"
            label="Hero portrait"
            priority
            className="relative aspect-[0.82] rounded-[2rem] border border-white/10 sm:rounded-[3rem]"
            imgClassName="object-contain scale-105"
          />
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
          <h2 className="text-[20vw] font-black uppercase leading-none tracking-[-0.09em] text-white/10 sm:text-[16vw] lg:text-[9rem]">
            Identity
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <ImageFrame src={images.martial} alt="Martial arts discipline" label="Martial arts" className="h-[min(82svh,460px)] rounded-[2rem] border border-white/10 sm:h-[520px] sm:rounded-[3rem]" />

          <div className="flex flex-col justify-end">
            <FadeIn>
              <p className="max-w-4xl text-[clamp(1.65rem,7.3vw,3rem)] font-light leading-[1.12] tracking-[-0.055em] text-white/86">
                I’m not trying to be boxed into one title. I’m wiring AI, software, design, storytelling, investing-style thinking, and athletic discipline into one compounding proof-of-work machine.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Glass title="Discipline" text="Not a personality trait. An operating system." />
                <Glass title="Leadership" text="Ideas only matter when they survive public reality." />
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <ImageFrame src={images.stage} alt="Podium speaking" label="Podium speaking" className="mt-5 h-[240px] rounded-[1.75rem] border border-white/10 sm:h-[310px] sm:rounded-[2.2rem]" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pressure() {
  return (
    <section id="pressure" className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      <ImageFrame src={images.shotput} alt="Shotput action" label="Shotput performance" className="absolute inset-0 h-full w-full" imgClassName="object-[52%_center]" />
      <div className="absolute inset-0 bg-black/48 sm:bg-black/38" />
      <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-14 sm:px-10 sm:pb-16">
        <FadeIn>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/55 sm:mb-5 sm:tracking-[0.34em]">
            Forged under pressure
          </p>
          <h2 className="max-w-6xl text-[clamp(3.2rem,15vw,10rem)] font-black uppercase leading-[0.84] tracking-[-0.08em]">
            Execution reveals character.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:mt-6 sm:text-lg">
            Pressure has been one of my oldest teachers — from sports and martial arts to leadership and building. I trust repetition, feedback, and performance more than empty motivation.
          </p>
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
          <h2 className="text-[18vw] font-black uppercase leading-none tracking-[-0.09em] text-white/10 sm:text-[14vw] lg:text-[8rem]">
            The System
          </h2>
          <p className="mt-5 max-w-3xl text-xl font-light leading-relaxed text-white/75 sm:mt-6 sm:text-2xl">
            I don’t learn best by passively collecting courses. I learn through building. I capture ideas, break them down, criticize them, test reality, and convert the serious ones into artifacts.
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

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.38, 1], [1, 1, 1 - (total - index - 1) * 0.06]);

  return (
    <div ref={ref} className={`relative py-5 lg:h-[108vh] lg:min-h-[820px] lg:py-0 ${index === 0 ? '' : 'lg:-mt-[58vh]'}`}>
      <motion.article
        style={{ scale, zIndex: 30 + index }}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.58)] sm:rounded-[2.5rem] sm:p-7 lg:sticky lg:top-24 lg:rounded-[4rem] lg:p-10 lg:shadow-[0_80px_220px_rgba(0,0,0,0.78)]"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <span className="text-6xl font-black tracking-[-0.08em] text-white/15 sm:text-8xl">{project.number}</span>

          <div className="max-w-3xl">
            <span className="liquid-glass mb-4 inline-flex rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/60">In progress</span>
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">{project.type}</p>
            <h3 className="mt-3 text-[clamp(2.2rem,10vw,4.5rem)] font-black uppercase leading-none tracking-[-0.07em]">{project.name}</h3>
            <p className="mt-5 text-base leading-relaxed text-white/64 sm:text-lg">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-28 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(135deg,#171717,#050505)] sm:h-40 sm:rounded-[2rem] lg:h-64" />
          ))}
        </div>
      </motion.article>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="text-[21vw] font-black uppercase leading-none tracking-[-0.09em] text-white/10 sm:text-[16vw] lg:text-[9rem]">Work</h2>
        </FadeIn>

        <div className="mt-6 lg:mt-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} total={projects.length} />
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
          <SectionLabel>Current obsessions</SectionLabel>
          <SectionHeading light>Building systems that compound identity into leverage.</SectionHeading>
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
            The same operating system shows up everywhere: discipline, performance, communication, and execution.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-5">
          <ImageFrame src={images.martial} alt="Martial arts" label="Martial arts" className="h-60 rounded-[1.5rem] sm:h-80 sm:rounded-[2rem] md:col-span-2" />
          <ImageFrame src={images.stage} alt="Stage" label="Stage" className="h-60 rounded-[1.5rem] sm:h-80 sm:rounded-[2rem] md:col-span-3" />
          <ImageFrame src={images.shotput} alt="Shotput" label="Shotput" className="h-72 rounded-[1.5rem] sm:h-96 sm:rounded-[2rem] md:col-span-3" imgClassName="object-[52%_center]" />
          <ImageFrame src={images.blazer} alt="Blazer" label="Blazer" className="h-72 rounded-[1.5rem] sm:h-96 sm:rounded-[2rem] md:col-span-2" />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-24 md:px-10">
      <div className="liquid-glass mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] md:grid-cols-[0.9fr_1.1fr] md:rounded-[4rem]">
        <ImageFrame src={images.blazer} alt="Blazer portrait" label="Blazer portrait" className="h-[420px] md:min-h-[520px]" />

        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-16">
          <FadeIn>
            <h2 className="text-[clamp(2.4rem,11vw,5.8rem)] font-black uppercase leading-[0.88] tracking-[-0.08em]">
              Let’s build things that survive reality.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/66 sm:mt-7 sm:text-lg">
              I’m interested in AI products, design-led software, startup ideas, product thinking, systems, and ambitious people who care about proof.
            </p>
            <div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4">
              <Button href="mailto:hemanthsairoyal7@gmail.com">Email me</Button>
              <div className="flex justify-center gap-3 sm:justify-start">
                {socials.map((social) => {
                  const Icon = social.icon;
                  const external = social.href.startsWith('http');
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      aria-label={social.label}
                      className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-white/75 hover:text-white"
                    >
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
