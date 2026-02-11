import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAIL_DOMAIN = "@globe.com.ph";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    signIn({ user }) {
      const email = user?.email?.toLowerCase() ?? "";
      if (email.endsWith(ALLOWED_EMAIL_DOMAIN)) return true;
      // Redirect back to sign-in with error so we can show a message
      return "/?error=DomainNotAllowed";
    },
  },
};
