import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Platform } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';
import BarTelas from '../../components/BarTelas'
import stylesMeusAnuncios from './styles'
import commonStyles from '../../commonStyles'
import { Container, Root, Item, Input, Label, Picker, Icon, Button, Toast  } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { APP_TOAST } from '../../store/actions/actionTypes'

const FloatingLabel = (nome, pValue, pOnChange) => <Item floatingLabel style={{ marginTop: 20, marginLeft: 10, marginRight: 10, fontSize: 14 }} >
    <Label style={{ top: -5, left: 10 }} >{nome}</Label>
    <Input style={{ height: 45, fontSize: 14, paddingLeft: 10, }} secureTextEntry={true} value={pValue} onChangeText={e => pOnChange(e)}/>
</Item>

function AlterarSenha(props) {
    const [senha, setSenha] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [repetirNovaSenha, setRepetirNovaSenha] = useState("")
    const [userData, setUserData] = useState([])
    
    buscarDados = async () => {
        // let user = await AsyncStorage.getItem('userData')
        // setUserData(!user ? [] : JSON.parse(user))
        // if(user <= 0){
        //     props.navigation.navigate("Login")
        // }
    }

    useEffect(() =>{
        buscarDados()
    }, [])

    alterar = () => {
        if(!senha || senha === ""){
            Toast.show({
                text: "É necessário informar a Senha Atual!",
                buttonText: "OK",
                duration: 5000,
                buttonStyle: { backgroundColor: commonStyles.colors.primary }
            })
        } else if(!novaSenha || novaSenha === ""){
            Toast.show({
                text: "É necessário informar a Nova Senha!",
                buttonText: "OK",
                duration: 5000,
                buttonStyle: { backgroundColor: commonStyles.colors.primary }
            })
        } else if(novaSenha !== repetirNovaSenha){
            Toast.show({
                text: "A Nova Senha é diferente da Confirmação!",
                buttonText: "OK",
                duration: 5000,
                buttonStyle: { backgroundColor: commonStyles.colors.primary }
            })
        }else{
            axios.post('/alterarSenha', {
                login: userData.login,
                // senhaAntiga: md5(senha),
                // senhaNova: md5(novaSenha),
            })
            .then(result => {
                console.tron.log(result)
                Toast.show({
                        text: result.data,
                        buttonText: "OK",
                        duration: 5000,
                        buttonStyle: { backgroundColor: commonStyles.colors.primary }
                    })
            }).catch((err) => {
                    console.tron.log(err)
                    Toast.show({
                        text: !err.response ? "Ocorreu um erro!" : err.response.data,
                        buttonText: "OK",
                        duration: 10000,
                        buttonStyle: { backgroundColor: commonStyles.colors.primary }
                    })
            })
        }
    }
    
    return (
        <Root>
        <Container>
          <BarTelas titulo="ALTERAR SENHA" />
          <ScrollView style={styles.scrollArea}>
                <View style={styles.scrollContainer} >
                     <View style={styles.paper} >
                        <Text style={styles.titulo}>Senha</Text>
                        {FloatingLabel("Senha Atual", senha, setSenha)}
                        {FloatingLabel("Nova Senha", novaSenha, setNovaSenha)}
                        {FloatingLabel("Confirmar Nova Senha", repetirNovaSenha, setRepetirNovaSenha)}
                    </View>  
                    <Button onPress={() => alterar()} style={styles.button}>
                        <Text style={styles.buttonText}>SALVAR</Text>
                    </Button>    
                </View>
            </ScrollView>
        </Container>
      </Root>
    ) 
}
const styles = StyleSheet.create({
    scrollArea: {
        flex: 1,
        backgroundColor: commonStyles.colors.third,
    },
    scrollContainer:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    titulo:{
        color: commonStyles.colors.primary,
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 15,
        marginTop: 10
    },
    roundedInput:{
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
      },
    paper:{
      margin: 15,
      borderRadius: 15,
      backgroundColor: commonStyles.colors.white,
      paddingBottom: 25
    },
    button: {
        flex: 1,
        maxHeight: 40,
        alignItems: "stretch",
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
        borderRadius: 10,
        },
        buttonText: {
            color: commonStyles.colors.white,
            fontFamily: "Roboto-Medium",
        },
  });

export default withNavigation(AlterarSenha);