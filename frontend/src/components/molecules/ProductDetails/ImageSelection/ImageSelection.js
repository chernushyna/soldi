import React, { useEffect, useState } from "react";
import { convertImageBinaryData } from "../../../../helpers/helper";
import Pagination from "../Pagination/Pagination";
import "./ImageSelection.css";

const ImageSelection = ({ imageBinaryData }) => {
    const [imageDataUrl, setImageDataUrl] = useState(null);
    const [selectedMainImageIndex, setSelectedMainImageIndex] = useState(0);

    const loadImageData = async () => {
        if (!imageBinaryData || imageBinaryData.length === 0) {
            return;
        }
        const dataUrls = await convertImageBinaryData(imageBinaryData);
        setImageDataUrl(dataUrls);
    };

    useEffect(() => {
        loadImageData();
    }, [imageBinaryData]);

    const handleSmallImageClick = (index) => {
        setSelectedMainImageIndex(index);
    };

    const totalImages = imageDataUrl ? imageDataUrl.length : 0;
    const currentImageIndex = selectedMainImageIndex + 1;

    const handlePrevClick = () => {
        setSelectedMainImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNextClick = () => {
        setSelectedMainImageIndex((prevIndex) => (prevIndex < totalImages - 1 ? prevIndex + 1 : prevIndex));
    };

    return (
        <div className="image-selection-container">
            <div className="small-images">
                {imageDataUrl &&
                    imageDataUrl.map((obj, index) => (
                        <img
                            key={index}
                            src={obj}
                            alt={`Small ${index + 1}`}
                            onClick={() => handleSmallImageClick(index)}
                            className={index === selectedMainImageIndex ? 'selected' : ''}
                        />
                    ))}
            </div>
            <div className="main-image">
                {imageDataUrl &&
                    <img
                        className={`main-image-select`}
                        src={imageDataUrl[selectedMainImageIndex]}
                        alt="Main"
                    />}
                <div className={`image-selection-pagination`}>
                    <Pagination
                        currentImageIndex={currentImageIndex}
                        totalImages={totalImages}
                        onPrevClick={handlePrevClick}
                        onNextClick={handleNextClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageSelection;
