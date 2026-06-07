export interface WorkspaceNode {
  id: string;
  title: string;
  iconName: string; // Lucide icon identifier
  description: string;
  belief: string;
  exploring: string[];
  realization: string;
  tension: string;
  images: string[];
  position: {
    x: number; // 0-100 percentage from left
    y: number; // 0-100 percentage from top
  };
  connections: string[]; // IDs of workspaces connected to this node
}

const getAssetUrl = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const defaultPreviewImages = [
  getAssetUrl('thought-workspace-bg.webp'),
  getAssetUrl('thought-workshop-scene.webp'),
  getAssetUrl('identity-cinematic-poster.webp'),
];

export const thoughtWorkspaces: WorkspaceNode[] = [
  {
    id: 'ai-leverage',
    title: 'AI Leverage',
    iconName: 'BrainCircuit',
    description: 'Prompt systems, agent workflows, local models, and AI product interfaces.',
    belief: 'AI should amplify human capacity, not replace it. The frontier is about removing the ceiling on single-builder output.',
    exploring: [
      'Multi-agent orchestration workflows',
      'Context-window optimization',
      'Local model fallback systems',
      'AI-UX interface patterns'
    ],
    realization: 'Most people treat AI as a Q&A search box. It becomes real leverage only when integrated into custom automation chains.',
    tension: 'Autonomy vs. Control',
    images: defaultPreviewImages,
    position: { x: 50, y: 15 },
    connections: ['execution-psychology', 'personal-proof-systems']
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    iconName: 'Zap',
    description: '21-day sprints, activation energy, deep work, feedback loops, and ship criteria.',
    belief: 'Consistency is not a motivation state; it is a structural design. Building momentum beats planning perfection.',
    exploring: [
      'Activation energy thresholds',
      'Pre-commitment frameworks',
      'Feedback loops & momentum math',
      'Obsession-led scoping'
    ],
    realization: 'The distance between an idea and an artifact is simply the courage to start with a flawed first version.',
    tension: 'Speed vs. Precision',
    images: defaultPreviewImages,
    position: { x: 82, y: 30 },
    connections: ['personal-proof-systems', 'startup-validation']
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof',
    iconName: 'Target',
    description: 'Portfolio hub, build logs, framework library, GitHub proof, and demo videos.',
    belief: 'Unverifiable potential is indistinguishable from zero. Credibility is built through public, clickable artifacts.',
    exploring: [
      'Interactive case-study systems',
      'Proof-of-learning logging',
      'Codebase auditing patterns',
      'Public execution loops'
    ],
    realization: 'Resumes are declarative noise. Interactive proof engines are imperative facts.',
    tension: 'Marketing vs. Substance',
    images: defaultPreviewImages,
    position: { x: 88, y: 62 },
    connections: ['product-communication', 'ai-leverage']
  },
  {
    id: 'product-communication',
    title: 'Product Comm',
    iconName: 'Share2',
    description: 'Positioning, launch copy, feature narratives, demos, and case studies.',
    belief: 'If a user cannot understand a feature in 3 seconds, the feature does not exist. Clarity is the ultimate product metric.',
    exploring: [
      'Hook mechanics & microcopy',
      'Interactive demo sequencing',
      'Narrative positioning grids',
      'Feature-value mapping'
    ],
    realization: 'Building the software is only 50% of the puzzle. The remaining 50% is creating the bridge of meaning for the user.',
    tension: 'Accessibility vs. Depth',
    images: defaultPreviewImages,
    position: { x: 74, y: 82 },
    connections: ['cinematic-storytelling', 'personal-proof-systems']
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Story',
    iconName: 'Video',
    description: 'Visual metaphors, scene design, hero framing, attention beats, and brand worlds.',
    belief: 'Information without emotion is instantly forgotten. Storytelling is how we package logic to make it stick.',
    exploring: [
      'Pacing, beats, and focus shifts',
      'Atmospheric UI/UX lighting',
      'Narrative arcs for products',
      'Visual hierarchy as story directions'
    ],
    realization: 'A launch video is not a list of features; it is a short film where the product is the hero solving a real crisis.',
    tension: 'Aesthetics vs. Utility',
    images: defaultPreviewImages,
    position: { x: 50, y: 88 },
    connections: ['investing-mental-models', 'product-communication']
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Models',
    iconName: 'LineChart',
    description: 'Compounding, incentives, risk, cycles, and moats.',
    belief: 'Every action is an capital allocation decision. Building compounding assets always beats capturing quick wins.',
    exploring: [
      'Strategic optionality theory',
      'Incentive structure audits',
      'Compounding loops in software',
      'Risk-adjusted time budgeting'
    ],
    realization: 'Most builders optimize for today\'s validation. Investors optimize for the decade\'s compound.',
    tension: 'Patience vs. Urgency',
    images: defaultPreviewImages,
    position: { x: 26, y: 82 },
    connections: ['ux-psychology', 'cinematic-storytelling']
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    iconName: 'Users',
    description: 'Attention, friction, mental models, microcopy, and trust cues.',
    belief: 'Software is psychology made visible. Interfaces must conform to human biology and expectations, not database structures.',
    exploring: [
      'Friction maps & attention spans',
      'Cognitive load budgeting',
      'Trust cues and transparency UI',
      'Mobile-first thumb ergonomics'
    ],
    realization: 'The cleanest interface is the one that aligns so closely with the user\'s mental model that instruction is unnecessary.',
    tension: 'Familiarity vs. Innovation',
    images: defaultPreviewImages,
    position: { x: 12, y: 62 },
    connections: ['startup-validation', 'investing-mental-models']
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    iconName: 'FileText',
    description: 'Problem discovery, user interviews, landing tests, MVP scope, and PMF signals.',
    belief: 'The most expensive waste is building something perfectly that nobody wants. Demand validation must precede code.',
    exploring: [
      'Smoke-test landing designs',
      'Non-leading user interview rules',
      'MVP scope triage models',
      'Quantitative PMF metrics'
    ],
    realization: 'Feedback is noise unless it is accompanied by commitment—either of time, reputation, or money.',
    tension: 'Vision vs. Feedback',
    images: defaultPreviewImages,
    position: { x: 18, y: 30 },
    connections: ['ai-leverage', 'ux-psychology', 'execution-psychology']
  }
];

export const getWorkspaceById = (id: string): WorkspaceNode | undefined =>
  thoughtWorkspaces.find((w) => w.id === id);
