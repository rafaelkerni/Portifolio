import React, { useEffect } from 'react'
import { StyleSheet, Image, View, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import axios from 'axios'
import SplashScreen from 'react-native-splash-screen'

function Splash(props){

    validarUsuario = async () =>{  
        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || {};

        if(userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            props.navigation.navigate('Home')
        }else{
            props.navigation.navigate('Login')
        }
        
    }

    useEffect(() =>{
        SplashScreen.hide();
        setTimeout(() => validarUsuario(), 5)
    }, [])
    
    return <View></View>;
}

export default withNavigation(Splash);