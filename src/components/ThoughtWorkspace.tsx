import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Laptop, X } from 'lucide-react';
import './ThoughtWorkspace.css';

const getAssetUrl = (fileName: string) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}assets/${fileName}`;
};

interface FileItem {
  id: string;
  title: string;
  tag: string;
  summary: string;
  question: string;
  proof: string;
}

interface Drawer {
  id: string;
  title: string;
  status: string;
  count: number;
  cat: string;
  color: string;
  pos: {
    left: string;
    top: string;
    rotate: string;
  };
  files: FileItem[];
}

const makeFiles = (prefix: string, tag: string, items: string[]): FileItem[] =>
  items.map((title, index) => ({
    id: `${prefix}-${index}`,
    title,
    tag,
    summary: `A working note inside this investigation: ${title}. It captures the patterns, questions, experiments, and proof I keep returning to while building.`,
    question: `How can ${title.toLowerCase()} become visible proof instead of remaining a private idea?`,
    proof: 'Connected to portfolio experiments, product notes, local AI workflows, writing drafts, and build-driven learning loops.',
  }));

const DRAWERS: Drawer[] = [
  {
    id: 'ai-leverage',
    title: 'AI Leverage',
    status: 'ACTIVE INVESTIGATION',
    count: 47,
    cat: 'ai',
    color: '#E8F5E9',
    pos: { left: '7%', top: '7%', rotate: '-2deg' },
    files: [
      {
        id: 'prompt-systems',
        title: 'Prompt Systems',
        tag: 'SYSTEMS',
        summary: 'How I turn raw thoughts into structured prompts, critique loops, checklists, and build instructions that actually move projects forward.',
        question: 'How do I make AI behave less like a chatbot and more like a disciplined execution partner?',
        proof: 'Used ChatGPT and local coding agents to structure portfolio sections, critique ideas, plan build phases, and convert scattered thinking into shippable artifacts.',
      },
      {
        id: 'agent-workflows',
        title: 'Agent Workflows',
        tag: 'CODING LOOPS',
        summary: 'Exploring local and cloud agents that can inspect files, edit code, run checks, and help ship faster without replacing taste or judgment.',
        question: 'Where should the human stay in control while AI handles the repetitive execution layer?',
        proof: 'Experimented with repo edits, build checks, and AI-assisted website iteration while keeping design direction human-led.',
      },
      {
        id: 'local-models',
        title: 'Local Models',
        tag: 'INFRASTRUCTURE',
        summary: 'Ollama, Qwen, DeepSeek-style coding models, and the practical tradeoffs of running AI on a normal student laptop.',
        question: 'Can local AI become a private workshop for learning, coding, and experimentation?',
        proof: 'Set up local model workflows and tested them against real portfolio/product-building tasks.',
      },
      {
        id: 'human-ai-collaboration',
        title: 'Human-AI Collaboration',
        tag: 'WORKFLOW DESIGN',
        summary: 'A repeatable loop: idea → critique → improve → build → test → refine. AI accelerates the loop, but the builder owns the taste.',
        question: 'What does a high-agency student builder look like when AI becomes leverage instead of distraction?',
        proof: 'Used AI as a thinking partner across product design, storytelling, copy, code, and proof-of-work systems.',
      },
      {
        id: 'ai-product-interfaces',
        title: 'AI Product Interfaces',
        tag: 'PRODUCT UX',
        summary: 'Moving beyond chatboxes into canvases, workspaces, file systems, drawers, and visible thinking environments.',
        question: 'How should AI products make thinking visible instead of hiding everything behind a prompt box?',
        proof: 'This Thought Workspace section is itself an experiment in turning personal cognition into interface.',
      },
      {
        id: 'automation-loops',
        title: 'Automation Loops',
        tag: 'EXECUTION',
        summary: 'Systems that reduce friction: reminders, repeatable prompts, build checklists, repo updates, and progress tracking.',
        question: 'Which parts of ambition can be systemized without killing creative energy?',
        proof: 'Mapped build phases, QA loops, and iteration checklists for shipping faster without drowning in tutorials.',
      },
    ],
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    status: 'ACTIVE INVESTIGATION',
    count: 18,
    cat: 'ux',
    color: '#FFF8E1',
    pos: { left: '36%', top: '5%', rotate: '1deg' },
    files: makeFiles('ux', 'BEHAVIOR', ['Attention', 'Friction', 'Mental Models', 'Microcopy', 'Trust Cues', 'Decision Paths']),
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    status: 'ACTIVE INVESTIGATION',
    count: 24,
    cat: 'validation',
    color: '#F5EBE6',
    pos: { left: '67%', top: '9%', rotate: '2deg' },
    files: makeFiles('validation', 'REALITY TESTING', ['Problem Discovery', 'User Interviews', 'Landing Tests', 'MVP Scope', 'PMF Signals', 'Distribution Bets']),
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    status: 'ACTIVE INVESTIGATION',
    count: 32,
    cat: 'story',
    color: '#EAE6F2',
    pos: { left: '4%', top: '43%', rotate: '2deg' },
    files: makeFiles('story', 'NARRATIVE', ['Visual Metaphors', 'Scene Design', 'Hero Framing', 'Attention Beats', 'Brand Worlds', 'Concept Art']),
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    status: 'ACTIVE INVESTIGATION',
    count: 15,
    cat: 'investing',
    color: '#F5F2E6',
    pos: { left: '71%', top: '43%', rotate: '-2deg' },
    files: makeFiles('investing', 'MODELS', ['Compounding', 'Incentives', 'Risk', 'Cycles', 'Moats', 'Optionality']),
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    status: 'ACTIVE INVESTIGATION',
    count: 29,
    cat: 'execution',
    color: '#F5E6EC',
    pos: { left: '10%', top: '76%', rotate: '-1deg' },
    files: makeFiles('execution', 'MOMENTUM', ['21-Day Sprints', 'Activation Energy', 'Deep Work', 'Feedback Loops', 'Decision Logs', 'Ship Criteria']),
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    status: 'ACTIVE INVESTIGATION',
    count: 12,
    cat: 'communication',
    color: '#E6F5ED',
    pos: { left: '40%', top: '78%', rotate: '1deg' },
    files: makeFiles('communication', 'CLARITY', ['Positioning', 'Launch Copy', 'Feature Narratives', 'Demos', 'Case Studies', 'Audience Fit']),
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    status: 'ACTIVE INVESTIGATION',
    count: 21,
    cat: 'proof',
    color: '#F2ECE6',
    pos: { left: '70%', top: '75%', rotate: '-1deg' },
    files: makeFiles('proof', 'EVIDENCE', ['Portfolio Hub', 'Build Logs', 'Framework Library', 'GitHub Proof', 'Demo Videos', 'Public Notes']),
  },
];

export function ThoughtWorkspace() {
  const [activeDrawerId, setActiveDrawerId] = useState<string | null>('ai-leverage');
  const [activeFileId, setActiveFileId] = useState<string | null>('prompt-systems');

  const activeDrawer = useMemo(
    () => DRAWERS.find((drawer) => drawer.id === activeDrawerId) ?? null,
    [activeDrawerId]
  );

  const activeFile = useMemo(() => {
    if (!activeDrawer) return null;
    return activeDrawer.files.find((file) => file.id === activeFileId) ?? activeDrawer.files[0];
  }, [activeDrawer, activeFileId]);

  const openDrawer = (drawer: Drawer) => {
    setActiveDrawerId((current) => (current === drawer.id ? null : drawer.id));
    setActiveFileId(drawer.files[0]?.id ?? null);
  };

  return (
    <section className="tw-section" id="thought-workspace" aria-label="Thought Workspace Section">
      <div className="tw-container">
        <div className="tw-section-header">
          <p className="tw-section-eyebrow">RECURRING INVESTIGATIONS</p>
          <h2 className="tw-section-title">The Ideas I Keep Returning To</h2>
          <p className="tw-section-subtitle">
            A tilted desk of active drawers — each one opens into the files, questions, and proof behind the obsession.
          </p>
        </div>

        <div className="tw-desk-surface">
          <div className="tw-perspective-stage" aria-hidden="true">
            <div className="tw-grid-floor" />
          </div>

          <div className="tw-drawers-layer">
            {DRAWERS.map((drawer) => {
              const isOpen = activeDrawerId === drawer.id;
              const style = {
                '--drawer-color': drawer.color,
                left: drawer.pos.left,
                top: drawer.pos.top,
                transform: `rotate(${drawer.pos.rotate})`,
              } as React.CSSProperties;

              return (
                <motion.button
                  key={drawer.id}
                  className={`tw-drawer ${isOpen ? 'open' : ''}`}
                  style={style}
                  onClick={() => openDrawer(drawer)}
                  whileHover={{ y: -4, scale: 1.012 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  aria-label={`Open ${drawer.title} drawer`}
                >
                  <span className="tw-drawer-box">
                    <span className="tw-drawer-back" />
                    <span className="tw-drawer-side tw-drawer-side-left" />
                    <span className="tw-drawer-side tw-drawer-side-right" />
                    <span className="tw-drawer-lid">
                      <span className="tw-mini-stack">
                        {drawer.files.slice(0, 3).map((file, index) => (
                          <span key={file.id} className={`tw-mini-file tw-mini-file-${index + 1}`}>
                            {file.title}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="tw-drawer-front">
                      <span className="tw-drawer-status"><span />{drawer.status}</span>
                      <strong>{drawer.title}</strong>
                      <small>{drawer.count} files</small>
                      <span className="tw-drawer-handle" />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className="tw-maker-card"
            initial={{ opacity: 0, y: 20, rotateY: -35 }}
            whileInView={{ opacity: 1, y: 0, rotateY: -35 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tw-maker-desk-back" />
            <div className="tw-maker-photo-wrap">
              <img
                src={getAssetUrl('hero-current.webp.webp')}
                alt="Hemanth Sai working at a tilted desk"
                className="tw-maker-photo"
              />
            </div>
            <div className="tw-laptop-object">
              <Laptop size={28} />
              <span />
            </div>
            <div className="tw-maker-caption">
              <span>HEMANTH SAI</span>
              <strong>working through the drawers</strong>
            </div>
          </motion.div>

          <AnimatePresence>
            {activeDrawer && (
              <motion.aside
                key={activeDrawer.id}
                className="tw-drawer-panel"
                initial={{ opacity: 0, x: 28, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 28, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="tw-panel-header">
                  <div>
                    <p>{activeDrawer.status}</p>
                    <h3>{activeDrawer.title}</h3>
                  </div>
                  <button onClick={() => setActiveDrawerId(null)} aria-label="Close drawer panel">
                    <X size={16} />
                  </button>
                </div>

                <div className="tw-panel-body">
                  <div className="tw-file-list">
                    {activeDrawer.files.map((file) => {
                      const selected = activeFile?.id === file.id;
                      return (
                        <button
                          key={file.id}
                          className={`tw-file-row ${selected ? 'selected' : ''}`}
                          onClick={() => setActiveFileId(file.id)}
                        >
                          <span>
                            <strong>{file.title}</strong>
                            <small>{file.tag}</small>
                          </span>
                          <ChevronRight size={14} />
                        </button>
                      );
                    })}
                  </div>

                  {activeFile && (
                    <motion.div
                      key={activeFile.id}
                      className="tw-file-detail"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="tw-file-detail-tag">{activeFile.tag}</span>
                      <h4>{activeFile.title}</h4>
                      <p>{activeFile.summary}</p>
                      <blockquote>“{activeFile.question}”</blockquote>
                      <div className="tw-proof-note">
                        <span>Related proof</span>
                        {activeFile.proof}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ThoughtWorkspace;
