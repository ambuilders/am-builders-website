import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isStaff: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isStaff?: boolean;
  }
}
