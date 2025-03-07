import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc", // Ensure this matches your route
    router: appRouter,
    req, // Pass the NextRequest object directly
    createContext: () => ({}), // Simplify createContext
  });
};

export { handler as GET, handler as POST };
