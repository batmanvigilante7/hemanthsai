import { motion } from 'framer-motion';

export function ThoughtCore() {
  return (
    <motion.div
      className="thought-core"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: [1, 1.04, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <div className="core-glow" />
      <div className="core-orb">
        <span>Curiosity</span>
        <strong>Proof</strong>
      </div>
    </motion.div>
  );
}
