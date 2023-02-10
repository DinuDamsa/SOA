import React, {useEffect, useState} from "react";
import {
    IonButton,IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonList, IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar, useIonToast
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { Preferences  } from '@capacitor/preferences';
import axios from "axios";


interface CartComponentProps extends RouteComponentProps {
}

const CartComponent: React.FC<CartComponentProps> = () => {
    const CART_ID_STORAGE_KEY = 'cartId';

    const [cartId, setCartId] = useState<string>();
    const [cartData, setCartData] = useState<any>();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<any>('');
    const [phoneNumber, setPhoneNumber] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [present] = useIonToast()

    useEffect(() => {
        Preferences.get({key:CART_ID_STORAGE_KEY}).then(({value}) => {
            setCartId(value!)
            axios.get(`http://localhost:8000/cart/${value}`).then((value) => {
                setCartData(value.data)
            })
        })

    }, []);

    const handleSubmitOrder = () => {
        axios.post(`http://localhost:8000/cart/${cartId}`, {
            firstName,
            lastName,
            phoneNumber,
            email
        }).then(async () => {
            // await Preferences.clear();
            await present({
                message: "Order successfully registered!",
                duration: 1500,
                position: "bottom",
                color: "success"
            })
        })
    }


    return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Checkout Page</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent>

              {cartData && cartData.materialsId &&(<>
                  <IonListHeader>The cart contains the following materials</IonListHeader>
                  <IonList>
                      {
                          // @ts-ignore
                          cartData?.materialsId.map((od) =>
                          <IonCardTitle>{od}</IonCardTitle>)
                      }
                  </IonList>
              </>)}
              <IonListHeader>Please enter your data</IonListHeader>
              <IonItem>
                  <IonLabel position="floating">First name</IonLabel>
                  <IonInput onIonChange={ev => setFirstName(ev.detail.value? ev.detail.value:'') }/>
              </IonItem>
              <IonItem>
                  <IonLabel position="floating">Last name</IonLabel>
                  <IonInput onIonChange={ev => setLastName(ev.detail.value? ev.detail.value:'') }/>
              </IonItem>
              <IonItem>
                  <IonLabel position="floating">Phone number</IonLabel>
                  <IonInput onIonChange={ev => setPhoneNumber(ev.detail.value? ev.detail.value:'') }/>
              </IonItem>
              <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput type="email" onIonChange={ev => setEmail(ev.detail.value? ev.detail.value:'') }/>
              </IonItem>
              <IonButton expand="block" onClick={handleSubmitOrder}>Submit order</IonButton>
          </IonContent>
      </IonPage>
);}
export default CartComponent;
