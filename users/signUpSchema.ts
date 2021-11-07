import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(3, "Can't be less than 3 characters")
        .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
            'Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        ),
    passwordConfirmation: Yup.string()
        .required('No confiramtion password provided.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
