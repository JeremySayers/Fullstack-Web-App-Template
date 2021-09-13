import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React from "react";

const Spinner = () => {
    return (
        <div className="w-100 h-100 d-flex justify-content-center p-5">
            <Loader type="Circles" color="#212529" height = {200} width={200} />
        </div>
    )
}

export default Spinner;