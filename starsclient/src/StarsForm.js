import React, { useRef } from "react";
import { AvForm, AvField, AvInput, AvGroup } from "availity-reactstrap-validation";
import { Button, Label } from "reactstrap";

const StarsForm = ({ createStar }) => {

    const formRef = useRef(null);

    const _createStar = (values) => {
        const { hip, hd, hr, gl, bf } = values;

        // Verificar si al menos uno de los campos está lleno
        if (hip || hd || hr || gl || bf) {
            createStar(values);
            formRef.current && formRef.current.reset();
        } else {
            alert("At least one of the fields (hip, hd, hr, gl or bf) must be full.");
        }
    };

    return (
        <>
            <h3 className="mb-3">Add a new Star</h3>

            <AvForm ref={formRef} onValidSubmit={(_, values) => _createStar(values)}>
                <AvGroup className="mb-3">
                    <AvField name="hip" label="The star's ID in the Hipparcos catalog." type="number" optional
                    placeholder="hip"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="hd" label="The star's ID in the Henry Draper catalog." type="number" optional
                    placeholder="hd"
                    />
                </AvGroup>

                <AvGroup className="mb-3"> 
                    <AvField name="hr" label="The star's ID in the Harvard Revised catalog, which is the same as its number in the Yale Bright Star Catalog." type="number" optional
                    placeholder="hr"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="gl" label="The star's ID in the third edition of the Gliese Catalog of Nearby Stars." type="text" optional
                    placeholder="gl"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="bf" label="The Bayer / Flamsteed designation, primarily from the Fifth Edition of the Yale Bright Star Catalog." type="text" optional
                    placeholder="bf"
                    />
                </AvGroup>

                <AvGroup className="mb-3">  
                    <AvField name="proper" label="The star's common name." type="text" optional
                    placeholder="proper"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="ra" label="Right ascension for epoch and equinox 2000.0." type="number" optional
                    placeholder="ra"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="dec" label="Declination for epoch and equinox 2000.0." type="number" optional
                    placeholder="dec"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="dist" label="The star's distance in parsecs." type="number" optional
                    placeholder="dist"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmra" label="The star's proper motion in right ascension." type="number" optional
                    placeholder="pmra"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmdec" label="The star's proper motion in declination." type="number" optional
                    placeholder="pmdec"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="rv" label="The star's radial velocity in km/sec." type="number" optional
                    placeholder="rv"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="mag" label="The star's apparent visual magnitude." type="number" optional
                    placeholder="mag"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="absmag" label="The star's absolute visual magnitude (its apparent magnitude from a distance of 10 parsecs)." type="number" optional
                    placeholder="absmag"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="spect" label="The star's spectral type, if known." type="text" optional
                    placeholder="spect"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="ci" label="The star's color index (blue magnitude - visual magnitude), where known." type="number" optional
                    placeholder="ci"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="x" label="The star's calculated x-position in the projection of the constellations on the celestial sphere." type="number" optional
                    placeholder="x"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="y" label="The star's calculated y-position in the projection of the constellations on the celestial sphere." type="number" optional
                    placeholder="y"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="z" label="The star's calculated z-position in the projection of the constellations on the celestial sphere." type="number" optional
                    placeholder="z"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="vx" label="The star's calculated x-velocity in the projection of the constellations on the celestial sphere." type="number" optional
                    placeholder="vx"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="vy" label="The star's calculated y-velocity in the projection of the constellations on the celestial sphere." type="number" optional
                    placeholder="vy"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="vz" label="The star's calculated z-velocity in the projection of the constellations on the celestial sphere." type="number" optional
                    placeholder="vz"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="rarad" label="The star's right ascension in radians." type="number" optional
                    placeholder="rarad"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="decrad" label="The star's declination in radians." type="number" optional
                    placeholder="decrad"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmrarad" label="The star's proper motion in right ascension in radians per year." type="number" optional
                    placeholder="pmrarad"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmdecrad" label="The star's proper motion in declination in radians per year." type="number" optional
                    placeholder="pmdecrad"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="bayer" label="The Bayer designation." type="text" optional
                    placeholder="bayer"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="flam" label="The Flamsteed number." type="number" optional
                    placeholder="flam"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="con" label="The standard constellation abbreviation." type="text" optional
                    placeholder="con"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="comp" label="Component identifier (if a multiple star)." type="text" optional
                    placeholder="comp"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="comp_primary" label="Identifies the primary component." type="text" optional
                    placeholder="comp_primary"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="base" label="The reference for the spectral type and luminosity class." type="text" optional
                    placeholder="base"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="lum" label="The star's luminosity class." type="text" optional
                    placeholder="lum"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="var" label="The star's standard variable star designation, when known." type="text" optional
                    placeholder="var"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="var_min" label="The star's minimum magnitude, when known." type="number" optional
                    placeholder="var_min"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="var_max" label="The star's maximum magnitude, when known." type="number" optional
                    placeholder="var_max"
                    />
                </AvGroup>


                <div className="text-center mb-3" >
                    <Button className="mb-3"color="primary">Add Star</Button>
                </div>    

            </AvForm>
        </>
    );
}

export default StarsForm;