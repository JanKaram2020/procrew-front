import React, { useEffect } from 'react';
import Navigation from 'components/Navigation';
import { useSession } from 'next-auth/client';
import { api } from 'users/api';
import { Box, Flex } from '@chakra-ui/react';
import LoadingScreen from './LoadingScreen';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [session, loading] = useSession();
    const router = useRouter();
    console.log({ session, loading });
    useEffect(() => {
        if (session) {
            api.defaults.headers.common['Authorization'] = `Bearer ${session?.accessToken}`;
        }
        if (!session && !loading) {
            console.log(router.pathname);
            // @ts-ignore
            if (router.pathname !== '/register' && !router.pathname.includes('/forgot-password')) {
                router.push('/login');
            }
        }
    }, [session, loading, router.pathname]);
    return (
        <>
            <Box minHeight="100vh">
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <Flex flexDirection="column" gridGap="20px" padding="20px">
                        {session ? (
                            <>
                                <Navigation />
                                {children}
                            </>
                        ) : (
                            <>
                                <Navigation />
                                {children}
                            </>
                        )}
                    </Flex>
                )}
            </Box>
        </>
    );
};

export default Layout;
