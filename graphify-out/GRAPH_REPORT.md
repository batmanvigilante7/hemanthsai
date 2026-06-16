# Graph Report - hemanthsai  (2026-06-16)

## Corpus Check
- 54 files · ~154,219 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 352 nodes · 566 edges · 19 communities (18 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `be5d792b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 18|Community 18]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `compilerOptions` - 19 edges
3. `WorkspaceNode` - 9 edges
4. `Button()` - 7 edges
5. `tailwind` - 6 edges
6. `aliases` - 6 edges
7. `ImagesBadge()` - 6 edges
8. `scripts` - 5 edges
9. `MindNode` - 5 edges
10. `CardBody()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ThoughtOSScreen()` --calls--> `cn()`  [EXTRACTED]
  src/components/ThoughtOSScreen.tsx → src/lib/utils.ts
- `Card()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card-hover-effect.tsx → src/lib/utils.ts
- `CardTitle()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card-hover-effect.tsx → src/lib/utils.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card-hover-effect.tsx → src/lib/utils.ts
- `Command()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (19 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (52): useIsMobile(), cn(), Button(), buttonVariants, InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants (+44 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (17): App(), Chapter, ChapterImageFit, ChapterImagePlate, dashboard, identitySignals, images, learningLoop (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (26): ImagesBadgeDemoTwoProps, artifactCards, thoughtOSItems, ThoughtOSScreen(), ThoughtOSScreenProps, Command(), CommandDialog(), CommandEmpty() (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (20): dependencies, class-variance-authority, clsx, cmdk, @fontsource-variable/geist, framer-motion, lucide-react, motion (+12 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (17): ConnectionLinesProps, ThoughtDockProps, FileItem, ThoughtPanel(), ThoughtPanelProps, getAssetUrl(), ThoughtWorkspace(), getWorkspaceIcon() (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (13): Connection, ConnectionLines(), Props, ConstellationNode(), Props, MindModal(), Props, connectionOrder (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (7): IdentitySignal, identitySignals, joinedX, posterAsset, tableRotateZ, tableX, tableY

### Community 10 - "Community 10"
Cohesion: 0.31
Nodes (8): ActivePlanet(), learningLoop, LoopItem, MiniPlanet(), MobileSemiOrbitLoop(), PlanetSymbol, pointOnOrbit(), symbolGradient()

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (5): projects, Card(), CardDescription(), CardTitle(), HoverEffect()

### Community 12 - "Community 12"
Cohesion: 0.38
Nodes (3): items, BentoGrid(), BentoGridItem()

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (3): FloatingDock(), FloatingDockDesktop(), FloatingDockMobile()

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, postcss, tailwindcss, @types/node, @types/react, @types/react-dom, name (+8 more)

## Knowledge Gaps
- **112 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+107 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 1`, `Community 2`, `Community 4`, `Community 9`, `Community 11`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.291) - this node is a cross-community bridge._
- **Why does `CardBody()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `CardContainer()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _112 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06829488919041157 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0728744939271255 - nodes in this community are weakly interconnected._