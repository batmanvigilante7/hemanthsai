// Mind Constellation — Node Data
// Frozen for V1 implementation — do not modify during build

import { CSSProperties } from 'react';

export interface MindNode {
  id: string;
  icon: string;
  title: string;
  question: string;
  belief: string;
  exploring: string[];
  realization: string;
  tension: string;
  // Position on the constellation (percentage-based)
  position: {
    x: number; // 0-100, from left
    y: number; // 0-100, from top
  };
}

export const mindNodes: MindNode[] = [
  {
    id: 'ai-leverage',
    icon: '🧠',
    title: 'AI Leverage',
    question: 'How can intelligence become force multiplication?',
    belief: 'AI should amplify humans, not replace them. The most interesting problems aren\'t about replacing humans — they\'re about removing the ceiling on what one person can accomplish.',
    exploring: [
      'Multi-agent orchestration systems',
      'Human-AI collaboration workflows',
      'Local model deployment and privacy',
      'Automation frameworks that feel natural',
    ],
    realization: 'Most people use AI for answers. I\'m more interested in using it for leverage. The question isn\'t "what can AI do?" — it\'s "how much more capable can I become?"',
    tension: 'Amplification vs. Replacement',
    position: { x: 50, y: 12 }, // top-center
  },
  {
    id: 'execution-psychology',
    icon: '⚡',
    title: 'Execution Psychology',
    question: 'Does motivation come before action, or does action create motivation?',
    belief: 'Execution isn\'t about working harder. It\'s about finding your obsession and letting it consume you. Understanding that identity drives behavior. Knowing that momentum is a skill — you can build it or lose it.',
    exploring: [
      'Building systems that make execution automatic',
      'Understanding activation energy',
      'Creating feedback loops that fuel motivation',
      'Identity-based behavior change',
    ],
    realization: 'I\'ve spent 6 hours criticizing and improving an idea before building it. That\'s not perfectionism. That\'s activation energy management. The better I make the idea, the easier it is to start.',
    tension: 'Inspiration vs. Momentum',
    position: { x: 78, y: 28 }, // upper-right
  },
  {
    id: 'proof-systems',
    icon: '🏗',
    title: 'Proof Systems',
    question: 'If AI helps you create faster, how do you ensure the proof is still yours?',
    belief: 'Curiosity without proof is just noise. The portfolio isn\'t a collection of work. It\'s a proof engine — a system for taking questions and turning them into artifacts.',
    exploring: [
      'Building in public',
      'Turning learning into visible output',
      'Creating a body of work that speaks for itself',
      'Testing ideas through products',
    ],
    realization: 'Proof beats argument. Results beat reasoning. The most convincing thing you can say about yourself is a track record of doing interesting things.',
    tension: 'Leverage vs. Authorship',
    position: { x: 88, y: 50 }, // right
  },
  {
    id: 'reality-testing',
    icon: '🔬',
    title: 'Reality Testing',
    question: 'How do you know when you\'ve found truth, versus when you\'re just comfortable with what you believe?',
    belief: 'Assumptions are the enemy of progress. Every belief I hold is a hypothesis that needs testing. The fastest way to improve is to find the flaws in my own thinking.',
    exploring: [
      'Product-market fit validation',
      'Finding truth in feedback',
      'Separating signal from noise',
      'Building in public with honest metrics',
    ],
    realization: 'Reality doesn\'t care about our beliefs. The faster we can test assumptions, the faster we can find what actually works. Delusion is expensive. Clarity is leverage.',
    tension: 'Confirmation vs. Discomfort',
    position: { x: 18, y: 28 }, // upper-left
  },
  {
    id: 'ux-psychology',
    icon: '🎨',
    title: 'UX Psychology',
    question: 'When does understanding become manipulation?',
    belief: 'Good design is psychology made visible. The best interfaces don\'t just look good — they understand how humans actually process information, make decisions, and build trust.',
    exploring: [
      'Behavioral design patterns',
      'Cognitive load management',
      'Trust systems and social proof',
      'Mobile-first interaction models',
    ],
    realization: 'I care more about whether something feels right than whether it looks right. The best design is invisible — it gets out of the way and lets people do what they came to do.',
    tension: 'Empathy vs. Persuasion',
    position: { x: 12, y: 50 }, // left
  },
  {
    id: 'product-communication',
    icon: '📢',
    title: 'Product Communication',
    question: 'What\'s the difference between making something accessible and making it shallow?',
    belief: 'The best product in the world fails without the right words. Communication isn\'t about saying more. It\'s about saying exactly what needs to be said — nothing more, nothing less.',
    exploring: [
      'Positioning strategy for new products',
      'Explainer content that converts',
      'Landing page psychology',
      'The art of the demo',
    ],
    realization: 'A product that can\'t explain itself doesn\'t exist for most people. The difference between "this is interesting" and "I need this" lives in the words.',
    tension: 'Clarity vs. Depth',
    position: { x: 22, y: 72 }, // lower-left
  },
  {
    id: 'cinematic-storytelling',
    icon: '🎬',
    title: 'Cinematic Storytelling',
    question: 'How do you create emotional resonance without feeling like you\'re performing?',
    belief: 'Content is not about broadcasting. It\'s about creating moments that live inside people. The best stories aren\'t told — they\'re experienced.',
    exploring: [
      'Native advertising that feels like art',
      'Portfolio presentation as storytelling',
      'Video content with production value',
      'Narrative-driven product launches',
    ],
    realization: 'Stories create action. Every frame matters. Pacing is emotion. What you leave out is as important as what you put in.',
    tension: 'Authenticity vs. Strategy',
    position: { x: 50, y: 88 }, // bottom-center
  },
  {
    id: 'investing-mental-models',
    icon: '📈',
    title: 'Investing Mental Models',
    question: 'When do you trust intuition and when do you trust data?',
    belief: 'Every decision is an allocation. Where you put your resources determines what you get back. The question isn\'t "should I do this?" — it\'s "what am I not doing by doing this?"',
    exploring: [
      'Portfolio thinking for career',
      'Compound interest in skills and reputation',
      'Optionality and strategic flexibility',
      'Risk-adjusted decision frameworks',
    ],
    realization: 'Most people optimize for today\'s satisfaction. Investors optimize for tomorrow\'s compound. The decisions that seem small now are the ones that determine everything later.',
    tension: 'Conviction vs. Evidence',
    position: { x: 78, y: 72 }, // lower-right
  },
];

// Connection order (the loop)
export const connectionOrder = [
  'ai-leverage',
  'execution-psychology',
  'proof-systems',
  'reality-testing',
  'ux-psychology',
  'product-communication',
  'cinematic-storytelling',
  'investing-mental-models',
];

// Get node by ID
export const getNode = (id: string): MindNode | undefined => 
  mindNodes.find(node => node.id === id);

// Get position as CSS
export const getNodeStyle = (node: MindNode): CSSProperties => ({
  position: 'absolute',
  left: `${node.position.x}%`,
  top: `${node.position.y}%`,
  transform: 'translate(-50%, -50%)',
});

// Get connection lines (returns array of {from, to} pairs)
export const getConnections = () => {
  const lines: { from: string; to: string }[] = [];
  
  for (let i = 0; i < connectionOrder.length; i++) {
    const from = connectionOrder[i];
    const to = connectionOrder[(i + 1) % connectionOrder.length];
    lines.push({ from, to });
  }
  
  return lines;
};