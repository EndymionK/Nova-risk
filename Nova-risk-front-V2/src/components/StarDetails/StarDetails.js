import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStarById } from "../../Services/Services";
import Particle from "../Particle";
import "./star-details.css";
import StarImageSearch from "./StarImageSearch";
import LoadingPopup from "../LoadingPopup";

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
//     <StarImageSearch starName={star.proper}/> 
  return (   
    <div>
      
      <section className="ContainerCards">
        <Particle />
        {Object.entries(labelMappings).map(([labelAbbr, labelFull], index) => (
            <div className="Card" key={index}>
              <h6><strong>{labelFull}</strong></h6>
              <p>{star[labelAbbr]}</p>
            </div>
        ))}
      </section>
    </div> 
  );
};

export default StarDetails;
