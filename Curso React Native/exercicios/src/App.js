import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Simples from './componentes/Simples';
import ParImpar from './componentes/ParImpar';
import Inverter, { MegaSena } from './componentes/Multi';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Simples texto='Flexivel!!' />
        <ParImpar numero={2} />
        <Inverter texto='React Nativo!' />
        <MegaSena numeros={6} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
