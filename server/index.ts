import { router } from "./trpc";
import { restaurantRouter } from "./routers/restaurant";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  restaurant: restaurantRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
