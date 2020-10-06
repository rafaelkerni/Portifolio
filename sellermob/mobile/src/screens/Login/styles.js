import commonStyles from '../../commonStyles'
import { StyleSheet } from "react-native";

export default function stylesLogin(entrarCadastrar){
    return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: commonStyles.colors.secondary,
    },
    stack: {
      flex: 1,
      flexDirection: "column"
    },
    input: {
      color: commonStyles.colors.white,
    },
    rect: {
      top: 0,
      left: 0,
      height: 205,
      backgroundColor: commonStyles.colors.primary,
      position: "absolute",
      right: 0,
    },
    image: {
        width: 200,
        height: 73,
        alignSelf: "center",
        marginTop: 39,
    },
    rect2: {
        borderRadius: 15,
        top: 116,
        width: 355,
        height: '53%',
        backgroundColor: commonStyles.colors.third,
        alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      color: entrarCadastrar ? commonStyles.colors.primary : "#000",
      fontSize: 16,
      fontFamily: "Roboto-Medium",
    },
    touchText:{
        marginLeft: 0,
        marginTop: 0
    },
    text2: {
      color: !entrarCadastrar ? commonStyles.colors.primary : "#000",
      fontSize: 16,
      fontFamily: "Roboto-Medium",
    },
    touchText2:{
        marginLeft: 182,
        marginTop: 0
    },
    text3: {
      color: "#121212",
      fontSize: 16,
      fontFamily: "Roboto-Medium",
      alignSelf: "center",
      marginTop: 34
    },
    text5: {
      color: commonStyles.colors.third,
      fontSize: 12,
      fontFamily: "Roboto-Medium",
      alignSelf: "center",
      marginTop: 18
    },
    item: {
      flex: 1,
      maxHeight: 30,
      alignItems: "stretch",
      marginTop: 15,
      marginLeft: 22,
      marginRight: 22,     
    },
    text4: {
      alignSelf: "flex-end",
      marginTop: 10,
      marginRight: 15,
      color: commonStyles.colors.primary,
      fontSize: 13,
      fontFamily: "Roboto-Medium",
    },
    touchText4: {
        marginTop: 20,
        alignSelf: "center"
    },
    text6: {
        color: "#FFF",
        fontSize: 11,
        fontFamily: "Roboto-Medium",
        textAlign: "center",
        alignSelf: "center",
        marginLeft: 0,
        marginTop: 0
    },
    text7: {
      color: commonStyles.colors.third,
      fontSize: 12,
      alignSelf: "center",
    },
    button: {
      maxHeight: 30,
      marginTop: 20,
      marginLeft: 22,
      marginRight: 22,
      justifyContent: 'center',
      backgroundColor: commonStyles.colors.primary,
      borderRadius: 10,
      },
    buttonText: {
        color: commonStyles.colors.white,
        fontFamily: "Roboto-Medium",
    },
    rect6: {
        alignSelf: "flex-end",
        width: 305,
        height: 101,
        backgroundColor: commonStyles.colors.primary,
        borderRadius: 15,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    rect7: {
      flex: 1,
      width: 60,
      height: 31,
      backgroundColor: "#3B5998",
      borderRadius: 10,
      marginLeft: 0,
      marginTop: 0,
      justifyContent: "center",
      alignItems: "center"
    },
    rect8: {
      flex: 1,
      width: 60,
      height: 31,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      marginLeft: 25,
      marginTop: 0,
      justifyContent: "center",
      alignItems: "center"
    },
    rect9: {
      flex: 1,
      width: 60,
      height: 31,
      backgroundColor: "#1DA1F2",
      borderRadius: 10,
      marginLeft: 25,
      marginTop: 0,
      justifyContent: "center",
      alignItems: "center"
    },
    icone:{
      height: 22,
      width: 22
    }
  })
};