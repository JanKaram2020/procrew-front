import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as api from 'users/api';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import Head from 'next/head';

const ForgetPasswordPage = () => {
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
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    const handleSubmit = async () => {
        setState({
            isLoading: true,
            isSuccess: null,
            isError: null,
        });
        const res = await api.forgetPassword(formik.values.email);
        console.log(res);
        if (res.name) {
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
    };
    return (
        <>
            <Head>
                <title> Procrew | forget password</title>
            </Head>
            <Flex
                as="form"
                flexDir="column"
                gridGap="10px"
                width={['96vw', null, '30vw']}
                onSubmit={async (e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Heading>Forget password</Heading>
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
                <Center>
                    <Button isLoading={isLoading} type="submit" colorScheme="green">
                        {!isSuccess ? 'Submit' : null}
                        {isSuccess ? 'Success' : null}
                    </Button>
                </Center>
                <Center>
                    {isSuccess ? (
                        <Text>
                            if an account exists with this email.
                            <br /> an email with instructions will be sent to you.
                        </Text>
                    ) : null}
                </Center>
                <Center>{isError ? <Text> error sending email. try again later </Text> : null}</Center>
            </Flex>
        </>
    );
};

export default ForgetPasswordPage;
