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
    position: { left: '4%', top: '20%', width: '25%', height: '22%' },
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    count: 18,
    color: '#c99a5a',
    icon: '◎',
    files: makeFiles('ux', 'BEHAVIOR', ['Attention', 'Friction', 'Mental Models', 'Microcopy', 'Trust Cues']),
    position: { left: '29%', top: '19%', width: '24%', height: '22%' },
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    count: 24,
    color: '#d5b18a',
    icon: '▧',
    files: makeFiles('validation', 'REALITY TESTING', ['Problem Discovery', 'User Interviews', 'Landing Tests', 'MVP Scope', 'PMF Signals']),
    position: { left: '53%', top: '18.5%', width: '19%', height: '22%' },
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    count: 32,
    color: '#cfc1a8',
    icon: '▤',
    files: makeFiles('story', 'NARRATIVE', ['Visual Metaphors', 'Scene Design', 'Hero Framing', 'Attention Beats', 'Brand Worlds']),
    position: { left: '72%', top: '18%', width: '22%', height: '22%' },
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    count: 15,
    color: '#a66f35',
    icon: '↗',
    files: makeFiles('investing', 'MODELS', ['Compounding', 'Incentives', 'Risk', 'Cycles', 'Moats']),
    position: { left: '4%', top: '44.5%', width: '25%', height: '22%' },
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    count: 29,
    color: '#9e9066',
    icon: 'ϟ',
    files: makeFiles('execution', 'MOMENTUM', ['21-Day Sprints', 'Activation Energy', 'Deep Work', 'Feedback Loops', 'Ship Criteria']),
    position: { left: '29%', top: '43.5%', width: '24%', height: '22%' },
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    count: 12,
    color: '#8d9092',
    icon: '◌',
    files: makeFiles('communication', 'CLARITY', ['Positioning', 'Launch Copy', 'Feature Narratives', 'Demos', 'Case Studies']),
    position: { left: '53%', top: '42.8%', width: '19%', height: '22%' },
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    count: 21,
    color: '#b6783e',
    icon: '✎',
    files: makeFiles('proof', 'EVIDENCE', ['Portfolio Hub', 'Build Logs', 'Framework Library', 'GitHub Proof', 'Demo Videos']),
    position: { left: '72%', top: '42%', width: '22%', height: '22%' },
  },
];

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

          <div className="tw-cabinet" aria-label="Interactive investigation drawer cabinet">
            {DRAWERS.map((drawer) => {
              const isOpen = activeDrawerId === drawer.id;
              const style = {
                '--drawer-color': drawer.color,
                left: drawer.position.left,
                top: drawer.position.top,
                width: drawer.position.width,
                height: drawer.position.height,
              } as React.CSSProperties;

              return (
                <motion.div
                  key={drawer.id}
                  className={`tw-sim-drawer ${isOpen ? 'is-open' : ''}`}
                  style={style}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Invisible hotspot trigger, active only when closed */}
                  {!isOpen && (
                    <button
                      type="button"
                      className="tw-hotspot-trigger"
                      onClick={() => openDrawer(drawer)}
                      aria-label={`Open ${drawer.title}`}
                    />
                  )}

                  {/* Open Tray Overlay */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="tw-open-tray"
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
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
                          {drawer.files.slice(0, 5).map((file, index) => {
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
                                initial={{ y: 15, opacity: 0 }}
                                animate={isFileActive ? {
                                  y: -14,
                                  scale: 1.06,
                                  rotate: index % 2 === 0 ? 1.5 : -1.5,
                                  opacity: 1,
                                } : {
                                  y: 0,
                                  scale: 1,
                                  rotate: 0,
                                  opacity: 1,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                              >
                                {file.title}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

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
