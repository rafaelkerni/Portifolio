import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Platform } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';
import BarTelas from '../../components/BarTelas'
import stylesMeusAnuncios from './styles'
import commonStyles from '../../commonStyles'
import { Container, Root, Item, Input, Label, Picker, Icon, Button  } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";


const FloatingLabel = (nome, pValue, pOnChange) => <Item floatingLabel style={{ marginTop: 20, marginLeft: 10, marginRight: 10, borderBottomColor: '#FFF', fontSize: 14 }} >
    <Label style={{ top: -5, left: 10 }} >{nome}</Label>
    <Input style={{ borderWidth: 1, borderRadius: 15, borderColor: '#ccc', height: 45, fontSize: 14, paddingLeft: 10, }} value={pValue} onChange={e => pOnChange(e.value)}/>
</Item>

function Notificacao(props) { 
    return <View style={[styles.paper, { height: 87, flex: 1, flexDirection: "row" }]} >
        <View style={{ backgroundColor: commonStyles.colors.primary, width: 10, height: 101, borderTopStartRadius: 15, borderBottomStartRadius: 15  }}/>
        <View style={{ flex: 1, flexDirection: "column", left: 15, top: 10 }}>
            <Text style={{ fontSize: 16 }}>4 Novas Mensagens</Text>
            <Text style={{ fontSize: 12 }}>Ola, voce e o primeiro dono do carro? - Rafael</Text>
            <View style={{ flex: 1, flexDirection: "row"}}>
                <Text style={{ fontWeight: "bold", fontSize: 13 }}>Venda</Text>
                <Text style={{ fontSize: 13 }}> - Gol Highline 2014</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 10 }}>Ontem, 14:05</Text>
                <Text style={{ fontSize: 10, fontWeight: "bold", left: -35 }}>PRESSIONE PARA VER</Text>
            </View>    
        </View>
    </View>
}  

function Notificacoes(props) {
    const [notif, setNotif] = useState([1])
   
    buscarDados = async () => {
        let user = await AsyncStorage.getItem('userData')
        setUserData(!user ? [] : JSON.parse(user))
        console.tron.log(user)
        if(userData <= 0){
            props.navigation.navigate("Login")
        }
    }

    useEffect(() =>{
        buscarDados()
    }, [])
    
    return (
        <Root>
        <Container>
          <BarTelas titulo="NOTIFICAÇÕES" back />
          <ScrollView style={styles.scrollArea}>
                <View style={styles.scrollContainer} >
                    {!notif ? false : notif.map(n => <Notificacao key={n+1}/>)}
                    <Button onPress={() => setNotif([])} style={styles.button}>
                        <Text style={styles.buttonText}>REMOVER TUDO</Text>
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
    rect: {
      width: 344,
      height: 201,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 15,
      marginTop: 15,
    },
    button: {
        flex: 1,
        maxHeight: 30,
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

export default withNavigation(Notificacoes);