import { useFormik } from 'formik';
import { signIn } from 'next-auth/client';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { validationSchema } from 'users/signUpSchema';
import { useState } from 'react';
import NextLink from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const router = useRouter();
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
            setState({
                isLoading: true,
                isSuccess: null,
                isError: null,
            });
            console.log({
                email: values.email,
                password: values.password,
            });
            signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            }).then((error) => console.log(error));
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
                setState({
                    isLoading: true,
                    isSuccess: null,
                    isError: null,
                });
                signIn('credentials', {
                    email: formik.values.email,
                    password: formik.values.password,
                    redirect: false,
                })
                    .then((log) => {
                        console.log(log);
                        setState({
                            isLoading: false,
                            isSuccess: true,
                            isError: false,
                        });
                        router.push('/');
                    })
                    .catch((error) => {
                        console.log(error);
                        setState({
                            isLoading: false,
                            isSuccess: false,
                            isError: true,
                        });
                    });
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
                {formik.touched.email && formik.errors.email ? <Text color="tomato">{formik.errors.email}</Text> : null}
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
    );
};

export default LoginPage;
