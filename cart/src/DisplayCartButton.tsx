import React from "react";
import {IonFab, IonFabButton, IonIcon} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import {cart} from "ionicons/icons";


interface DisplayCartProps extends RouteComponentProps {
    onClick: () => void;
}

const DisplayCartButton: React.FC<DisplayCartProps> = ({onClick}) => {
    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={onClick}>
                <IonIcon icon={cart}/>
            </IonFabButton>
        </IonFab>
    );
}
export default DisplayCartButton;
