import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import Card from "react-bootstrap/Card";
import { createStar, updateStar } from "../../Services/Services"; 

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

// Función para calcular la probabilidad nova/supernova
const calcularProbabilidadNovaSupernova = (starData) => {
  const {
    absmag,
    spect,
    rv,
    lum,
  } = starData;

  // Verificar si el valor en la columna "spect" es una cadena de texto
  let clase_principal = 'X';  // Valor por defecto para clase principal
  let subclase = 0;  // Valor por defecto para subclase

  if (typeof spect === 'string') {
    // Obtener la clase principal y la subclase del tipo espectral
    clase_principal = spect[0];  // Primera letra (clase principal)
    
    // Verificar si hay un segundo carácter (subclase) y si es un dígito
    if (spect.length > 1 && !isNaN(spect[1])) {
      subclase = parseInt(spect[1], 10);
    }
  }

  // Calcular la probabilidad hipotética de nova o supernova
  const pesos_clase = { '0': 20, 'B': 15, 'A': 10, 'F': 5, 'G': 2, 'K': 1, 'M': 0.5, 'X': 0.0 };
  const epsilon = 1e-6;  // Valor muy pequeño para evitar división entre cero

  let probabilidad_nova_supernova = (
    (subclase * 0.2) +  // Contribución de la subclase
    (1 / (absmag + epsilon) * 0.2) +  // Contribución de la magnitud absoluta
    (rv * 0.05) +  // Contribución de la velocidad radial
    (lum * 0.1) +  // Contribución de la luminosidad
    (pesos_clase[clase_principal] * 0.3)  // Contribución de la clase principal
  );

  // Escalar la probabilidad a un valor entre 1 y 100
  probabilidad_nova_supernova = Math.max(0, Math.min(100, probabilidad_nova_supernova));

  return probabilidad_nova_supernova;
};

const CreateEditStarCard = ({ starToEdit, onCancelEdit, onEditComplete }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  useEffect(() => {
    if (starToEdit) {
      // Configurar valores para la edición
      inputFields.forEach((field) => {
        setValue(field.name, starToEdit[field.name] || "");
      });
      const psupernova = calcularProbabilidadNovaSupernova(starToEdit);
      setValue("psupernova", psupernova);
    }
  }, [starToEdit, setValue]);

  const onSubmit = (values) => {
    // Validar que al menos uno de los primeros 5 campos no esté vacío
    const firstFiveFields = inputFields.slice(0, 5);
    const atLeastOneNotEmpty = firstFiveFields.some((field) => !!values[field.name]);
    
    if (!atLeastOneNotEmpty) {
      alert("You must complete at least one of the first 5 fields.");
      return;
    }

    if (starToEdit) {
      // Si estamos editando, actualizar la estrella existente
      console.log(starToEdit._id, values);
      updateStar(starToEdit._id, values)
        .then(() => {
          console.log("Star updated");
          onEditComplete();
        })
        .catch((error) => {
          console.error("Error updating star:", error);
        });
    } else {
      // Si no estamos editando, crear una nueva estrella
      createStar(values)
        .then(() => {
          console.log("Star created");
          reset(); // Reiniciar el formulario después de la creación
        })
        .catch((error) => {
          console.error("Error creating star:", error);
        });
    }
  };

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            {inputFields.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
                <input
                  {...register(field.name, {
                    
                  })}
                  type={field.type}
                  className={`form-control ${
                    errors[field.name] ? "is-invalid" : ""
                  } custom-input`}
                  id={field.name}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <div className="invalid-feedback">
                    {errors[field.name].message}
                  </div>
                )}
              </div>
            ))}

            <div className="text-center mb-3">
              <div className="button-container">
                <Button
                  className="add-button"
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                >
                  {starToEdit ? "Update Star" : "Add Star"}
                </Button>
                {starToEdit && (
                  <Button
                    className="cancel-button"
                    color="secondary"
                    onClick={onCancelEdit}
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </div>
          </form>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default CreateEditStarCard;