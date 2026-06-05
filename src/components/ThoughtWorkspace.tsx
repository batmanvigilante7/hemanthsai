import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
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

interface WorkspaceDrawer {
  id: string;
  title: string;
  status: string;
  count: number;
  hotspot: {
    left: string;
    top: string;
    width: string;
    height: string;
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

const WORKSPACE_DRAWERS: WorkspaceDrawer[] = [
  {
    id: 'ai-leverage',
    title: 'AI Leverage',
    status: 'ACTIVE INVESTIGATION',
    count: 47,
    hotspot: { left: '25%', top: '25%', width: '17%', height: '19%' },
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
    hotspot: { left: '45%', top: '23%', width: '15%', height: '17%' },
    files: makeFiles('ux', 'BEHAVIOR', ['Attention', 'Friction', 'Mental Models', 'Microcopy', 'Trust Cues', 'Decision Paths']),
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    status: 'ACTIVE INVESTIGATION',
    count: 24,
    hotspot: { left: '61%', top: '21%', width: '14%', height: '17%' },
    files: makeFiles('validation', 'REALITY TESTING', ['Problem Discovery', 'User Interviews', 'Landing Tests', 'MVP Scope', 'PMF Signals', 'Distribution Bets']),
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    status: 'ACTIVE INVESTIGATION',
    count: 32,
    hotspot: { left: '75%', top: '19%', width: '13%', height: '16%' },
    files: makeFiles('story', 'NARRATIVE', ['Visual Metaphors', 'Scene Design', 'Hero Framing', 'Attention Beats', 'Brand Worlds', 'Concept Art']),
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    status: 'ACTIVE INVESTIGATION',
    count: 15,
    hotspot: { left: '24%', top: '48%', width: '17%', height: '19%' },
    files: makeFiles('investing', 'MODELS', ['Compounding', 'Incentives', 'Risk', 'Cycles', 'Moats', 'Optionality']),
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    status: 'ACTIVE INVESTIGATION',
    count: 29,
    hotspot: { left: '43%', top: '49%', width: '16%', height: '18%' },
    files: makeFiles('execution', 'MOMENTUM', ['21-Day Sprints', 'Activation Energy', 'Deep Work', 'Feedback Loops', 'Decision Logs', 'Ship Criteria']),
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    status: 'ACTIVE INVESTIGATION',
    count: 12,
    hotspot: { left: '60%', top: '45%', width: '14%', height: '18%' },
    files: makeFiles('communication', 'CLARITY', ['Positioning', 'Launch Copy', 'Feature Narratives', 'Demos', 'Case Studies', 'Audience Fit']),
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    status: 'ACTIVE INVESTIGATION',
    count: 21,
    hotspot: { left: '76%', top: '42%', width: '14%', height: '23%' },
    files: makeFiles('proof', 'EVIDENCE', ['Portfolio Hub', 'Build Logs', 'Framework Library', 'GitHub Proof', 'Demo Videos', 'Public Notes']),
  },
];

export function ThoughtWorkspace() {
  const [activeDrawerId, setActiveDrawerId] = useState<string | null>('personal-proof-systems');
  const [activeFileId, setActiveFileId] = useState<string | null>('proof-0');

  const activeDrawer = useMemo(
    () => WORKSPACE_DRAWERS.find((drawer) => drawer.id === activeDrawerId) ?? null,
    [activeDrawerId]
  );

  const activeFile = useMemo(() => {
    if (!activeDrawer) return null;
    return activeDrawer.files.find((file) => file.id === activeFileId) ?? activeDrawer.files[0];
  }, [activeDrawer, activeFileId]);

  const openDrawer = (drawer: WorkspaceDrawer) => {
    setActiveDrawerId((current) => (current === drawer.id ? null : drawer.id));
    setActiveFileId(drawer.files[0]?.id ?? null);
  };

  return (
    <section className="tw-section" id="thought-workspace" aria-label="Thought Workspace Section">
      <div className="tw-workshop-shell">
        <div className="tw-copy-panel">
          <p className="tw-section-eyebrow">THOUGHT WORKSPACE</p>
          <h2 className="tw-section-title">
            The Ideas<br />I Keep<br /><span>Returning To</span>
          </h2>
          <p className="tw-section-subtitle">
            A private workspace of ongoing investigations, systems, and experiments that shape the work I do.
          </p>
          <p className="tw-signature">— Hemanth Sai</p>

          <div className="tw-stat-row" aria-label="Workspace statistics">
            <div><strong>8</strong><span>Active Desks</span></div>
            <div><strong>57</strong><span>Files & Notes</span></div>
            <div><strong>∞</strong><span>Iterations</span></div>
          </div>

          <blockquote className="tw-quote-card">
            I don’t collect ideas.<br />I work with the ones<br />that don’t leave me.
          </blockquote>
        </div>

        <div className="tw-scene-wrap">
          <div
            className="tw-scene-image"
            style={{ backgroundImage: `url(${getAssetUrl('thought-workshop-scene.png')})` }}
            aria-label="Cinematic thought workspace with drawers"
          />
          <div className="tw-scene-vignette" />

          {WORKSPACE_DRAWERS.map((drawer) => {
            const isActive = activeDrawerId === drawer.id;
            return (
              <motion.button
                key={drawer.id}
                type="button"
                className={`tw-hotspot ${isActive ? 'active' : ''}`}
                style={drawer.hotspot as React.CSSProperties}
                onClick={() => openDrawer(drawer)}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`${isActive ? 'Close' : 'Open'} ${drawer.title}`}
              >
                <span className="tw-hotspot-glow" />
                <span className="tw-hotspot-label">
                  <strong>{drawer.title}</strong>
                  <small>{drawer.count} files</small>
                </span>
              </motion.button>
            );
          })}

          <AnimatePresence>
            {activeDrawer && (
              <motion.aside
                key={activeDrawer.id}
                className="tw-file-panel"
                initial={{ opacity: 0, x: 34, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 34, scale: 0.98 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="tw-file-panel-header">
                  <div>
                    <h3>{activeDrawer.title}</h3>
                    <p>{activeDrawer.files.length} files</p>
                  </div>
                  <button type="button" onClick={() => setActiveDrawerId(null)} aria-label="Close file panel">
                    <X size={16} />
                  </button>
                </div>

                <div className="tw-file-panel-list">
                  {activeDrawer.files.map((file) => {
                    const selected = activeFile?.id === file.id;
                    return (
                      <button
                        key={file.id}
                        type="button"
                        className={`tw-file-tab ${selected ? 'selected' : ''}`}
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
                    className="tw-file-preview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <span>{activeFile.tag}</span>
                    <h4>{activeFile.title}</h4>
                    <p>{activeFile.summary}</p>
                  </motion.div>
                )}
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="tw-bottom-hint">Click on any desk to open files</div>
        </div>
      </div>
    </section>
  );
}

export default ThoughtWorkspace;
