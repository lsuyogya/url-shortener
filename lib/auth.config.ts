import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma";
import Google from "next-auth/providers/google";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
};
