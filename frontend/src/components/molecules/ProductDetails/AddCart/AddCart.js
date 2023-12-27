import React, {useEffect, useState} from "react";
import api from "../../../../helpers/api";
import {useNavigate} from "react-router-dom";
import Button from "../../../atoms/Button/Button";
import {useTranslation} from "react-i18next";

const AddCart = ({ productId, sizeId }) => {
    const [error, setError] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    
    const navigate = useNavigate();
    const { t } = useTranslation();
    const fetchUserDetails = () => {
        api.get('/utility/auth', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setUserDetails(response.data);
                }
            })
            .catch(() => {
                setError(true);
            });
    };

    const handleAddCartItem = () => {
        api.post('/api/cart',
            { productId, userId: userDetails.id, quantity: 1, sizeId },
            { withCredentials: true})
            .then((response) => {
                if(response.status === 200) {
                    console.info("Success");
                }
            }).catch((e) =>{
                console.error(e);
        });
    }
    const handleClick = () => {
        if (error) {
            navigate('/login');
        } else {
            handleAddCartItem();
        }
    };


    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <div>
            <Button
                onClick={ handleClick }
                buttonType={`submit`}
            >
                {t('add_to_cart')}
            </Button>

        </div>
    )
};

export default AddCart;