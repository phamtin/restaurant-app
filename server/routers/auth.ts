import * as v from "valibot";
import { publicProdure, router } from "../trpc";
import prisma from "@/lib/prisma";

export const authRouter = router({
  signin: publicProdure
    .input(
      v.object({
        email: v.pipe(v.string(), v.email(), v.trim(), v.toLowerCase()),
      })
    )
    .mutation(async ({ input }) => {
      const res = {
        user: {
          id: 0,
          email: "",
          name: "",
        },
        token: "",
      };

      const account = await prisma.account.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!account) {
        const newAccount = await prisma.account.create({
          data: {
            email: input.email,
            name: input.email.split("@")[0], //  Dummy name
          },
        });
        res.user = newAccount;
      } else {
        res.user = account;
      }

      const token = `${res.user.id}-${Date.now()}`; // Simple token

      const createdToken = await prisma.token.create({
        data: {
          token,
          account_id: res.user.id,
        },
      });
      res.token = createdToken.token;

      return {
        success: true,
        data: res,
      };
    }),
});
