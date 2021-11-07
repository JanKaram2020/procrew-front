import { Button, Box, useColorMode } from '@chakra-ui/react';
import { RiMoonClearFill } from 'react-icons/ri';
import { IoMdSunny } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const MotionBox = motion(Box);
function ColorModeToggle(): React.ReactElement {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === `dark`;
    return (
        <Button
            aria-label={isDark ? `Activate Light mode` : `Activate Dark mode`}
            title={isDark ? `Activate Light mode` : `Activate Dark mode`}
            display="grid"
            gridTemplateRows="1fr"
            gridTemplateColumns="1fr"
            alignContent="center"
            justifyItems="center"
            onClick={toggleColorMode}
            variant="link"
            w="10px"
            paddingY="5px"
            _active={{
                transform: 'scale(0.8)',
            }}
        >
            <AnimatePresence>
                {colorMode === 'dark' && (
                    <MotionBox
                        gridArea="1 / 1 / 2 / 2"
                        color="yellow.500"
                        initial={{ rotate: 90, y: 30, opacity: 0 }}
                        animate={{ rotate: 0, y: 0, opacity: 1 }}
                        exit={{ rotate: 90, y: 30, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <IoMdSunny size={30} />
                    </MotionBox>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {colorMode === 'light' && (
                    <MotionBox
                        gridArea="1 / 1 / 2 / 2"
                        color="black"
                        initial={{ rotate: 90, y: 30, opacity: 0 }}
                        animate={{ rotate: 0, y: 0, opacity: 1 }}
                        exit={{ rotate: 90, y: 30, opacity: 0, color: 'white' }}
                        transition={{ duration: 1 }}
                    >
                        <RiMoonClearFill size={30} />
                    </MotionBox>
                )}
            </AnimatePresence>
        </Button>
    );
}
export default ColorModeToggle;
