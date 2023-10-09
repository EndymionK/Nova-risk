import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import Card from "react-bootstrap/Card";

function CreateStarCard({ createStar }) {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm();
  

  const _createStar = (values) => {
    // Validar y procesar los valores del formulario aquí
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


