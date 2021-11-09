import React, { useEffect } from 'react';
import Navigation from 'components/Navigation';
import { useSession } from 'next-auth/client';
import { api } from 'users/api';
import { Box, Flex } from '@chakra-ui/react';
import LoadingScreen from './LoadingScreen';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [session, loading] = useSession();
    useEffect(() => {
        if (session) {
            api.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
        }
    }, [session]);
    return (
        <>
            <Box minHeight="100vh">
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <Flex flexDirection="column" gridGap="20px" padding="20px">
                        <Navigation />
                        {children}
                    </Flex>
                )}
            </Box>
        </>
    );
};

export default Layout;
