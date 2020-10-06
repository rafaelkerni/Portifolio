import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView, View, Text, StyleSheet, Linking, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { DrawerActions } from 'react-navigation-drawer'; 
import AsyncStorage from "@react-native-community/async-storage";
import "moment/locale/pt-br";
import  { Root, Toast } from 'native-base';

import commonStyles from "../commonStyles";

import Modal from "../components/Modal";
import MenuItem from "../components/Menu/MenuItem";
import MenuHeader from "../components/Menu/MenuHeader";
import integracao from '../config/integracao'

  function Menu(props) {
  const dispatch = useDispatch();
  const modalSair = useRef();

  return (
  <Root>
    <ScrollView style={styles.scroll}>
       {/* <Image source={imagens.fechar} style={{ marginLeft: 20, marginBottom: 10, height: 25, width: 25 }} onClick={() =>  props.navigation.dispatch(DrawerActions.toggleDrawer())} /> */}
       {/* <MaterialCommunityIconsIcon name='close' size={35} color={commonStyles.colors.primary} style={{ marginLeft: 5 }} onPress={() =>  props.navigation.dispatch(DrawerActions.toggleDrawer())} /> */}
      <View style={styles.container}>
        <MenuHeader nome="Convidado" />
      </View>
      <MenuItem
        icone={"home"}
        titulo="Início"
        onPress={() => props.navigation.navigate("Home")}
      />
      <MenuItem
        icone={"magnify"}
        titulo="Buscar"
        onPress={() => props.navigation.navigate("Pesquisa")}
      />

      <MenuItem
        icone={"magnify"}
        titulo="Integrar"
        onPress={() => integracao()}
      />
     
      <View style={styles.separador}/>
      <MenuItem
        icone={"star"}
        titulo="Avalie-nos"
        onPress={() => Toast.show({
          text: 'Em Breve!',
          duration: 3000
        })}
      /> 
      <View style={styles.separador}/> 
      <MenuItem
        icone={"key-variant"}
        titulo="Alterar Senha"
        onPress={() => props.navigation.navigate("AlterarSenha")}
      />
      <MenuItem
        icone={"exit-to-app"}
        titulo="Sair"
        onPress={() => modalSair.current.toggleModal()}
      />
      <Modal
        ref={modalSair}
        icone="exit-to-app"
        titulo="Sair"
        tamanho={125}
        sim={() => {
          modalSair.current.toggleModal();
          AsyncStorage.removeItem("userData");
          props.navigation.navigate("Login");
        }}
        nao={() => modalSair.current.toggleModal()}
        texto="Deseja sair da sua conta?"
      />
    </ScrollView>
  </Root>    
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: commonStyles.colors.white,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginLeft: 15,
    backgroundColor: commonStyles.colors.white
  },
  separador: {
    borderColor:  commonStyles.colors.primary,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 5,
    marginLeft: 25,
    marginRight: 25
  }
});

export default withNavigation(Menu);
