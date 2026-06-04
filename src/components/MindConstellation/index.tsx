import { useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { mindNodes, getConnections, getNode, MindNode } from './node-data';
import { ConstellationNode } from './ConstellationNode';
import { ConnectionLines } from './ConnectionLines';
import { ThoughtCore } from './ThoughtCore';
import { MindModal } from './MindModal';
import './mind-constellation.css';

export function MindConstellation() {
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(null);
  const connections = useMemo(() => getConnections(), []);
  const { scrollYProgress } = useScroll();

  const coreOpacity = useTransform(scrollYProgress, [0.04, 0.14], [0.35, 1]);
  const nodeProgress = useTransform(scrollYProgress, [0.18, 0.5], [0, 1]);
  const lineProgress = useTransform(scrollYProgress, [0.52, 0.72], [0, 1]);
  const driftOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);

  return (
    <section className="mind-section" aria-label="Mind constellation section">
      <div className="mind-sticky">
        <div className="mind-bg" />

        <motion.div className="mind-hero" style={{ opacity: coreOpacity }}>
          <p className="mind-eyebrow">Mind Constellation</p>
          <h2>Hemanth Sai</h2>
          <p>Turning curiosity into visible proof.</p>
        </motion.div>

        <motion.div
          className="constellation-shell"
          style={{ opacity: driftOpacity }}
          animate={{ rotate: [-2.5, 2.5, -2.5], y: [0, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ConnectionLines nodes={mindNodes} connections={connections} progress={lineProgress} />

          <ThoughtCore />

          {mindNodes.map((node, index) => (
            <ConstellationNode
              key={node.id}
              node={node}
              index={index}
              progress={nodeProgress}
              onSelect={() => setSelectedNode(node)}
            />
          ))}
        </motion.div>

        <div className="mind-instruction">Click a thought to open the notebook.</div>
      </div>

      <MindModal node={selectedNode} onClose={() => setSelectedNode(null)} getNode={getNode} />
    </section>
  );
}

export default MindConstellation;
