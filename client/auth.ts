import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import db from "./lib/db";
import Github from "next-auth/providers/github";
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",

  session: { strategy: "jwt" },
  providers: [Github],
});
