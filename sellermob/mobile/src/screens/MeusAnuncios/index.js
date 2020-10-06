import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Platform, FlatList } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';
import BarTelas from '../../components/BarTelas'
import stylesMeusAnuncios from './styles'
import commonStyles from '../../commonStyles'
import ItemSimples from '../../components/ItemSimples'
import { Fab, Container, Header, Content,  ActionSheet, Root, Button, Toast } from "native-base";
import Modal from "../../components/Modal";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios'
import store from 'react-native-simple-store';

function MeusAnuncios(props) {
    const [anuncios, setAnuncios] = useState([])
    const [anuncianteID, setAnuncianteID] = useState([])
    const [page, setPage] = useState(1)
    const [veiculo, setVeiculo] = useState([{nome:"Fusca", ano:"1993"}])
    const styles = stylesMeusAnuncios();
    const modalRef = useRef();
  
    useEffect(() =>{
    buscarUserData()
  }, [])

buscarUserData = async () =>{
    let t = await AsyncStorage.getItem('userToken')
    if(t === ""){
      props.navigation.navigate("Login")
    }else{
    
    setToken(t);         
    store.get("userData").then(res => {
      console.tron.log(res)
        if(res){
            setAnuncianteID(res)
            console.tron.log(753)
            console.tron.log(res)
        }
    })
  }
}

  function buscarDados(){   
    if(anuncianteID && page > 0){
      axios.get(`/veiculos?veiculo_anunciante=${anuncianteID}&page=${page}`)
        .then(result => {
            console.tron.log(result)
            setAnuncios(result.data.data)
        }).catch((err) => {
                Toast.show({
                    text: !err.response ? "Ocorreu um erro!" : err.response.data,
                    buttonText: "OK",
                    duration: 10000,
                    buttonStyle: { backgroundColor: commonStyles.colors.primary }
                })
        })
    }
  }
  

  useEffect(() =>{
    console.tron.log(1)
      buscarDados()
  }, [page])

    return (
      <Root>
        <Container style={{ backgroundColor: commonStyles.colors.third }}>
            <BarTelas titulo={`MEUS ANÚNCIOS`} notificacao/>
          <Content >
            <View style={styles.scrollContainer} >
              <FlatList
                contentContainerStyle={styles.scrollContainer}
                data={anuncios}
                renderItem={({ item }) => <ItemSimples mt={15} item={item} onPress={() => ActionSheet.show(
                  {
                    options: ["Visualizar", "Editar", "Excluir", "Cancelar"],
                    cancelButtonIndex: 3,
                    title: "Ações",
                  },
                  buttonIndex => {
                    switch (buttonIndex){
                      case 0:
                        props.navigation.navigate("Detalhe", {id: item})
                        return;
                      case 1:
                        props.navigation.navigate("Anunciar", {id: item})
                        return;
                      case 2:
                        modalRef.current.toggleModal();
                        return;
                      default:
                        return;
                    }
                  })}/>}
                keyExtractor={item => `${item.veiculo_id}`}
                onEndReached={() => setPage(page + 1)}
                //onEndReachedThreshold={0.10}
                removeClippedSubviews={true}
              />
            </View>
          </Content>
          <Fab
              active={false}
              direction="up"
              style={{ backgroundColor: commonStyles.colors.primary }}
              position="bottomRight"
              onPress={() => props.navigation.navigate("Anunciar")}>
                  <MaterialCommunityIconsIcon name="plus" />
            </Fab>  
            <Modal
              ref={modalRef}
              titulo="Confirmação"
              tamanho={135}
              sim={() => {
                  modalRef.current.toggleModal();
              }}
              nao={() => {
                modalRef.current.toggleModal();
              }}
              texto={`Tem certeza que deseja remover o anúncio do veículo ${veiculo.marca_nome} - ${veiculo.modelo_nome}?`}
            />
        </Container>
      </Root>
    ) 
}

export default withNavigation(MeusAnuncios);