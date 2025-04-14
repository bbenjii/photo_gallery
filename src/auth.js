export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

import NextAuth from "next-auth"
// import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
// import { signInSchema } from "./lib/zod"
import Google from "next-auth/providers/google"

import {fetchUser} from "@/lib/models/userModel";

const providers = [
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
            username: {},
            password: {},
        },
        authorize: async (credentials) => {
            try {
                let user = null
                let email = credentials.email
                let password = credentials.password


                if (email === "benji.ollomo@gmail.com" && password === "ben") {
                    user = {
                        "email": email,
                        "name": "Benjamin Ollomo",
                    }
                    console.log(user)
                }

                if (!user) {
                    console.log("usernot found...")

                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }
                return user

            } catch (error) {
                return null
            }
        },
    }),
    Google
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== "credentials")

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers,
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async signIn({ account, profile }) {
            // Allow sign-in only for specific Google email addresses
            if(account.provider === "credentials") return true
            let user = await fetchUser(profile.email)
            if (!user) {
                return false
            }

            return true;
        },
        async jwt({token, user}) {
            if (user) { // User is available during sign-in
                let dbUser = await fetchUser(user.email)
                token.username = dbUser.username
                token.displayName = dbUser.displayname
                token.userId = dbUser._id
                token.name = dbUser.name

            }
            return token
        },
        session({session, token}) {
            session.user.username = token.username
            session.user.displayName = token.displayName
            session.user.userId = token.userId
            session.user.name = token.name

            return session
        },
        async redirect({url, baseUrl}) {
            return "/"
        }
    },

})