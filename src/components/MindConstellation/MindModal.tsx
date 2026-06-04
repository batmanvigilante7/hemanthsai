import { AnimatePresence, motion } from 'framer-motion';
import { MindNode } from './node-data';

type Props = {
  node: MindNode | null;
  onClose: () => void;
  getNode: (id: string) => MindNode | undefined;
};

export function MindModal({ node, onClose }: Props) {
  return (
    <AnimatePresence>
      {node && (
        <motion.div className="modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close modal" />
          <motion.article
            className="mind-modal"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button className="modal-close" type="button" onClick={onClose}>×</button>

            <header className="modal-header">
              <span>{node.icon}</span>
              <div>
                <p>Living Notebook</p>
                <h3>{node.title}</h3>
              </div>
            </header>

            <section className="modal-block question-block">
              <span>Question I keep returning to</span>
              <p>{node.question}</p>
            </section>

            <section className="modal-block">
              <span>Current belief</span>
              <p>{node.belief}</p>
            </section>

            <section className="modal-block">
              <span>Currently exploring</span>
              <ul>
                {node.exploring.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="modal-block realization-block">
              <span>Recent realization</span>
              <p>{node.realization}</p>
            </section>

            <footer className="modal-tension">Tension: {node.tension}</footer>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
