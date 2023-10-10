import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import CreateEditStarCard from "./CreateEditStarCard";

function CreateStar() {

  const starToEdit = null;

  return (
    <Container fluid className="CreateStar-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "10px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "5em", paddingBottom: "40px" }}>
              Add a new <strong className="purple">Star</strong> to the database.
            </h1>
            <CreateEditStarCard starToEdit={starToEdit} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default CreateStar;

