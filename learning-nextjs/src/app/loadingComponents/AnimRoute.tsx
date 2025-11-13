'use client'
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export const AnimRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.6 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};