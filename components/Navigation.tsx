import React from 'react';
import ColorModeToggle from 'components/ColorModeToggle';
import { Box, Flex, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {
    const router = useRouter();
    const [session] = useSession();
    return (
        <SimpleGrid columns={2} spacing={10}>
            <Box>
                <NextLink href="/" passHref>
                    <Link>
                        <Image src="/logo.png" height="50px" width="237.8px" />
                    </Link>
                </NextLink>
            </Box>
            <Flex justifyContent="flex-end" alignItems="center" gridGap="20px">
                <ColorModeToggle />
                {session ? (
                    <Menu>
                        <MenuButton as={IconButton} aria-label="sorted descending" icon={<BsFillPersonFill />} />
                        <MenuList>
                            {session?.user?.email ? (
                                <MenuItem icon={<FiSettings />} onClick={() => router.push('/settings')}>
                                    Settings
                                </MenuItem>
                            ) : null}
                            <MenuItem icon={<FiLogOut />} onClick={() => signOut()}>
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : null}
            </Flex>
        </SimpleGrid>
    );
};

export default Navigation;
