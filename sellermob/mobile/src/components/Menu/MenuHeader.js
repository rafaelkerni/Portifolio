import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Thumbnail } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

import commonStyles from '../../commonStyles'

export default props => {
    const[nome, setNome] = useState("Convidado")
    
    getData = async () => {
        let userData = await AsyncStorage.getItem('userData');
        if(userData){
            userData = JSON.parse(userData);
            setNome(!userData.name ? "Convidado" : userData.name)
        }else{
            setNome("Convidado")
        }
    }

    useEffect(() =>{
        getData()
    })

    return <View style={styles.header}>       
        <View style={styles.userData}>
            <Text style={styles.nome}>
                Olá,
            </Text>
            <Text style={styles.veiculo}>
               {nome}
            </Text>
        </View>
    </View> 
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 10,
        marginBottom: 4,
        marginTop: 15,
        backgroundColor: commonStyles.colors.white
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 15,
        padding: 10,
        backgroundColor: commonStyles.colors.white
    },
    userData: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
    },
    nome: {
        color: commonStyles.colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
    },
    veiculo: {
        color: commonStyles.colors.primary,
        fontSize: 20,
    }, 
}) 