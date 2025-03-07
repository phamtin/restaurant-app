"use client";
import { useState } from "react";
import { Flex, Input, Button, Typography, Skeleton } from "antd";
import styles from "./page.module.scss";
import debounce from "debounce";
import Container from "@/components/container/Container";
import CardItem from "@/components/CardItem/CardItem";
import type { Category } from "@prisma/client";
import { textByStoreCategory } from "@/utils/app.constant";
import { trpc } from "@/server/client";
import AuthHooks from "@/modules/auth/hooks/auth.hooks";

type HomeScreenProps = {
  categories: Category[];
};

const HomeScreen = (props: HomeScreenProps) => {
  const { categories } = props;
  const user = AuthHooks.useGetLoggedInUser();

  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [query, setQuery] = useState<string>("");

  const accountId = user.accountId as number;

  const {
    data: restaurants,
    isLoading,
    refetch: refetchRestaurants,
  } = trpc.restaurant.getRestaurants.useQuery(
    {
      query,
      category: activeCategory,
      accountId,
    },
    {
      select: (data) => data.data.restaurant,
    }
  );

  const markAsFav = trpc.restaurant.addFavorite.useMutation({
    onSuccess: () => {
      refetchRestaurants();
    },
  });

  const onSelectCategory = (_category: Category) => {
    setActiveCategory(_category);
    setQuery("");
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 1) {
      return;
    }
    setQuery(e.target.value);
    setActiveCategory(null);
  };

  const deouncedQueryChange = debounce(onQueryChange, 500);

  const markRestaurantAsFavorite = (restaurantId: string) => {
    if (!accountId) {
      return;
    }
    markAsFav.mutate({ restaurantId, accountId });
  };

  return (
    <div className={styles.wrapper}>
      <Flex justify="center" align="center">
        <Typography.Title level={2}>Restaurants</Typography.Title>
      </Flex>
      <Container>
        <div className={styles.search}>
          <Input
            placeholder="Search"
            size="large"
            onChange={deouncedQueryChange}
          />
        </div>
        <Flex className={styles.categories}>
          <Flex align="center" className={styles.space}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "filled" : "text"}
                color="default"
                onClick={() => onSelectCategory(category)}
              >
                {textByStoreCategory[category]}
              </Button>
            ))}
          </Flex>
        </Flex>

        <Flex vertical justify="center">
          {isLoading ? (
            <Skeleton />
          ) : (
            restaurants?.map((restaurant) => (
              <CardItem
                key={restaurant.id}
                restaurant={restaurant}
                markAsFav={markRestaurantAsFavorite}
              />
            ))
          )}
        </Flex>
      </Container>
    </div>
  );
};

export default HomeScreen;
