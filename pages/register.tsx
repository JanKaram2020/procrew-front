import * as api from 'users/api';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/client';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { validationSchema } from 'users/signUpSchema';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Head from 'next/head';

const RegisterPage = () => {
    const router = useRouter();
    const [session] = useSession();
    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session]);
    const [{ isLoading, isSuccess, isError }, setState] = useState<{
        isLoading: boolean;
        isSuccess: boolean | null;
        isError: boolean | null;
    }>({
        isLoading: false,
        isSuccess: null,
        isError: null,
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setState({
                isLoading: true,
                isSuccess: null,
                isError: null,
            });
            const res = await api.register(values);
            if (res.errors) {
                setState({
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                });
                formik.setErrors(res.errors);
            }
            if (res.email) {
                setState({
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                });
                signIn('credentials', {
                    email: values.email,
                    password: values.password,
                }).then((log) => {
                    console.log(log);
                    if (log?.error) {
                        setState({
                            isLoading: false,
                            isSuccess: false,
                            isError: true,
                        });
                    } else {
                        setState({
                            isLoading: false,
                            isSuccess: true,
                            isError: false,
                        });
                    }
                });
            }
        },
    });
    return (
        <>
            <Head>
                <title> Procrew | login</title>
            </Head>
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
                <Heading>Register</Heading>
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
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <Text color="tomato">{formik.errors.password}</Text>
                    ) : null}
                </FormControl>
                <FormControl id="passwordConfirmation">
                    <FormLabel>Password confirmation</FormLabel>
                    <Input
                        type="password"
                        value={formik.values.passwordConfirmation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                        <Text color="tomato">{formik.errors.passwordConfirmation}</Text>
                    ) : null}
                </FormControl>
                <Center>
                    <Button isLoading={isLoading} disabled={isLoading} type="submit" colorScheme="green">
                        {!isSuccess ? 'Submit' : null}
                        {isSuccess ? 'Success' : null}
                    </Button>
                </Center>
                {isError ? <Text color="tomato">error registering, fix errors and try again</Text> : null}
                <Center>
                    <Text>
                        already registered ?
                        <NextLink href="/login" passHref>
                            <Link> Log in</Link>
                        </NextLink>
                    </Text>
                </Center>
                <Center>
                    or sign in with
                    <Button
                        marginLeft="10px"
                        colorScheme="messenger"
                        leftIcon={<AiFillGithub />}
                        onClick={() => signIn('github')}
                    >
                        Github
                    </Button>
                </Center>
            </Flex>
        </>
    );
};

export default RegisterPage;
