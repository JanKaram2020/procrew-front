import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/client';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { validationSchema } from 'users/signUpSchema';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Head from 'next/head';

const LoginPage = () => {
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
            console.log(values);
        },
    });
    const handleSubmit = () => {
        setState({
            isLoading: true,
            isSuccess: null,
            isError: null,
        });
        signIn('credentials', {
            email: formik.values.email,
            password: formik.values.password,
            redirect: false,
        }).then((log) => {
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
    };
    return (
        <>
            <Head>
                <title> Procrew | login</title>
            </Head>
            {!session ? (
                <Flex
                    as="form"
                    flexDir="column"
                    gridGap="10px"
                    width={['96vw', null, '30vw']}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Heading>Login</Heading>
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
                    <Center>
                        <Button isLoading={isLoading} type="submit" colorScheme="green">
                            {!isSuccess ? 'Submit' : null}
                            {isSuccess ? 'Success' : null}
                        </Button>
                    </Center>
                    {isError ? <Text color="tomato">it seems email or password is incorrect try again</Text> : null}
                    {isError ? (
                        <Center>
                            <Text>
                                Forget password ? click{' '}
                                <NextLink href="/forgot-password" passHref>
                                    <Link> here</Link>
                                </NextLink>
                            </Text>
                        </Center>
                    ) : null}
                    <Center>
                        <Text>
                            {`didn't sign up ?`}
                            <NextLink href="/register" passHref>
                                <Link> Sign up</Link>
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
            ) : null}
        </>
    );
};

export default LoginPage;
