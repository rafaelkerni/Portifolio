import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";
import { Root, Button, Item, Input, Toast, Label } from "native-base";
import stylesLogin from "./styles";
import { withNavigation } from 'react-navigation';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import commonStyles from '../../commonStyles'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


function Login(props) {
  const [entrarCadastrar, setEntrarCadastrar] = useState(true);
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState("catalogo@c.com.br");
  const [senha, setSenha] = useState("c123");
  const [login, setLogin] = useState("");
  const styles = stylesLogin(entrarCadastrar);

const FloatingLabel = (nome, pValue, pOnChange, senha) => <Item floatingLabel style={{ marginTop: 20, marginLeft: 10, marginRight: 10, fontSize: 14 }} >
    <Label style={{ top: -5, left: 10 }} >{nome}</Label>
    <Input style={{ height: 45, fontSize: 14, paddingLeft: 10, }} 
           secureTextEntry={senha} value={pValue} onChangeText={e => pOnChange(e)}/>
</Item>

async function guardarDados(result) {
  axios.defaults.headers.common['Authorization'] = `bearer ${result.data.token}`
  await AsyncStorage.setItem('userData', JSON.stringify(result.data))
  await AsyncStorage.setItem('userToken', `${result.data.token}`)
  setEmail('');
  setSenha('')
  setLogin('')
  props.navigation.navigate('Home')
}

  function processar(){
    if(entrarCadastrar){
        axios.post('/signin', { email, senha })
        .then(result => {
          guardarDados(result)
        }).catch((err) => {
          console.tron.log(err)
          Toast.show({
            text: !err.response ? "Ocorreu um erro ao autenticar!" : err.response.data,
            buttonText: "OK",
            duration: 10000,
            buttonStyle: { backgroundColor: commonStyles.colors.primary }
          })
        })
    }
  }

  return (
    <View style={styles.container}>
      <Spinner
          visible={spinner}
          textContent={'Carregando...'}
          textStyle={{ color: '#FFF' }}
        />
      <View style={styles.stack}>
        <View style={styles.rect}>
          <Image
            source={require("../../assets/images/catalog.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.rect2}>
          <View
            style={[
              styles.row,
              {
                marginTop: 46,
                marginLeft: 63,
                marginRight: 64,
                height: 20,
              }
            ]}
          >

          </View>
          
              <Text style={styles.text3}>{!entrarCadastrar ? "Crie sua Conta!" : esqueceuSenha ? "Redefinir Senha" : "Bem Vindo de Volta!"}</Text>
              {esqueceuSenha ? (
                <Text style={styles.text6}>
                Informe seu e-mail para receber um e-mail{"\n"} com instruções
                para redefinir sua senha
              </Text>
                
              ) : false }
              <>
              {!entrarCadastrar ? (
                FloatingLabel("Login", login, setLogin, false)
              ): false}
                {FloatingLabel("E-mail", email, setEmail, false)}
              {!esqueceuSenha ?  
              FloatingLabel("Senha", senha, setSenha, true) : false}
              {entrarCadastrar ? 
                <TouchableWithoutFeedback onPress={()=>setEsqueceuSenha(!esqueceuSenha)} style={styles.touchText4}>
                  <Text style={styles.text4}> {esqueceuSenha ? "Entrar na minha Conta"  : "Esqueceu sua Senha?" }</Text>
                </TouchableWithoutFeedback>
               : 
                false
              }
              <Button onPress={() => processar()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{entrarCadastrar ? (esqueceuSenha ? "ENVIAR" : "ENTRAR") : "ENVIAR" }</Text>
              </Button>
            </>
        </View>
      </View>
    </View>
  );
}

export default withNavigation(Login);
