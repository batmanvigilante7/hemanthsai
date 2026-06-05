import React, { useState } from 'react';
import { ArrowLeft, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ThoughtWorkspace.css';

// Helper to resolve asset paths correctly under Vite build environments
const getAssetUrl = (fileName: string) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}assets/${fileName}`;
};

interface DeckPosition {
  left: string;
  top: string;
  rotate: string;
}

interface Deck {
  id: string;
  title: string;
  status: string;
  filesCount: number;
  color: string;
  textColor: string;
  desktopPos: DeckPosition;
}

interface FileItem {
  id: string;
  title: string;
  tag: string;
  summary: string;
  question: string;
  proof: string;
  desktopPos: DeckPosition;
}

const DECKS_DATA: Deck[] = [
  {
    id: 'ai-leverage',
    title: 'AI Leverage',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 47,
    color: '#EAF2EC', // soft sage green
    textColor: '#3b5440',
    desktopPos: { left: '5%', top: '8%', rotate: '-6deg' }
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 18,
    color: '#E6EDF5', // soft dusty blue
    textColor: '#3b4c5e',
    desktopPos: { left: '33%', top: '6%', rotate: '4deg' }
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 24,
    color: '#F5EBE6', // soft sand / peach
    textColor: '#5e483b',
    desktopPos: { left: '72%', top: '10%', rotate: '-3deg' }
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 32,
    color: '#EAE6F2', // soft lavender
    textColor: '#4b3b5e',
    desktopPos: { left: '4%', top: '44%', rotate: '5deg' }
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 15,
    color: '#F5F2E6', // soft warm yellow
    textColor: '#5e5a3b',
    desktopPos: { left: '75%', top: '42%', rotate: '-5deg' }
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 29,
    color: '#F5E6EC', // soft rose
    textColor: '#5e3b4b',
    desktopPos: { left: '10%', top: '78%', rotate: '-2deg' }
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 12,
    color: '#E6F5ED', // soft mint
    textColor: '#3b5e4c',
    desktopPos: { left: '42%', top: '80%', rotate: '3deg' }
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    status: 'ACTIVE INVESTIGATION',
    filesCount: 21,
    color: '#F2ECE6', // soft clay
    textColor: '#54463b',
    desktopPos: { left: '73%', top: '76%', rotate: '-4deg' }
  }
];

const AI_LEVERAGE_FILES: FileItem[] = [
  {
    id: 'prompt-systems',
    title: 'Prompt Systems',
    tag: 'SYSTEMS ARCHITECTURE',
    summary: 'Deep structures for directing LLMs. Moving from naive text prompts to structured JSON, multi-agent orchestrations, and prompt-as-code paradigms.',
    question: 'How do we build deterministic prompt architectures on top of non-deterministic models?',
    proof: 'Implemented structured system prompting in my current project that reduced hallucination rates by 42% under high-concurrency testing.',
    desktopPos: { left: '10%', top: '15%', rotate: '-4deg' }
  },
  {
    id: 'agent-workflows',
    title: 'Agent Workflows',
    tag: 'BEHAVIOR LOOPS',
    summary: 'Designing state machines for autonomous LLM loops. ReAct frameworks, reflection loops, and self-correcting routers that can solve multi-step problems without human intervention.',
    question: 'Where is the boundary between static code control flow and dynamic model routing in robust agent architectures?',
    proof: 'Built a CLI-based agent system capable of resolving workspace linting errors and automatically verifying changes using local unit tests.',
    desktopPos: { left: '42%', top: '8%', rotate: '3deg' }
  },
  {
    id: 'local-models',
    title: 'Local Models',
    tag: 'INFRASTRUCTURE',
    summary: 'Running lightweight, open-weight LLMs (Llama 3, Phi 3, Mistral) locally. Quantization (GGUF, EXL2), inference speed, VRAM constraints, and offline privacy.',
    question: 'Can a fine-tuned 8B local model outperform a generalized frontier API model for domain-specific agent tasks?',
    proof: 'Configured and benchmarked Llama 3 8B Instruct running locally via Ollama, achieving sub-50ms time-to-first-token.',
    desktopPos: { left: '72%', top: '14%', rotate: '-2deg' }
  },
  {
    id: 'human-ai-collaboration',
    title: 'Human-AI Collaboration',
    tag: 'INTERACTION DESIGN',
    summary: 'Interfaces that augment human capabilities rather than replace them. Dynamic workspaces, multiplayer canvas environments, and contextual agent assistance.',
    question: 'How do we design feedback loops where AI learns from human micro-corrections in real time?',
    proof: 'Designed a canvas-based writing workspace with inline suggestions triggered by semantic pauses.',
    desktopPos: { left: '8%', top: '56%', rotate: '4deg' }
  },
  {
    id: 'ai-product-interfaces',
    title: 'AI Product Interfaces',
    tag: 'PRODUCT UX',
    summary: 'Moving beyond the chat box. Generative UI, canvas-based workspaces, structured card views, and interactive state representations.',
    question: 'How does user agency evolve when the interface itself is dynamically generated by the application?',
    proof: 'Created an experimental layout engine that renders custom visual cards based on raw JSON payloads returned by model API calls.',
    desktopPos: { left: '40%', top: '58%', rotate: '-3deg' }
  },
  {
    id: 'automation-loops',
    title: 'Automation Loops',
    tag: 'OPERATIONS',
    summary: 'Self-triggering systems that connect LLM analysis to concrete actions. Cron triggers, webhook listeners, and continuous synthesis of incoming signal streams.',
    question: 'How do we prevent infinite loops and manage cost/safety thresholds in self-directed automation?',
    proof: 'Set up a serverless background worker that polls feed data, filters it using semantic embeddings, and compiles daily intelligence briefs.',
    desktopPos: { left: '70%', top: '50%', rotate: '3deg' }
  }
];

export function ThoughtWorkspace() {
  const [isDeskOpen, setIsDeskOpen] = useState(false);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);

  const handleDeckClick = (deckId: string) => {
    if (deckId === 'ai-leverage') {
      setIsDeskOpen(true);
    }
  };

  return (
    <section className="tw-section" id="thought-workspace" aria-label="Thought Workspace Section">
      <div className="tw-container">
        
        {/* Header Title */}
        <div className="tw-section-header">
          <p className="tw-section-eyebrow">PHYSICAL DESK CONCEPT</p>
          <h2 className="tw-section-title">Thought Workspace</h2>
        </div>

        {/* Desktop Scattered Surfaces / Mobile Cards Container */}
        <div className="tw-desk-surface">
          
          {/* Grayscale photo of Hemanth in the center */}
          <div className="tw-center-card">
            <div className="tw-center-image-container">
              <img 
                src={getAssetUrl('hero-current.webp.webp')} 
                alt="Hemanth Sai" 
                className="tw-center-image" 
              />
            </div>
            <h3 className="tw-center-title">Thought Workspace</h3>
            <p className="tw-center-subtitle">recurring investigations</p>
          </div>

          {/* 8 Scattered Pastel Deck Objects */}
          <div className="tw-decks-grid">
            {DECKS_DATA.map((deck) => {
              const style = {
                '--deck-color': deck.color,
                left: deck.desktopPos.left,
                top: deck.desktopPos.top,
                transform: `rotate(${deck.desktopPos.rotate})`
              } as React.CSSProperties;

              return (
                <motion.div 
                  key={deck.id} 
                  className="tw-deck" 
                  style={style}
                  onClick={() => handleDeckClick(deck.id)}
                  title={deck.id !== 'ai-leverage' ? 'Investigation Queued (Under Development)' : 'Click to inspect files'}
                  whileHover={{ 
                    scale: 1.04, 
                    rotate: `${parseFloat(deck.desktopPos.rotate) * 0.5}deg`,
                    transition: { type: 'spring', stiffness: 300, damping: 15 } 
                  }}
                >
                  <div className="tw-deck-stack">
                    <div className="tw-deck-layer tw-deck-layer-1" />
                    <div className="tw-deck-layer tw-deck-layer-2" />
                    <div className="tw-deck-content">
                      <div>
                        <div className="tw-deck-status tw-deck-status-active">
                          <span className="tw-deck-status-dot" />
                          {deck.status}
                        </div>
                        <h4 className="tw-deck-title">{deck.title}</h4>
                      </div>
                      <div className="tw-deck-footer">
                        <span className="tw-deck-file-count">{deck.filesCount} files</span>
                        {deck.id === 'ai-leverage' && (
                          <span className="tw-deck-action">Inspect</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Overlay Desk for AI Leverage */}
        <AnimatePresence>
          {isDeskOpen && (
            <motion.div 
              className="tw-desk-overlay"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="tw-desk-header">
                <div className="tw-desk-title-group">
                  <p className="tw-desk-subtitle">ACTIVE INVESTIGATION</p>
                  <h3 className="tw-desk-title">AI Leverage Desk</h3>
                </div>
                <button className="tw-back-btn" onClick={() => setIsDeskOpen(false)}>
                  <ArrowLeft size={16} />
                  Back to Workspace
                </button>
              </div>

              {/* Scattered File Cards */}
              <motion.div 
                className="tw-desk-grid"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.06
                    }
                  }
                }}
              >
                {AI_LEVERAGE_FILES.map((file) => {
                  const style = {
                    left: file.desktopPos.left,
                    top: file.desktopPos.top,
                    transform: `rotate(${file.desktopPos.rotate})`
                  } as React.CSSProperties;

                  return (
                    <motion.div 
                      key={file.id} 
                      className="tw-file-card" 
                      style={style}
                      onClick={() => setActiveFile(file)}
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          y: 20, 
                          rotate: parseFloat(file.desktopPos.rotate) - 2 
                        },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          rotate: parseFloat(file.desktopPos.rotate),
                          transition: { type: 'spring', stiffness: 220, damping: 20 }
                        }
                      }}
                      whileHover={{
                        scale: 1.03,
                        rotate: `${parseFloat(file.desktopPos.rotate) * 0.5}deg`,
                        zIndex: 25,
                        transition: { type: 'spring', stiffness: 300, damping: 15 }
                      }}
                    >
                      <div className="tw-file-tag">{file.tag}</div>
                      <h4 className="tw-file-title">{file.title}</h4>
                      <p className="tw-file-excerpt">{file.summary.substring(0, 85)}...</p>
                      <div className="tw-file-action">
                        View File <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal for file items */}
        <AnimatePresence>
          {activeFile && (
            <motion.div 
              className="tw-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFile(null)}
            >
              <motion.div 
                className="tw-modal-card"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="tw-modal-header">
                  <h3 className="tw-modal-title">{activeFile.title}</h3>
                  <button className="tw-modal-close-btn" onClick={() => setActiveFile(null)} aria-label="Close modal">
                    <X size={18} />
                  </button>
                </div>
                <div className="tw-modal-body">
                  
                  <div className="tw-modal-section">
                    <span className="tw-modal-label">Short Summary</span>
                    <p className="tw-modal-content">{activeFile.summary}</p>
                  </div>

                  <div className="tw-modal-section">
                    <span className="tw-modal-label">Key Question</span>
                    <p className="tw-modal-content tw-modal-content-question">
                      “{activeFile.question}”
                    </p>
                  </div>

                  <div className="tw-modal-section">
                    <span className="tw-modal-label">Related Proof</span>
                    <div className="tw-modal-content tw-modal-content-proof">
                      {activeFile.proof}
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default ThoughtWorkspace;
