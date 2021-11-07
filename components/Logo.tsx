import { motion, AnimatePresence } from 'framer-motion';

const Slideshow = () => (
    <AnimatePresence>
        <motion.div style={{ height: '100px' }}>
            <motion.img
                key="1"
                src="/logo.png"
                style={{
                    maxHeight: '100%',
                    borderRadius: 30,
                    // backgroundColor: '#fff',
                }}
                animate={{ rotate: 360 }}
                transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
            />
        </motion.div>
    </AnimatePresence>
);
export default Slideshow;
