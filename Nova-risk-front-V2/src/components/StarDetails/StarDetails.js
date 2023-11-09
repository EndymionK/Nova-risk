import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStarById } from "../../Services/Services";
import Particle from "../Particle";
import "./star-details.css";
import LoadingPopup from "../LoadingPopup";
import astronomer from "../../Assets/astronomer.png";

const StarDetails = () => {
  const { id } = useParams();
  const [star, setStar] = useState(null);
  const [starname, setStarName] = useState(null);

  useEffect(() => {
    loadStarById(id)
      .then((response) => {
        setStar(response.data);
        const starIdentifierValue = getStarIdentifierValue(response.data);
        setStarName(starIdentifierValue);
      })
      .catch((error) => {
        console.error("Error loading star details:", error);
      });
  }, [id]);

  const getStarIdentifierValue = (starData) => {
    const catalogNames = ["proper", "hip", "hd", "hr", "gl", "bf"];
    for (const catalog of catalogNames) {
      if (starData[catalog]) {
        return starData[catalog];
      }
    }
    return null;
  };

  if (!star) {
    return <LoadingPopup />;
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
    psupernova: "Probability of Supernova",
  };

  return (
    <div className="StarDetails-section">
      <Particle />
      <section className="Astronomer-section">
        <div className="Astronomer-container">
          <div className="Astronomer-text">
            <h2 style={{ color: 'purple',fontWeight: 'bold' }}>Star Details</h2>

            <p>
              You have selected a star, and here are some key details about it. Explore the mysteries of the universe through this celestial information.
            </p>
          </div>
          <img src={astronomer} alt="Astronomer" className="astronomer-img" />
        </div>
      </section>
      <section className="ContainerCards">
        {Object.entries(labelMappings).map(([labelAbbr, labelFull], index) => (
          <div className="Card" key={index}>
            <h6>
              <strong>{labelFull}</strong>
            </h6>
            <p>{star[labelAbbr]}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StarDetails;
