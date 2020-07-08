import { Alert, Plataform } from 'react-native'

/* const server = Plataform.OS === 'ios' ? 
    'http://localhost:3000' : 'http://10.0.2.2:3000' */

const server = 'http://10.0.2.2:3000'    

function showError(err){
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem': ${err}`)
}  

export { server, showError }