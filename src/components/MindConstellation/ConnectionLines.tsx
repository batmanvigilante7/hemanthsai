import { motion, MotionValue, useTransform } from 'framer-motion';
import { MindNode } from './node-data';

type Connection = { from: string; to: string };

type Props = {
  nodes: MindNode[];
  connections: Connection[];
  progress: MotionValue<number>;
};

function pointFor(nodes: MindNode[], id: string) {
  const node = nodes.find((item) => item.id === id);
  if (!node) return { x: 50, y: 50 };
  return node.position;
}

export function ConnectionLines({ nodes, connections, progress }: Props) {
  const opacity = useTransform(progress, [0, 0.12], [0, 1]);
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {connections.map((connection, index) => {
        const from = pointFor(nodes, connection.from);
        const to = pointFor(nodes, connection.to);
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const curveX = midX + (50 - midX) * 0.14;
        const curveY = midY + (50 - midY) * 0.14;

        return (
          <motion.path
            key={`${connection.from}-${connection.to}`}
            d={`M ${from.x} ${from.y} Q ${curveX} ${curveY} ${to.x} ${to.y}`}
            className="connection-path"
            style={{ opacity, pathLength }}
            transition={{ delay: index * 0.15 }}
          />
        );
      })}
    </svg>
  );
}
