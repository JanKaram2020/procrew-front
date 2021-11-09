import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as api from 'users/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import { userInterface } from 'types/user';

const EditUserPage = () => {
    const router = useRouter();
    const { id: userId } = router.query;
    const {
        data: user,
        isLoading: userLoading,
        isError: userFetchingError,
    } = useQuery([`user`, userId], () => api.getUser(userId as unknown as number), {
        enabled: Boolean(userId),
    });
    const queryClient = useQueryClient();
    const { mutate, isLoading, isSuccess, isError } = useMutation((values: userInterface) => api.updateUser(values), {
        onSettled: () => {
            queryClient.invalidateQueries('users');
        },
    });
    const formik = useFormik({
        initialValues: user
            ? user
            : {
                  email: '',
                  name: '',
              },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(3, "Can't be less than 3 characters")
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values) => {
            mutate(values);
        },
    });
    return (
        <Flex
            as="form"
            flexDir="column"
            gridGap="10px"
            width={['96vw', null, '30vw']}
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            <Heading>Edit user</Heading>
            {userFetchingError ? (
                <Heading fontSize="1rem" color="tomato">
                    Error getting user, try again later
                </Heading>
            ) : null}
            {userLoading ? (
                <>
                    <Heading fontSize="1rem">Loading user info</Heading>
                    <Spinner size="xl" />
                </>
            ) : null}
            {user ? (
                <>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text color="tomato">{formik.errors.email}</Text>
                        ) : null}
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <Text color="tomato">{formik.errors.name}</Text>
                        ) : null}
                    </FormControl>
                    <Center>
                        <Button isLoading={isLoading} disabled={isLoading} type="submit" colorScheme="green">
                            {!isError && !isSuccess ? 'Submit' : null}
                            {isError ? 'error editing user' : null}
                            {isSuccess ? 'Success' : null}
                        </Button>
                    </Center>
                </>
            ) : null}
        </Flex>
    );
};

export default EditUserPage;
