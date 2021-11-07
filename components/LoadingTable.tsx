import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Skeleton, Box } from '@chakra-ui/react';

const LoadingTable = () => {
    return (
        <Box maxWidth="100vw" border="1px solid white" borderRadius="10px">
            <Table variant="striped" colorScheme="blue">
                <Thead>
                    <Tr>
                        <Th>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Th>
                        <Th>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Th>
                        <Th>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Th>
                        <Th>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Th>
                        <Th>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Th>{' '}
                        <Th>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>{' '}
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                    </Tr>{' '}
                    <Tr>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                    </Tr>{' '}
                    <Tr>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
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
                    <Tr>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
                        <Td>
                            <Skeleton height="20px" marginBottom="10px" />
                        </Td>
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
                </Tbody>
            </Table>
        </Box>
    );
};
export default LoadingTable;
