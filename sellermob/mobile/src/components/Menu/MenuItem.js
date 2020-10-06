import React, { Component } from 'react';
import { Text,  StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import commonStyles from '../../commonStyles'

class MenuItem extends Component {
    render () {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback style={styles.content} onPress={this.props.onPress} >
                        <View style={styles.content}>
                        <MaterialCommunityIconsIcon name={this.props.icone} size={30} color={commonStyles.colors.primary} style={{ marginLeft: 5 }} onPress={() =>  props.navigation.dispatch(DrawerActions.toggleDrawer())} />
                        <Text style={styles.titulo}>
                            {this.props.titulo} 
                        </Text>
                        </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    icone: {
        marginLeft: 15,
        width: 26,
        height: 25,
    },
    titulo: {
        marginLeft: 20,
        fontSize: 16,
        color: commonStyles.colors.primary
    },
}) 


const mapStateToProps = state => {
    return {
        selecionado: state.menu.selecionado,
    }
}

export default connect(mapStateToProps)(withNavigation(MenuItem))