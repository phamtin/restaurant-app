import type { PropsWithChildren } from "react";
import { Col, Row } from "antd";

const Container = (props: PropsWithChildren) => {
  return (
    <Row style={{ backgroundColor: "#f4f4f4" }}>
      <Col
        xs={{ span: 18, offset: 3 }}
        md={{ span: 14, offset: 5 }}
        lg={{ span: 10, offset: 7 }}
        xl={{ span: 6, offset: 9 }}
        style={{ border: "2px solid #adadadF" }}
      >
        {props.children}
      </Col>
    </Row>
  );
};

export default Container;
