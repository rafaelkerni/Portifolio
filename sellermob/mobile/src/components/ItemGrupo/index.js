import React from "react";
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from "react-native";
import commonStyles from '../../commonStyles'
import axios from 'axios';

function ItemGrupos(props) {
    return (
            <TouchableWithoutFeedback onPress={() => {console.log(props.item); props.navigation.navigate(props.proximo, { id: props.item.id })}}>
                <View style={styles.itemContainer}>
                    {!props.item.imagem ? false : <Image resizeMode="contain" source={{ uri:`${axios.defaults.baseURL}/static/${props.item.imagem}`}} style={styles.image} />}
                    <Text style={styles.itemName}>{props.item.nome}</Text>
                </View>
            </TouchableWithoutFeedback>
    ) 
}

const styles = StyleSheet.create({
      itemContainer: {
        flex: 1,
        backgroundColor: commonStyles.colors.white,
        borderRadius: 5,
        padding: 10,
        height: 150,
        elevation: 2
      },
      itemName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
        marginTop: 3,
        fontWeight: "bold"
      },
      image:{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: undefined,
        height: 110
      }
})

export default withNavigation(ItemGrupos);