import Image from "next/image";
import styles from "./page.module.scss";
import { Button } from "antd";
import Icon from "@/components/Icon/Icon";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutLineIcon } from "@heroicons/react/24/outline";
import type { Restaurant } from "@prisma/client";

type CaradImageProps = {
  restaurant: Restaurant;
  markAsFav: (restaurantId: string) => void;
};

const CaradImage = (props: CaradImageProps) => {
  const { restaurant, markAsFav } = props;

  const FavIcon = restaurant.isFavorite ? (
    <HeartIcon color="white" />
  ) : (
    <HeartOutLineIcon color="white" />
  );

  const onMarkAsFav = () => {
    markAsFav(restaurant.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.favButton}>
        <Button
          size="large"
          shape="circle"
          color="default"
          variant="filled"
          icon={<Icon icon={FavIcon} />}
          onClick={onMarkAsFav}
        />
      </div>
      <div className={styles.image}>
        <Image fill alt="image" src={restaurant.images[0]} />
      </div>
    </div>
  );
};

export default CaradImage;
