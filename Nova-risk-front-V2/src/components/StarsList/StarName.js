import React from "react";

const StarName = ({ star }) => {
  const catalogNames = {
    proper: "Proper Name",
    hip: "Hipparcos Catalog",
    hd: "Henry Draper Catalog",
    hr: "Harvard Revised Catalog",
    gl: "Gliese Catalog",
    bf: "Bayer / Flamsteed Designation",
  };

  const showValue = (value, catalogName) => {
    if (value !== null && value !== "") {
      return `${catalogName}: ${value}`;
    }
    return null;
  };

  const catalogArray = [
    showValue(star.proper, catalogNames.proper),
    showValue(star.hip, catalogNames.hip),
    showValue(star.hd, catalogNames.hd),
    showValue(star.hr, catalogNames.hr),
    showValue(star.gl, catalogNames.gl),
    showValue(star.bf, catalogNames.bf),
  ];

  const validCatalog = catalogArray.find((value) => value !== null);

  return (
    <div className="fw-bold">
      {validCatalog ? (
        <a href={`/star/${star._id}`} className="link-no-underline">
          {validCatalog}
        </a>
      ) : (
        "No catalog number available"
      )}
    </div>
  );
};
export default StarName;
