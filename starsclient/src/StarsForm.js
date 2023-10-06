import React from "react";
import {AvForm, AvField, AvInput, AvGroup} from "availity-reactstrap-validation";

const StarsForm = () => {
    return (
        <>
            <h3 className="mb-3">Añadir una nueva estrella</h3>

            <AvForm>
                <AvGroup className="mb-3">
                    <AvField name="proper" label="Nombre común de la estrella" type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="ra" label="Ascensión recta y declinación de la estrella, para la época y el equinoccio 2000.0." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3"> 
                    <AvField name="dec" label="Declinación de la estrella, para la época y el equinoccio 2000.0." type="number" required/>
                </AvGroup>

            </AvForm>
        </>
    );
}

export default StarsForm;