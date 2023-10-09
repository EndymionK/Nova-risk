import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import StarsListCard from "./StarsListCard";

function StarsList() {
  return (
    <Container fluid className="StarList-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Our <strong className="purple">Stars</strong> List
            </h1>
            <StarsListCard />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StarsList;
