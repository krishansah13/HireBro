import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "seeker" | "employer";
        session.user.companyId = (token.companyId as string | null) ?? null;
      }
      return session;
    },

    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const isDashboard = pathname.startsWith("/dashboard");
      const isEmployer = pathname.startsWith("/employer");

      if ((isDashboard || isEmployer) && !isLoggedIn) {
        return false;
      }

      if (isDashboard && role === "employer") {
        return Response.redirect(new URL("/employer", request.url));
      }

      if (isEmployer && role === "seeker") {
        return Response.redirect(new URL("/dashboard", request.url));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
