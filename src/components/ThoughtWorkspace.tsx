import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, FileText, X } from 'lucide-react';
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
}

interface WorkspaceDrawer {
  id: string;
  title: string;
  count: number;
  color: string;
  icon: string;
  files: FileItem[];
  polygonPoints: string;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

const makeFiles = (prefix: string, tag: string, titles: string[]): FileItem[] =>
  titles.map((title, index) => ({
    id: `${prefix}-${index}`,
    title,
    tag,
    summary: `A working note around ${title.toLowerCase()} — patterns, questions, experiments, and proof I keep returning to while building.`,
  }));

const DRAWERS: WorkspaceDrawer[] = [
  {
    id: 'ai-leverage',
    title: 'AI Leverage',
    count: 47,
    color: '#d8d2c5',
    icon: '◈',
    files: [
      { id: 'prompt-systems', title: 'Prompt Systems', tag: 'SYSTEMS', summary: 'Turning raw thoughts into structured prompts, critique loops, checklists, and build instructions.' },
      { id: 'agent-workflows', title: 'Agent Workflows', tag: 'CODING LOOPS', summary: 'Using agents to inspect files, edit code, run checks, and ship faster while keeping human judgment in control.' },
      { id: 'local-models', title: 'Local Models', tag: 'INFRASTRUCTURE', summary: 'Testing Ollama, Qwen, and coding models as a private workshop for learning and building.' },
      { id: 'ai-interfaces', title: 'AI Product Interfaces', tag: 'PRODUCT UX', summary: 'Moving beyond chatboxes into canvases, workspaces, drawers, files, and visible thinking systems.' },
    ],
    polygonPoints: "53,214 409,211 409,408 53,423",
    position: { left: '3.45%', top: '20.63%', width: '23.16%', height: '21.41%' },
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    count: 18,
    color: '#c99a5a',
    icon: '◎',
    files: makeFiles('ux', 'BEHAVIOR', ['Attention', 'Friction', 'Mental Models', 'Microcopy', 'Trust Cues']),
    polygonPoints: "431,197 739,188 739,385 431,400",
    position: { left: '28.04%', top: '18.38%', width: '20.04%', height: '20.72%' },
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    count: 24,
    color: '#d5b18a',
    icon: '▧',
    files: makeFiles('validation', 'REALITY TESTING', ['Problem Discovery', 'User Interviews', 'Landing Tests', 'MVP Scope', 'PMF Signals']),
    polygonPoints: "760,181 1004,172 1004,362 760,376",
    position: { left: '49.45%', top: '16.81%', width: '15.88%', height: '19.94%' },
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    count: 32,
    color: '#cfc1a8',
    icon: '▤',
    files: makeFiles('story', 'NARRATIVE', ['Visual Metaphors', 'Scene Design', 'Hero Framing', 'Attention Beats', 'Brand Worlds']),
    polygonPoints: "1026,161 1285,151 1285,338 1026,351",
    position: { left: '66.75%', top: '14.76%', width: '16.85%', height: '19.55%' },
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    count: 15,
    color: '#a66f35',
    icon: '↗',
    files: makeFiles('investing', 'MODELS', ['Compounding', 'Incentives', 'Risk', 'Cycles', 'Moats']),
    polygonPoints: "53,430 409,415 409,628 53,645",
    position: { left: '3.45%', top: '40.57%', width: '23.16%', height: '22.48%' },
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    count: 29,
    color: '#9e9066',
    icon: 'ϟ',
    files: makeFiles('execution', 'MOMENTUM', ['21-Day Sprints', 'Activation Energy', 'Deep Work', 'Feedback Loops', 'Ship Criteria']),
    polygonPoints: "431,407 739,392 739,597 431,614",
    position: { left: '28.04%', top: '38.32%', width: '20.04%', height: '21.7%' },
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    count: 12,
    color: '#8d9092',
    icon: '◌',
    files: makeFiles('communication', 'CLARITY', ['Positioning', 'Launch Copy', 'Feature Narratives', 'Demos', 'Case Studies']),
    polygonPoints: "760,384 1004,369 1004,562 760,579",
    position: { left: '49.45%', top: '36.07%', width: '15.88%', height: '20.53%' },
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    count: 21,
    color: '#b6783e',
    icon: '✎',
    files: makeFiles('proof', 'EVIDENCE', ['Portfolio Hub', 'Build Logs', 'Framework Library', 'GitHub Proof', 'Demo Videos']),
    polygonPoints: "1026,359 1285,345 1285,532 1026,547",
    position: { left: '66.75%', top: '33.72%', width: '16.85%', height: '19.75%' },
  },
];

const trayVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 3 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 26,
      staggerChildren: 0.04,
      delayChildren: 0.02,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 3,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    }
  }
};

