import React from 'react';
import { ImagesBadge } from '@/components/ui/images-badge';

const getAssetUrl = (fileName: string) => `/assets/${fileName}`;

const defaultPreviewImages = [
  getAssetUrl('thought-workspace-bg.webp'),
  getAssetUrl('thought-workspace-bg.webp'),
  getAssetUrl('thought-workspace-bg.webp'),
];

const WORKSPACES = [
  {
    id: 'ai-leverage',
    title: 'AI Leverage',
    description:
      'Prompt systems, agent workflows, local models, and AI product interfaces.',
    images: defaultPreviewImages,
  },
  {
    id: 'ux-psychology',
    title: 'UX Psychology',
    description:
      'Attention, friction, mental models, microcopy, and trust cues.',
    images: defaultPreviewImages,
  },
  {
    id: 'startup-validation',
    title: 'Startup Validation',
    description:
      'Problem discovery, user interviews, landing tests, MVP scope, and PMF signals.',
    images: defaultPreviewImages,
  },
  {
    id: 'cinematic-storytelling',
    title: 'Cinematic Storytelling',
    description:
      'Visual metaphors, scene design, hero framing, attention beats, and brand worlds.',
    images: defaultPreviewImages,
  },
  {
    id: 'investing-mental-models',
    title: 'Investing Mental Models',
    description:
      'Compounding, incentives, risk, cycles, and moats.',
    images: defaultPreviewImages,
  },
  {
    id: 'execution-psychology',
    title: 'Execution Psychology',
    description:
      '21-day sprints, activation energy, deep work, feedback loops, and ship criteria.',
    images: defaultPreviewImages,
  },
  {
    id: 'product-communication',
    title: 'Product Communication',
    description:
      'Positioning, launch copy, feature narratives, demos, and case studies.',
    images: defaultPreviewImages,
  },
  {
    id: 'personal-proof-systems',
    title: 'Personal Proof Systems',
    description:
      'Portfolio hub, build logs, framework library, GitHub proof, and demo videos.',
    images: defaultPreviewImages,
  },
];

export function ThoughtWorkspace() {
  return (
    <section
      id="thought-workspace"
      className="relative overflow-hidden bg-[#0b0b0a] px-6 py-24 text-white"
      aria-label="Thought Workspace Section"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">
              Thought Workspace
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              The desks inside my mind.
            </h2>
          </div>

          <div>
            <p className="max-w-xl text-base leading-7 text-white/60 md:text-lg">
              A visual map of the systems I keep returning to while building
              with AI, software, design, product thinking, and storytelling.
            </p>
          </div>
        </div>

        <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl">
          <img
            src={getAssetUrl('thought-workspace-bg.webp')}
            alt="Cinematic thought workspace scene"
            className="h-[420px] w-full object-cover md:h-[560px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 max-w-2xl p-6 md:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
              Active System
            </p>

            <h3 className="text-2xl font-semibold md:text-4xl">
              Ideas become useful when they get a workspace.
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/60 md:text-base">
              This section is not a library. It is a working desk for the
              obsessions that keep shaping my proof-of-work.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {WORKSPACES.map((workspace) => (
            <article
              key={workspace.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/[0.06]"
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                    Workspace
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {workspace.title}
                  </h3>
                </div>

                <ImagesBadge
                  text="Preview"
                  images={workspace.images}
                  folderSize={{ width: 36, height: 27 }}
                  teaserImageSize={{ width: 22, height: 15 }}
                  hoverImageSize={{ width: 52, height: 34 }}
                  hoverTranslateY={-38}
                  hoverSpread={22}
                  hoverRotation={14}
                  className="shrink-0 text-white/70 hover:text-amber-200"
                />
              </div>

              <p className="max-w-xl text-sm leading-6 text-white/55">
                {workspace.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThoughtWorkspace;
