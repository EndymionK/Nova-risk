import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const StarsList = ({ stars }) => {
    return (
        <>
            <h3 className= "mb-3"> My stars list  </h3>

            {
                stars.map(star=>
                    <div className="mb-3 border rounded p-3" key={star.id}>
                        <div className="d-flex justify-content-between mb-1">
                            <div className="fw-bold">{star.p_supernova}</div>
                            <div className="text-muted small">                               
                                <FontAwesomeIcon icon={faEdit} className="cursor-pointer"/>
                                <FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2"/>

                            </div>

                        </div>

                    </div>
                    )
            }
        </>
    )
}

export default StarsList;