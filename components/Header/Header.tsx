"use client";
import { Col, Row } from "antd";
import styles from "./page.module.scss";

const Header = () => {
  return (
    <nav className={styles.wrapper}>
      <Row>
        <Col
          xs={{ span: 22, offset: 1 }}
          md={{ span: 14, offset: 5 }}
          lg={{ span: 10, offset: 7 }}
          xl={{ span: 8, offset: 8 }}
          style={{ border: "2px solid red" }}
        >
          Col
        </Col>
      </Row>
    </nav>
  );
};
export default Header;
