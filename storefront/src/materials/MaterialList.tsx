import {RouteComponentProps} from "react-router";
import React, {useContext} from "react";
import {
    IonCard, IonCardContent, IonCardHeader,
    IonContent,
    IonHeader,
    IonList,
    IonLoading,
    IonPage,
    IonTitle
} from "@ionic/react";
import {MaterialsContext} from "./MaterialsProvider";
import DisplayCartButton from 'cart/DisplayCartButton';
const MaterialList: React.FC<RouteComponentProps> = ({ history }) => {

    const { materials, fetching } = useContext(MaterialsContext);

    console.log(materials)
    return (
      <IonPage>
          <IonHeader>
              <IonTitle>MaterialList</IonTitle>
          </IonHeader>
          <IonContent>
              <IonLoading isOpen={fetching} message="Fetching items"/>
              {materials && (
                  <IonList>
                      {materials.map(({ materialId, name, shortDescription}) =>
                          <IonCard key={materialId} onClick={() => (history.push(`/materials/${materialId}`))}>
                              <IonCardHeader>
                                  {name}
                              </IonCardHeader>
                              <IonCardContent>
                                  {shortDescription}
                              </IonCardContent>
                          </IonCard>)}
                  </IonList>
              )}
              <React.Suspense fallback="Loading Button">
                  {<DisplayCartButton onClick={() =>  history.push('/cart')}/>}
              </React.Suspense>
          </IonContent>
      </IonPage>
    );
}
export default MaterialList;
