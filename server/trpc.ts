import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const trpc = initTRPC.context().create({
  transformer: superjson,
});

export const router = trpc.router;

export const publicProdure = trpc.procedure;
