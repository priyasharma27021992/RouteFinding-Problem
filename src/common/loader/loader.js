import React from 'react';
import "./loader.scss";

function Loader({isLoading}) {
    return(
        isLoading &&(
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    )
}

export {Loader};