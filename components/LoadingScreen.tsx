import React from 'react';
import { Center } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <Center height="100vh">
            <AnimatePresence>
                <div style={{ height: '100px' }}>
                    <motion.img
                        key="1"
                        src="/logo.png"
                        style={{
                            maxHeight: '100%',
                            borderRadius: 30,
                            // backgroundColor: '#fff',
                        }}
                        animate={{ opacity: [0.1, 1, 0.1] }}
                        exit={{ scale: 0 }}
                        transition={{ ease: 'linear', duration: 3, repeat: Infinity }}
                    />
                </div>
            </AnimatePresence>
        </Center>
    );
};

export default LoadingScreen;
