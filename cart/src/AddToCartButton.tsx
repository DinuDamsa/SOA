import React from "react";
import {IonFab, IonFabButton, IonIcon} from "@ionic/react";
import {addSharp} from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import axios from 'axios';


interface AddToCartProps extends RouteComponentProps {
    onClick: () => void;
    cartId:string;
    materialId:string;
}

const AddToCartButton: React.FC<AddToCartProps> = ({onClick, cartId, materialId}) => {
    const handleAddToCart = () => {
        axios.post(`http://localhost:8000/cart`, {
            cartId,
            materialId,
        }).then(onClick)
    }

    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleAddToCart}>
                <IonIcon icon={addSharp}/>
            </IonFabButton>
        </IonFab>
    );
}
export default AddToCartButton;
