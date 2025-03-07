import styles from "./page.module.scss";
import CaradImage from "./CardImage/CardImage";
import CaradInfo from "./CardInfo/CardInfo";
import type { Restaurant } from "@prisma/client";

type CaradItemProps = {
  restaurant: Restaurant;
  markAsFav: (restaurantId: string) => void;
};

const CardItem = (props: CaradItemProps) => {
  const { restaurant, markAsFav } = props;

  return (
    <div className={styles.wrapper}>
      <CaradImage restaurant={restaurant} markAsFav={markAsFav} />
      <CaradInfo restaurant={restaurant} />
    </div>
  );
};

export default CardItem;
