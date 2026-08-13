import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "./lib/models/User";
import { connectToDatabase } from "./lib/utils/db";
import { authConfig } from "./auth.config";

export const {handlers, signIn, signOut, auth} = NextAuth ({
    ...authConfig,
    providers : [
        Credentials({
            credentials:{
                email : {
                    label : "Email",
                    type : "email",
                },password : {
                    label : "Password",
                    type : "password"
                },
            },

            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    return null;
                }
                
                await connectToDatabase();

                const user = await User.findOne({email : credentials.email});
                
                if(!user) {
                    return null;
                }

                const passwordMatches = await bcrypt.compare(credentials.password as string, user.passwordHash);

                if(!passwordMatches) {
                    return null;
                }

                return {
                    id : user._id.toString(),
                    name : user.name,
                    email : user.email,
                    role : user.role
                };
            },
        }),
    ],
    callbacks : {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id
                token.role = user.role
            }
            return token;
        },

        async session({session, token}) {
            if(session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as |"seeker"|"employer"
            }
            return session
        },
    },
    pages : {
        signIn : '/login'
    },
    session : {
        strategy : 'jwt'
    }
})