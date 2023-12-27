import React from "react";
import "./Pagination.css";

const Pagination = ({ currentImageIndex, totalImages, onPrevClick, onNextClick }) => (
    <div className="pagination">
        <button onClick={onPrevClick}>{"<"}</button>
        <span>{`${currentImageIndex}/${totalImages}`}</span>
        <button onClick={onNextClick}>{">"}</button>
    </div>
);

export default Pagination;
