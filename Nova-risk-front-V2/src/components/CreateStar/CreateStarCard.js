import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import Card from "react-bootstrap/Card";


const CreateStarCard = ({ createStar }) => {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm({
    mode: "onBlur", // Add this if not already defined
    shouldFocusError: true, // Add this if not already defined
  });

  const _createStar = (values) => {
    // Validar y procesar los valores del formulario aquí
    console.log("Form values:", values);
    createStar(values);
  };

  const inputFields = [
    { name: "hip", label: "The star's ID in the Hipparcos catalog.", type: "number", placeholder: "hip" },
    { name: "hd", label: "The star's ID in the Henry Draper catalog.", type: "number", placeholder: "hd" },
    { name: "hr", label: "The star's ID in the Harvard Revised catalog, which is the same as its number in the Yale Bright Star Catalog.", type: "number", placeholder: "hr" },
    { name: "gl", label: "The star's ID in the third edition of the Gliese Catalog of Nearby Stars.", type: "text", placeholder: "gl" },
    { name: "bf", label: "The Bayer / Flamsteed designation, primarily from the Fifth Edition of the Yale Bright Star Catalog.", type: "text", placeholder: "bf" },
    { name: "proper", label: "The star's common name.", type: "text", placeholder: "proper" },
    { name: "ra", label: "Right ascension for epoch and equinox 2000.0.", type: "number", placeholder: "ra" },
    { name: "dec", label: "Declination for epoch and equinox 2000.0.", type: "number", placeholder: "dec" },
    { name: "dist", label: "The star's distance in parsecs.", type: "number", placeholder: "dist" },
    { name: "pmra", label: "The star's proper motion in right ascension.", type: "number", placeholder: "pmra" },
    { name: "pmdec", label: "The star's proper motion in declination.", type: "number", placeholder: "pmdec" },
    { name: "rv", label: "The star's radial velocity in km/sec.", type: "number", placeholder: "rv" },
    { name: "mag", label: "The star's apparent visual magnitude.", type: "number", placeholder: "mag" },
    { name: "absmag", label: "The star's absolute visual magnitude (its apparent magnitude from a distance of 10 parsecs).", type: "number", placeholder: "absmag" },
    { name: "spect", label: "The star's spectral type, if known.", type: "text", placeholder: "spect" },
    { name: "ci", label: "The star's color index (blue magnitude - visual magnitude), where known.", type: "number", placeholder: "ci" },
    { name: "x", label: "The star's cartesian x-coordinate in a system based on the equatorial coordinates as seen from Earth.", type: "number", placeholder: "x" },
    { name: "y", label: "The star's cartesian y-coordinate in a system based on the equatorial coordinates as seen from Earth.", type: "number", placeholder: "y" },
    { name: "z", label: "The star's cartesian z-coordinate in a system based on the equatorial coordinates as seen from Earth.", type: "number", placeholder: "z" },
    { name: "vx", label: "The star's cartesian x-velocity in a system based on the equatorial coordinates as seen from Earth.", type: "number", placeholder: "vx" },
    { name: "vy", label: "The star's cartesian y-velocity in a system based on the equatorial coordinates as seen from Earth.", type: "number", placeholder: "vy" },
    { name: "vz", label: "The star's cartesian z-velocity in a system based on the equatorial coordinates as seen from Earth.", type: "number", placeholder: "vz" },
    { name: "rarad", label: "The star's right ascension in radians.", type: "number", placeholder: "rarad" },
    { name: "decrad", label: "The star's declination in radians.", type: "number", placeholder: "decrad" },
    { name: "pmrarad", label: "The star's proper motion in right ascension in radians per year.", type: "number", placeholder: "pmrarad" },
    { name: "pmdecrad", label: "The star's proper motion in declination in radians per year.", type: "number", placeholder: "pmdecrad" },
    { name: "bayer", label: "The Bayer designation.", type: "text", placeholder: "bayer" },
    { name: "flam", label: "The Flamsteed designation.", type: "text", placeholder: "flam" },
    { name: "con", label: "The standard constellation abbreviation.", type: "text", placeholder: "con" },
    { name: "comp", label: "The components of a multiple star system.", type: "text", placeholder: "comp" },
    { name: "comp_primary", label: "Identifies a star in a multiple star system.", type: "text", placeholder: "comp_primary" },
    { name: "base", label: "The reference for the star's astrometric or photometric data.", type: "text", placeholder: "base" },
    { name: "lum", label: "The star's luminosity as a multiple of that of the Sun.", type: "number", placeholder: "lum" },
    { name: "var", label: "The star's standard variable star designation, when known.", type: "text", placeholder: "var" },
    { name: "var_min", label: "The star's approximate magnitude range, for variables.", type: "number", placeholder: "var_min" },
    { name: "var_max", label: "The star's approximate magnitude range, for variables.", type: "number", placeholder: "var_max"
    }
  ];

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <form onSubmit={handleSubmit(_createStar)}>
            {inputFields.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
                <input
                  {...register(field.name, { required: field.required })}
                  type={field.type}
                  className={`form-control ${errors[field.name] ? 'is-invalid' : ''} custom-input`}
                  id={field.name}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="text-center mb-3">
              <Button className="mb-3" color="primary" type="submit" disabled={!isValid}>
                Add Star
              </Button>
            </div>
          </form>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default CreateStarCard;


