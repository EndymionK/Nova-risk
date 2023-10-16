import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const StarsList = ({ stars, onDelete, onEdit }) => {
    return (
        <>
            <h3 className= "mb-3"> My stars list  </h3>

            {
                stars.map(star=>
                    <div className="mb-3 border rounded p-3" key={star.hip}>
                        <div className="d-flex justify-content-between mb-1">
                            <div className="fw-bold">{star.hip}</div>
                            <div className="text-muted small">                               
                                <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => onEdit(star)} />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer ms-2 trash-icon"
                                     onClick={() => onDelete(star._id)}
                                     style={{ 
                                        color: "initial", 
                                        cursor: "pointer", 
                                        fontSize: "1rem"                                       
                                    }}


                                />

                            </div>

                        </div>

                    </div>
                    )
            }
        </>
    )
}

export default StarsList;