import type { NextPage } from 'next';
import Table from 'components/PaginatedTable';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const Home: NextPage = () => {
    const router = useRouter();
    const [session] = useSession();
    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session]);
    return (
        <>
            <Head>
                <title> Procrew | user management system</title>
            </Head>
            {session ? <Table /> : null}
        </>
    );
};

export default Home;
