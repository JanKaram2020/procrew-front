/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Dispatch, SetStateAction } from 'react';
import { TableOptions, useSortBy, useTable, usePagination } from 'react-table';
import {
    Box,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    chakra,
    IconButton,
    Select,
    HStack,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Center,
    Skeleton,
    Spinner,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { userInterface } from 'types/user';
import {
    AiOutlineArrowUp,
    AiOutlineArrowDown,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from 'react-icons/ai';

interface layoutInterface extends TableOptions<userInterface> {
    currentPage: number;
    totalPage: number;
    limit: number;
    isFetching: boolean;
    setPage: Dispatch<SetStateAction<number>>;
    setLimit: Dispatch<SetStateAction<number>>;
}
const Layout = ({ columns, data, currentPage, totalPage, limit, setPage, setLimit, isFetching }: layoutInterface) => {
    const tableInstance = useTable(
        {
            columns,
            data,
            useControlledState: (state) => {
                return React.useMemo(
                    () => ({
                        ...state,
                        pageIndex: currentPage,
                    }),
                    [state, currentPage],
                );
            },
            initialState: { pageIndex: currentPage - 1, pageSize: limit },
            manualPagination: true,
            pageCount: totalPage,
        },
        useSortBy,
        usePagination,
    );
    const { getTableProps, getTableBodyProps, headerGroups, page, canPreviousPage, canNextPage, prepareRow } =
        tableInstance;
    return (
        <>
            <Box overflowX="scroll" maxWidth="100vw" border="1px solid #000000" borderRadius="10px">
                <AnimatePresence>
                    <Table variant="striped" colorScheme="blue" {...getTableProps()}>
                        <Thead>
                            {headerGroups.map((headerGroup) => (
                                <Tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <Th height="50px" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <chakra.span pl="4">
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <IconButton
                                                            aria-label="sorted descending"
                                                            icon={<AiOutlineArrowDown />}
                                                            size="xs"
                                                        />
                                                    ) : (
                                                        <IconButton
                                                            aria-label="sorted ascending"
                                                            icon={<AiOutlineArrowUp />}
                                                            size="xs"
                                                        />
                                                    )
                                                ) : null}
                                            </chakra.span>
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <Tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                                        })}
                                    </Tr>
                                );
                            })}
                            {isFetching ? (
                                <Tr marginTop="20px">
                                    <Td>
                                        <Skeleton height="20px" marginBottom="10px" />
                                    </Td>
                                    <Td>
                                        <Skeleton height="20px" marginBottom="10px" />
                                    </Td>
                                    <Td>
                                        <Skeleton height="20px" marginBottom="10px" />
                                    </Td>
                                    <Center as={Td}>
                                        <Spinner size="xl" />
                                    </Center>
                                    <Td>
                                        <Skeleton height="20px" marginBottom="10px" />
                                    </Td>
                                    <Td>
                                        <Skeleton height="20px" marginBottom="10px" />
                                    </Td>
                                    <Td>
                                        <Skeleton height="20px" marginBottom="10px" />
                                    </Td>
                                </Tr>
                            ) : null}
                        </Tbody>
                    </Table>
                </AnimatePresence>
            </Box>
            <Center>
                <HStack marginTop="10px" flexWrap="wrap" gridGap="10px">
                    <IconButton
                        onClick={() => setPage(0)}
                        disabled={!canPreviousPage}
                        icon={<AiOutlineDoubleLeft />}
                        aria-label="got to page 0"
                    />
                    <IconButton
                        aria-label="go to previous page"
                        icon={<AiOutlineArrowLeft />}
                        onClick={() => setPage(currentPage - 1)}
                        disabled={!canPreviousPage}
                    />
                    <IconButton
                        aria-label="go to next page"
                        icon={<AiOutlineArrowRight />}
                        onClick={() => setPage(currentPage + 1)}
                        disabled={!canNextPage}
                    />
                    <IconButton
                        onClick={() => setPage(totalPage - 1)}
                        disabled={!canNextPage}
                        icon={<AiOutlineDoubleRight />}
                        aria-label="got to last page"
                    />
                    <Text>
                        Page &nbsp;
                        <chakra.strong>
                            {currentPage + 1} of {totalPage}
                        </chakra.strong>{' '}
                        || Go to page:
                    </Text>
                    <NumberInput
                        display="inline-block"
                        width="100px"
                        defaultValue={currentPage + 1}
                        min={1}
                        max={totalPage}
                        onChange={(value) => {
                            const page = value ? Number(value) - 1 : 0;
                            setPage(page);
                        }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        width="150px"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </HStack>
            </Center>
        </>
    );
};

export default Layout;
