import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { githubLogin, login } from 'users/api';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'read:user',
        }),
        Providers.Credentials({
            name: 'Email and Password',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const user = await login(credentials);
                if (user.email) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn(user, account, metadata) {
            if (account.provider === 'github') {
                try {
                    const userData = await githubLogin(metadata?.name);
                    user.accessToken = userData.token;
                    return true;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            } else {
                return true;
            }
        },
        async jwt(token, user, account) {
            if (account?.provider === 'github') {
                if (user?.accessToken) {
                    token.accessToken = user.accessToken;
                }
            } else if (user) {
                token.accessToken = user.token;
            }
            return token;
        },

        async session(session, token) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    debug: false,
});
