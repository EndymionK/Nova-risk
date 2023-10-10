import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStars, deleteStar } from "../../Services/Services";
import { Link } from "react-router-dom";

const StarsListCard = ({ onEdit }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    loadStars()
      .then((response) => {
        setStars(response.data);
      })
      .catch((error) => {
        console.error("Error loading stars:", error);
      });
  }, []);

  const handleDelete = (_id) => {
    deleteStar(_id)
      .then(() => {
        setStars((prevStars) => prevStars.filter((star) => star._id !== _id));
      })
      .catch((error) => {
        console.error("Error deleting star:", error);
      });
  };

  const catalogNames = {
    hip: "Hipparcos Catalog",
    hd: "Henry Draper Catalog",
    hr: "Harvard Revised Catalog",
    gl: "Gliese Catalog",
    bf: "Bayer / Flamsteed Designation",
  };

  const getNumberToShow = (star) => {

    const mandatoryVariables = ["hip", "hd", "hr", "gl", "bf"];

    for (const variable of mandatoryVariables) {
      if (star[variable]) {
        return `${catalogNames[variable]}: ${star[variable]}`;
      }
    }
  
    return "N/A";
  };

  return (
    <Container fluid className="StarListCard-section">
      {stars.map((star) => (
        <Card key={star._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between mb-1">
                <div className="fw-bold">
                  <Link to={`/star/${star._id}`} className="link-no-underline">
                    {getNumberToShow(star)}
                  </Link>
                </div>
              <div className="text-muted small">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer"
                  onClick={() => onEdit(star)}
                />
                
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer ms-2 trash-icon"
                  onClick={() => handleDelete(star._id)}
                  style={{
                    color: "initial",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default StarsListCard;
