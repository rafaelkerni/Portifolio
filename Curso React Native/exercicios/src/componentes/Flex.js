import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },
    norte:{
        flex: 1,
        backgroundColor: '#dbf9ed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centro:{
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#66ffcc',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    sul:{
        flex: 1,
        backgroundColor: '#ffff99',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circulo:{
        width: 100,
        height:100,
        backgroundColor: '#f47f61',
        borderRadius: 50,
    }
})

const Circulo = props => <View style={styles.circulo}></View>

export default props =>{
    return(
        <View style={styles.container}>
            <View style={styles.norte}>
                <Circulo />
            </View>
            <View style={styles.centro}>
                <Circulo />
                <Circulo />
                <Circulo />
            </View>
            <View style={styles.sul}>
                <Circulo />
            </View>
        </View>
    )
}