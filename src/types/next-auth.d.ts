import "next-auth";
import "next-auth/jwt";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "seeker" | "employer";
    companyId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: "seeker" | "employer";
      companyId?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "seeker" | "employer";
    companyId?: string | null;
  }
}
