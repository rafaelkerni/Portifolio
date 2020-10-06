import commonStyles from '../../commonStyles'
import { StyleSheet, Platform } from "react-native";
import  { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default function stylesMeusAnuncios(){
    return StyleSheet.create({
        container:{
            flex: 1,
            flexDirection: "column"
        },
        scrollArea: {
            flex: 1,
            backgroundColor: commonStyles.colors.third,
        },
        scrollContainer:{      
            alignItems: "center",
            justifyContent: "center"
        }
    });
}