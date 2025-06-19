// PageTransition.jsx
import { motion } from 'framer-motion';
import '../styles/PageTransition.css';


const transitionProps = {
  initial: { filter: 'brightness(0.5) blur(4px)', y: 10 },
  animate: { filter: 'brightness(1) blur(0px)', y: 0 },
  exit: { filter: 'brightness(0.5) blur(4px)', y: -10 },
  transition: { duration: 0.4, ease: 'easeInOut' }
};

 const PageTransition = ({ children }) => {
  return (
    <div className='transition-wrapper'>
    <motion.div {...transitionProps}>
      {children}
    </motion.div>
    </div>
  );
};

export default PageTransition;