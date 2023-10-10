import React, { useState } from "react";
import CreateEditStarCard from "../../components/CreateStar/CreateEditStarCard";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import StarsListCard from "./StarsListCard";

function StarsList() {
  const [isEditing, setIsEditing] = useState(false);
  const [starToEdit, setStarToEdit] = useState(null);

  const handleEditStar = (star) => {
    setIsEditing(true);
    setStarToEdit(star);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setStarToEdit(null);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    setStarToEdit(null);
  };

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
            {isEditing ? (
              <CreateEditStarCard
                starToEdit={starToEdit}
                onCancelEdit={handleCancelEdit} // Agregar onCancelEdit
                onEditComplete={handleEditComplete} // Agregar onEditComplete
              />
            ) : (
              <StarsListCard onEdit={handleEditStar} />
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StarsList;
