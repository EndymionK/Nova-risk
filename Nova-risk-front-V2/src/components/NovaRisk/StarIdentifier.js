const StarIdentifier = ({ star }) => {
  const catalogNames = {
    hip: "Hip",
    hd: "HD",
    hr: "HR",
    bf: "BF",
    gl: "",
    proper: "",
  };

  const showValue = (value, catalogName) => {
    if (value !== null && value !== "") {
      return `${catalogName} ${value}`;
    }
    return null;
  };

  const catalogArray = [
    showValue(star.proper, catalogNames.proper ),
    showValue(star.hip, catalogNames.hip),
    showValue(star.hd, catalogNames.hd),
    showValue(star.hr, catalogNames.hr),
    showValue(star.gl, catalogNames.gl),
    showValue(star.bf, catalogNames.bf),
  ];

  const validCatalog = catalogArray.find((value) => value !== null);

  return (
    validCatalog    
  );
};

export default StarIdentifier;
