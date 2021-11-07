import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { userInterface } from 'types/user';
import * as api from 'users/api';
import LoadingTable from 'components/LoadingTable';
import { TableOptions } from 'react-table';
import Link from 'next/link';
import { IconButton } from '@chakra-ui/react';
import { AiTwotoneEdit } from 'react-icons/ai';
import DeleteButton from 'components/DeleteButton';
import Layout from './Layout';

const TableQuery = (): JSX.Element => {
    const [tableData, setTableData] = useState<userInterface[] | null>(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [lastPage, setLastPage] = useState(1);
    const {
        data: apiResponse,
        isLoading,
        isError,
        isFetching,
    } = useQuery(['users', page, limit], () => api.getUsersWithPagination({ page: page + 1, limit }), {
        keepPreviousData: true,
        staleTime: 100000,
        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        setTableData(apiResponse?.data);
        setLastPage(apiResponse?.meta.last_page);
    }, [apiResponse]);

    const [columns, data] = useMemo(() => {
        const columns: TableOptions<userInterface>['columns'] = [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Created at',
                accessor: 'created_at',
            },
            {
                Header: 'Updated at',
                accessor: 'updated_at',
            },
            {
                Header: 'Edit', // @ts-ignore
                Cell: ({ row }) => (
                    <Link href={`/users/edit/${row.original.id}`}>
                        <IconButton colorScheme="green" icon={<AiTwotoneEdit />} aria-label="edit user" />
                    </Link>
                ),
            },
            {
                Header: 'Delete', // @ts-ignore
                Cell: ({ row }) => <DeleteButton id={row.original.id} />,
            },
        ];
        return [columns, tableData];
    }, [tableData]);
    return (
        <>
            {isLoading ? <LoadingTable /> : null}
            {isError ? <>error getting users</> : null}
            {data ? (
                <Layout
                    isFetching={isFetching}
                    data={data}
                    columns={columns}
                    currentPage={page}
                    totalPage={lastPage}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                />
            ) : null}
        </>
    );
};
export default TableQuery;
