import {RouteComponentProps} from "react-router";
import React, {useContext, useEffect, useState} from "react";
import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel,
    IonPage, IonTextarea, IonTitle, IonToolbar, useIonToast
} from "@ionic/react";
import {MaterialsContext} from "./MaterialsProvider";
import {MaterialProps} from "./MaterialProps";
import {getLogger} from "../core";
import AddToCartButton from "cart/AddToCartButton";
import {arrowBackCircleOutline} from "ionicons/icons";


const log = getLogger('MaterialPDP');
interface MaterialPDPProps extends RouteComponentProps<{
    code?: string;
}> {}

const MaterialPDP: React.FC<MaterialPDPProps> = ({ history, match }) => {

    const [material, setMaterial] = useState<MaterialProps>();
    const { materials, cartId } = useContext(MaterialsContext);
    const [present] = useIonToast()

    useEffect(() => {
        log('effect')
        const materialId = match.params.code || '';
        const mat = materials?.find(material => material.materialId === materialId)
        setMaterial(mat)
    }, [match.params.code, materials, cartId])

    const onClickCallback = () => {
        present({
            message: "Add to cart successfully done!",
            duration:1500,
            position: "bottom",
            color:"success"
        }).then(() => {history.push('/materials')})

    }
    log('render')
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => {history.goBack()}}>
                            <IonIcon onClick={() => {history.goBack()}} slot="start" icon={arrowBackCircleOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Material Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel>{"Name: " + material?.name}</IonLabel>
                <IonTextarea>
                    Description
                </IonTextarea>
                <IonTextarea>{material?.description + "ddsjchdshb"}</IonTextarea>
                <React.Suspense fallback="Loading Button">
                    <AddToCartButton cartId={cartId} materialId={material?.materialId} onClick={onClickCallback}/>
                </React.Suspense>
            </IonContent>
        </IonPage>
    );
}

export default MaterialPDP;
