import firebase  from 'firebase/app'
import * as Sentry from '@sentry/browser';

export default function(setUsuario, getCartoes) {
    const uid = localStorage.getItem("id_token")
    firebase.database().ref(`/usuarios/${uid}/info`)
    .on("value", function(snapshot) {
        setUsuario(snapshot.val())
    }, function (errorObject) {
        if(errorObject){
            Sentry.captureException(errorObject);
        } 
    })
}