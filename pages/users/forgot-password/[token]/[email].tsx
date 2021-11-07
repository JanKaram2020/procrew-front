import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Center, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import * as api from 'users/api';
import * as Yup from 'yup';

const Post = () => {
    const router = useRouter();
    const { token: forgetToken, email } = router.query;
    const [{ isLoading, isSuccess, isError }, setState] = useState<{
        isLoading: boolean;
        isSuccess: boolean | null;
        isError: boolean | null;
        error: string;
    }>({
        isLoading: false,
        isSuccess: null,
        isError: null,
        error: '',
    });
    const formik = useFormik({
        initialValues: {
            email: email ? email : '',
            newPassword: '',
            newPasswordConfirmation: '',
            token: forgetToken ? forgetToken : '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                    'Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
                ),
            newPasswordConfirmation: Yup.string()
                .required('No confirmation password provided.')
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            console.log(values);
        },
    });
    return (
        <Flex
            as="form"
            flexDir="column"
            gridGap="10px"
            width={['96vw', null, '30vw']}
            onSubmit={async (e) => {
                e.preventDefault();
                setState({
                    isLoading: true,
                    isSuccess: null,
                    isError: null,
                    error: '',
                });
                const res = await api.updatePassword({
                    email: email as string,
                    newPassword: formik.values.newPassword,
                    token: forgetToken as string,
                });
                if (res.message.error) {
                    setState({
                        isLoading: false,
                        isSuccess: false,
                        isError: true,
                        error: res.message.error,
                    });
                } else {
                    setState({
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        error: '',
                    });
                    router.push('/');
                }
            }}
        >
            <Heading>Change your password</Heading>
            <FormControl id="newPassword">
                <FormLabel>New Password</FormLabel>
                <Input
                    type="password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                    <Text color="tomato">{formik.errors.newPassword}</Text>
                ) : null}
            </FormControl>
            <FormControl id="newPasswordConfirmation">
                <FormLabel>Confirm new password</FormLabel>
                <Input
                    type="password"
                    value={formik.values.newPasswordConfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.newPasswordConfirmation && formik.errors.newPasswordConfirmation ? (
                    <Text color="tomato">{formik.errors.newPasswordConfirmation}</Text>
                ) : null}
            </FormControl>
            <Center>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    {!isSuccess ? 'Submit' : null}
                    {isSuccess ? 'Success' : null}
                </Button>
            </Center>
            {isError ? <Text color="tomato">it seems email or password is incorrect try again</Text> : null}
        </Flex>
    );
};

export default Post;
