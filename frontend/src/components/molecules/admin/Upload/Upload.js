import React, { useState } from 'react';
import api from "../../../../helpers/api";

const ImageUploadButton = ({productId}) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select an image file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log(productId);

            const response = await api.post(`/admin/upload/${productId}`, formData, { withCredentials: true });

            if (response.status === 201) {
                alert(`Image uploaded successfully. Image ID: ${response.data.id}`);
                setSelectedFile(null);
            } else {
                alert(`Failed to upload image. Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Internal server error');
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUploadButton;
