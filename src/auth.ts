import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Lucia } from "lucia";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
   sessionCookie: {
      attributes: {
         secure: import.meta.env.PROD,
      }
   }
});

// IMPORTANT!
declare module "lucia" {
   interface Register {
      Lucia: typeof lucia;
   }
}