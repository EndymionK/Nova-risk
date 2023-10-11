import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStarById } from "../../Services/Services";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "./star-details.css";

const StarDetails = () => {
  const { id } = useParams(); 
  const [star, setStar] = useState(null);

  useEffect(() => {
    
    loadStarById(id)
      .then((response) => {
        setStar(response.data); 
      })
      .catch((error) => {
        console.error("Error loading star details:", error);
      });
  }, [id]);

  if (!star) {
    return <div>Loading...</div>; 
  }


  const labelMappings = {
    hip: "Hipparcos Catalog Id",
    hd: "Henry Draper Catalog Id",
    hr: "Harvard Revised Catalog Id",
    gl: "Gliese Catalog Id",
    bf: "Bayer Id / Flamsteed Designation Id",
    proper: "Proper Name",
    ra: "Right Ascension",
    dec: "Declination",
    dist: "Distance",
    pmra: "Proper Motion in Right Ascension",
    pmdec: "Proper Motion in Declination",
    rv: "Radial Velocity",
    mag: "Magnitude",
    absmag: "Absolute Magnitude",
    spect: "Spectral Type",
    ci: "Color Index",
    x: "X-coordinate",
    y: "Y-coordinate",
    z: "Z-coordinate",
    vx: "Velocity X",
    vy: "Velocity Y",
    vz: "Velocity Z",
    rarad: "Right Ascension in Radians",
    decrad: "Declination in Radians",
    pmrarad: "Proper Motion in Right Ascension in Radians",
    pmdecrad: "Proper Motion in Declination in Radians",
    bayer: "Bayer Designation",
    flam: "Flamsteed Designation",
    con: "Constellation",
    comp: "Companion Star",
    comp_primary: "Primary Companion Star",
    base: "Catalog Base",
    lum: "Luminosity",
    var: "Variable Star",
    var_min: "Variable Star Minimum Magnitude",
    var_max: "Variable Star Maximum Magnitude",
    p_supernova: "Probability of Supernova",
  };

  // return (
  //   <Container style={{ position: "relative" }}>
  //     <Particle style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
  //     <Container fluid className="StarDetails-section">
  //       <Row style={{ justifyContent: "center", padding: "10px" }}>
  //         <Col
  //           md={7}
  //           style={{
  //             justifyContent: "center",
  //             paddingTop: "60px",
  //             paddingBottom: "10px",
  //           }}
  //         >
  //           <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
  //             Aditional information about the <span style={{ fontSize: "1.2em", fontWeight: "bold" }} className="purple">Star</span>
  //           </h1>
  //         </Col>
  //       </Row>
  //     </Container>
  //     <Row>
  //       {Object.entries(labelMappings).map(([labelAbbr, labelFull]) => (
  //         <Col md={4} key={labelAbbr}>
  //           <div className="bg-white p-3 mb-3">
  //             <h6 className="mb-3"><strong>{labelFull}</strong></h6>
  //             <p className="mb-0">{star[labelAbbr]}</p>
  //           </div>
  //         </Col>
  //       ))}
  //     </Row>
  //   </Container>
  // );
  return (
    <section className="ContainerCards">
      {Object.entries(labelMappings).map(([labelAbbr, labelFull], index) => (
          <div className="Card" key={index}>
            <h6><strong>{labelFull}</strong></h6>
            <p>{star[labelAbbr]}</p>
          </div>
      ))}
    </section>
  );
};

export default StarDetails;
