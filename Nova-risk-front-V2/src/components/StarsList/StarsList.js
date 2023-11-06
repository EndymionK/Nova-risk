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
            md={10}
            style={{
              justifyContent: "center",
              paddingTop: "70px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              {isEditing ? 
                "Editing Star" : (
                <>
                  Our <strong className="purple">Stars</strong> Database
                </>
              )}
            </h1>
            {isEditing ? (
              <CreateEditStarCard
                starToEdit={starToEdit}
                onCancelEdit={handleCancelEdit}
                onEditComplete={handleEditComplete}
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