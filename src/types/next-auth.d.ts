import "next-auth";
import "next-auth/jwt";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id : string,
        role : "seeker"|"employer"
    }

    interface Session {
        user : {
            id : string,
            role : "seeker" | "employer"
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id : string,
        role : "seeker" | "employer"
    }
}