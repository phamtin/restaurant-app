import { Flex, Typography } from "antd";
import styles from "./page.module.scss";
import { StarIcon } from "@heroicons/react/24/solid";

import type { Restaurant } from "@prisma/client";

type CaradInfoProps = {
  restaurant: Restaurant;
};

const CaradInfo = (props: CaradInfoProps) => {
  const { restaurant } = props;

  const renderRating = (restaurant: Restaurant) => {
    const total = restaurant.rating_count;
    const rating = total === 0 ? "" : restaurant.rating;

    return (
      <Flex align="center" gap={3}>
        <StarIcon width={20} color="orange" />
        {`${rating}(${total})`}
      </Flex>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Flex vertical>
        <Typography.Text className={styles.subHeading}>
          {restaurant.city}
        </Typography.Text>

        <Flex align="center" justify="space-between">
          <Flex wrap="nowrap" className={styles.headingWrapper}>
            <Typography.Text className={styles.heading}>
              {restaurant.name}
            </Typography.Text>
          </Flex>
          <Flex className={styles.statsWrapper}>
            <Typography.Text type="secondary" strong>
              {renderRating(restaurant)}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex align="center" justify="space-between">
          <Typography.Paragraph
            className={styles.description}
            type="secondary"
            ellipsis={{
              rows: 2,
            }}
          >
            {restaurant.desc}
          </Typography.Paragraph>
        </Flex>
      </Flex>
    </div>
  );
};

export default CaradInfo;
