import axios from 'axios';
import { userRegisterInterface } from 'types/user';

export const api = axios.create({
    baseURL: 'https://procrew-back.herokuapp.com/api',
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
    },
});

export const register = async (user: userRegisterInterface) => {
    return api
        .post(`/register`, user)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const login = async (user: { email: string; password: string; name?: string }) => {
    return api
        .post(`/login`, user)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const forgetPassword = async (email: string) => {
    return api
        .post(`/forget-password`, { email })
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const updatePassword = async (user: { email: string; newPassword: string; token: string }) => {
    return api
        .put(`/update-password`, user)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const githubLogin = async (name: string | undefined) => {
    return api
        .post(`/github-login`, { name })
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const getUsers = async () => {
    return api
        .get(`/users`)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const getUsersWithPagination = async ({ page, limit }: { page: number; limit: number }) => {
    return api
        .get(`/users/pagination/${page}/${limit}`)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const getUser = async (id: number) => {
    return api
        .get(`/users/${id}`)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const createUser = async (user: { email: string; password: string; name: string }) => {
    return api
        .post(`/users`, user)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const updateUser = async (user: { id: number; email: string; name: string }) => {
    console.log(user);
    return api
        .put(`/users/${user.id}`, user)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};
export const updateCurrentUser = async (user: {
    id: number;
    email: string;
    name: string;
    password: string;
    newPassword: string;
}) => {
    return api
        .put(`/update-user/${user.id}`, user)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};

export const deleteUser = async ({ id }: { id: number }) => {
    return api
        .delete(`/users/${id}`)
        .then((res) => res.data)
        .catch((e) => e.toJSON());
};
