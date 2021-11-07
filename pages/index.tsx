import type { NextPage } from 'next';
import Table from 'components/PaginatedTable';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title> Procrew | user management system</title>
            </Head>
            <Table />
        </>
    );
};

export default Home;