const fileVariants = {
  hidden: { y: 15, opacity: 0 },
  inactive: {
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 26,
    }
  },
  active: (index: number) => ({
    y: -10,
    scale: 1.05,
    rotate: index % 2 === 0 ? 1 : -1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 26,
    }
  })
};

export function ThoughtWorkspace() {
  const [activeDrawerId, setActiveDrawerId] = useState<string | null>('personal-proof-systems');
  const [activeFileId, setActiveFileId] = useState<string | null>('proof-0');

  const activeDrawer = useMemo(
    () => DRAWERS.find((drawer) => drawer.id === activeDrawerId) ?? null,
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
      <div className="tw-sim-shell">
        <div className="tw-copy-panel">
          <p className="tw-section-eyebrow">THOUGHT WORKSPACE</p>
          <h2 className="tw-section-title">
            The Ideas<br />I Keep<br /><span>Returning To</span>
          </h2>
          <p className="tw-section-subtitle">
            A private workspace of ongoing investigations, systems, and experiments that shape the work I do.
          </p>
          <p className="tw-signature">— Hemanth Sai</p>
          <div className="tw-stat-row">
            <div><strong>8</strong><span>Active Desks</span></div>
            <div><strong>57</strong><span>Files & Notes</span></div>
            <div><strong>∞</strong><span>Iterations</span></div>
          </div>
          <blockquote className="tw-quote-card">
            I don’t collect ideas.<br />I work with the ones<br />that don’t leave me.
          </blockquote>
        </div>

        <div className="tw-workshop-stage">
          <img
            className="tw-scene-photo"
            src={getAssetUrl('thought-workshop-scene.webp')}
            alt="Hemanth Sai working inside a warm thought workspace"
          />
          <div className="tw-photo-wash" />

          {/* SVG Hotspots Overlay */}
          <svg className="tw-hotspot-svg" viewBox="0 0 1537 1023" preserveAspectRatio="xMidYMid meet">
            {DRAWERS.map((drawer) => {
              const isActive = activeDrawerId === drawer.id;
              return (
                <polygon
                  key={drawer.id}
                  points={drawer.polygonPoints}
                  className={`tw-drawer-poly ${isActive ? 'is-active' : ''}`}
                  onClick={() => openDrawer(drawer)}
                  aria-label={`Open ${drawer.title}`}
                />
              );
            })}
          </svg>

          {/* Active Drawer Open Tray Overlay */}
          <AnimatePresence>
            {activeDrawer && (() => {
              const isLeftSide = ['ai-leverage', 'ux-psychology', 'investing-mental-models', 'execution-psychology'].includes(activeDrawer.id);
              const skewTransform = isLeftSide
                ? 'rotate(-0.5deg) skewX(-1deg)'
                : 'rotate(0.4deg) skewX(-1.2deg)';

              return (
                <div
                  key={`tray-wrapper-${activeDrawer.id}`}
                  className="tw-open-tray-wrapper"
                  style={{
                    left: activeDrawer.position.left,
                    top: activeDrawer.position.top,
                    width: activeDrawer.position.width,
                    height: activeDrawer.position.height,
                    transform: skewTransform,
                  } as React.CSSProperties}
                >
                  <motion.div
                    className="tw-open-tray"
                    variants={trayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Close button inside the tray to toggle back to hotspot */}
                    <button
                      type="button"
                      className="tw-tray-close-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDrawerId(null);
                        setActiveFileId(null);
                      }}
                      aria-label="Close drawer"
                    >
                      <X size={10} />
                    </button>

                    {/* Staggered File Divider Cards */}
                    <div className="tw-tray-files">
                      {activeDrawer.files.slice(0, 5).map((file, index) => {
                        const isFileActive = activeFileId === file.id;
                        return (
                          <motion.button
                            key={file.id}
                            type="button"
                            className={`tw-paper-file ${isFileActive ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveFileId(file.id);
                            }}
                            variants={fileVariants}
                            custom={index}
                            animate={isFileActive ? 'active' : 'inactive'}
                          >
                            {file.title}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>

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
                        <FileText size={16} />
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
        </div>
      </div>
    </section>
  );
}

export default ThoughtWorkspace;
