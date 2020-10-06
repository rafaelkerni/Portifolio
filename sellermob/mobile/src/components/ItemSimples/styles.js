import { Platform, StatusBar, Dimensions } from "react-native";
import commonStyles from '../../commonStyles'
import { StyleSheet } from "react-native";

export default function stylesItemSimples(listaHor, mt){
  let dimensions = Dimensions.get("window");
    return StyleSheet.create({
          rect: {
            top: 0.48,
            left: 0.44,
            minHeight: 150,
            width: 400,
            backgroundColor: "rgba(255,255,255,1)",
            borderRadius: 15,
            marginRight: 10,
            elevation: 5
          },
          rect2: {
            marginTop: 5,
            flexDirection: "row",
            flexWrap: "wrap"
          },
          text: {
            color: "#000",
            fontSize: 12,
            marginRight: 10,
            marginTop: 10,
            marginLeft: 194.44
          },
          textNome: {
            color: "#000",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 10,
            marginRight: 10,
            marginLeft: 194.44
          },
          
          image: {
            top: 0.48,
            left: 0.44,
            width: 184,
            position: "absolute",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            elevation: 5
          },
    })
}