import * as v from "valibot";
import { publicProdure, router } from "../trpc";
import prisma from "@/lib/prisma";
import type { Category, Prisma, Restaurant } from "@prisma/client";

export const restaurantRouter = router({
  getRestaurants: publicProdure
    .input(
      v.object({
        category: v.union([v.string(), v.null()]),
        query: v.optional(v.string()),
        accountId: v.number(),
      })
    )
    .query(async ({ input }) => {
      const whereQuery: Prisma.RestaurantWhereInput = {};

      if (input.query) {
        whereQuery.name = {
          contains: input.query,
        };
      }

      if (input.category) {
        whereQuery.category = input.category as Category;
      }

      const favoriteRestaurants = await prisma.accountFavRestaurant.findMany({
        where: {
          account_id: input.accountId,
        },
        select: {
          restaurant_id: true,
        },
      });

      const favoriteRestaurantIds = new Map(
        favoriteRestaurants.map((fav) => [fav.restaurant_id, true])
      );

      const restaurants: Restaurant[] = await prisma.restaurant.findMany({
        where: whereQuery,
      });

      const restaurantsWithFavorites = restaurants.map((restaurant) => ({
        ...restaurant,
        isFavorite: favoriteRestaurantIds.has(restaurant.id),
      }));

      return {
        status: 200,
        data: {
          restaurant: restaurantsWithFavorites,
        },
      };
    }),

  addFavorite: publicProdure
    .input(
      v.object({
        restaurantId: v.string(),
        accountId: v.number(),
      })
    )
    .mutation(async ({ input }) => {
      const [restaurant, account] = await Promise.all([
        prisma.restaurant.findUnique({
          where: {
            id: input.restaurantId,
          },
        }),
        prisma.account.findUnique({
          where: {
            id: input.accountId,
          },
        }),
      ]);
      if (!restaurant || !account) {
        return {
          status: 404,
          data: { message: "Account or Restaurant not found" },
        };
      }

      const added = await prisma.accountFavRestaurant.findFirst({
        where: {
          account_id: input.accountId,
          restaurant_id: input.restaurantId,
        },
      });

      if (added) {
        await prisma.accountFavRestaurant.delete({
          where: {
            id: added.id,
          },
        });
      } else {
        await prisma.accountFavRestaurant.create({
          data: {
            account_id: input.accountId,
            restaurant_id: input.restaurantId,
          },
        });
      }

      return {
        status: 200,
        data: {
          success: true,
        },
      };
    }),
});
