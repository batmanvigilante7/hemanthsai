import { motion, MotionValue, useTransform } from 'framer-motion';
import { MindNode } from './node-data';

type Props = {
  node: MindNode;
  index: number;
  progress: MotionValue<number>;
  onSelect: () => void;
};

export function ConstellationNode({ node, index, progress, onSelect }: Props) {
  const step = index / 8;
  const opacity = useTransform(progress, [Math.max(0, step - 0.04), step + 0.16], [0, 1]);
  const scale = useTransform(progress, [Math.max(0, step - 0.04), step + 0.16], [0.58, 1]);
  const x = useTransform(progress, [Math.max(0, step - 0.04), step + 0.16], ['0%', `${node.position.x - 50}%`]);
  const y = useTransform(progress, [Math.max(0, step - 0.04), step + 0.16], ['0%', `${node.position.y - 50}%`]);

  return (
    <motion.button
      type="button"
      className="mind-node"
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        opacity,
        scale,
      }}
      initial={false}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
    >
      <motion.span className="node-particle" style={{ opacity }} />
      <span className="node-icon">{node.icon}</span>
      <span className="node-title">{node.title}</span>
    </motion.button>
  );
}
