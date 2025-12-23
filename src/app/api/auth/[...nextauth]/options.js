import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { Login, FetchUserData } from "./method";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                // Example validation
                let { email, password } = credentials;
                //console.log( email, password )
                let user = await Login({ email, password });

                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
         signIn: async ({ user, account, profile, email, credentials }) => {
            console.log( "signin callback", user)
            return true
        },
        redirect: async  ({ url, baseUrl }) => {
            return baseUrl
        },
        jwt: async  ({ token, account, profile }) => {
            // console.log("jwt callback")
            // console.log( token, account )
            if(token) {
                let user = await FetchUserData({ email: token.email })
                if(user) token.role = user.role;
            }
            return token;
        },
        session: async  ({ session, token }) => {
            session.user.role = token.role;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

