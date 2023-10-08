import React from "react";
import {AvForm, AvField, AvInput, AvGroup} from "availity-reactstrap-validation";
import reactstrap, { Button } from "reactstrap";

const StarsForm = () => {
    return (
        <>
            <h3 className="mb-3">Add a new Star</h3>

            <AvForm>
                <AvGroup className="mb-3">
                    <AvField name="hip" label="The star's ID in the Hipparcos catalog." type="number" required
                    placeholder="hip"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="hd" label="The star's ID in the Henry Draper catalog." type="number" required
                    placeholder="hd"
                    />
                </AvGroup>

                <AvGroup className="mb-3"> 
                    <AvField name="hr" label="The star's ID in the Harvard Revised catalog, which is the same as its number in the Yale Bright Star Catalog." type="number" required
                    placeholder="hr"
                    />
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="gl" label="The star's ID in the third edition of the Gliese Catalog of Nearby Stars." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="bf" label="The Bayer / Flamsteed designation, primarily from the Fifth Edition of the Yale Bright Star Catalog." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">  
                    <AvField name="proper" label="The star's common name." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="ra" label="Right ascension for epoch and equinox 2000.0." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="dec" label="Declination for epoch and equinox 2000.0." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="dist" label="The star's distance in parsecs." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmra" label="The star's proper motion in right ascension." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmdec" label="The star's proper motion in declination." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="rv" label="The star's radial velocity in km/sec." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="mag" label="The star's apparent visual magnitude." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="absmag" label="The star's absolute visual magnitude (its apparent magnitude from a distance of 10 parsecs)." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="spect" label="The star's spectral type, if known." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="ci" label="The star's color index (blue magnitude - visual magnitude), where known." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="x" label="The star's calculated x-position in the projection of the constellations on the celestial sphere." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="y" label="The star's calculated y-position in the projection of the constellations on the celestial sphere." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="z" label="The star's calculated z-position in the projection of the constellations on the celestial sphere." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="vx" label="The star's calculated x-velocity in the projection of the constellations on the celestial sphere." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="vy" label="The star's calculated y-velocity in the projection of the constellations on the celestial sphere." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="vz" label="The star's calculated z-velocity in the projection of the constellations on the celestial sphere." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="rarad" label="The star's right ascension in radians." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="decrad" label="The star's declination in radians." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmrarad" label="The star's proper motion in right ascension in radians per year." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="pmdecrad" label="The star's proper motion in declination in radians per year." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="bayer" label="The Bayer designation." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="flam" label="The Flamsteed number." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="con" label="The standard constellation abbreviation." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="comp" label="Component identifier (if a multiple star)." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="comp_primary" label="Identifies the primary component." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="base" label="The reference for the spectral type and luminosity class." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="lum" label="The star's luminosity class." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="var" label="The star's standard variable star designation, when known." type="text" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="var_min" label="The star's minimum magnitude, when known." type="number" required/>
                </AvGroup>

                <AvGroup className="mb-3">
                    <AvField name="var_max" label="The star's maximum magnitude, when known." type="number" required/>
                </AvGroup>


                <div className="text-end">
                    <Button color="primary">Add Star</Button>
                </div>    

            </AvForm>
        </>
    );
}

export default StarsForm;