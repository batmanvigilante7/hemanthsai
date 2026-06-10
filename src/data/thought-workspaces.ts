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
    images: [
      getAssetUrl('identity-builder.webp'),
      getAssetUrl('thought-workshop-scene.webp'),
      getAssetUrl('blazer-v2.webp.webp'),
    ],
    position: { x: 12, y: 14 },
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
    images: [
      getAssetUrl('identity-discipline.webp'),
      getAssetUrl('karate-roots.webp.webp'),
      getAssetUrl('shotput.webp'),
    ],
    position: { x: 26, y: 34 },
    connections: ['personal-proof-systems', 'startup-validation']
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    iconName: 'ShieldCheck',
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
    images: [
      getAssetUrl('thought-workshop-scene.webp'),
      getAssetUrl('identity-cinematic-poster.webp'),
      getAssetUrl('gitam-sign.webp'),
    ],
    position: { x: 26, y: 74 },
    connections: ['product-communication', 'ai-leverage']
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    iconName: 'MessageSquareText',
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
    images: [
      getAssetUrl('identity-voice.webp'),
      getAssetUrl('voice.webp'),
      getAssetUrl('tepe-exhibition.webp'),
    ],
    position: { x: 26, y: 54 },
    connections: ['cinematic-storytelling', 'personal-proof-systems']
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    iconName: 'Clapperboard',
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
    images: [
      getAssetUrl('identity-cinematic-poster.webp'),
      getAssetUrl('blazer-v2.webp.webp'),
      getAssetUrl('thought-workspace-bg.webp'),
    ],
    position: { x: 12, y: 74 },
    connections: ['investing-mental-models', 'product-communication']
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    iconName: 'TrendingUp',
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
    images: [
      getAssetUrl('identity-structure.webp'),
      getAssetUrl('ncc.webp'),
      getAssetUrl('gitam-sign.webp'),
    ],
    position: { x: 26, y: 14 },
    connections: ['ux-psychology', 'cinematic-storytelling']
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    iconName: 'Eye',
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
    images: [
      getAssetUrl('identity-voice.webp'),
      getAssetUrl('thought-workshop-scene.webp'),
      getAssetUrl('hero-current.webp.webp'),
    ],
    position: { x: 12, y: 34 },
    connections: ['startup-validation', 'investing-mental-models']
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    iconName: 'ChartNoAxesCombined',
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
    images: [
      getAssetUrl('tepe-exhibition.webp'),
      getAssetUrl('identity-builder.webp'),
      getAssetUrl('thought-workspace-bg.webp'),
    ],
    position: { x: 12, y: 54 },
    connections: ['ai-leverage', 'ux-psychology', 'execution-psychology']
  }
];

export const getWorkspaceById = (id: string): WorkspaceNode | undefined =>
  thoughtWorkspaces.find((w) => w.id === id);
