import React, { useState, useRef, useEffect, PureComponent } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableWithoutFeedback, FlatList, Linking, Share } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';
import BarTelas from '../../components/BarTelas'
import stylesMeusAnuncios from './styles'
import commonStyles from '../../commonStyles'
import { Container, Root, Item, Input, Label, Picker, Icon, Button  } from "native-base";
import MenuItem from "../../components/Menu/MenuItem";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import { APP_TOAST } from '../../store/actions/actionTypes'
import AsyncStorage from "@react-native-community/async-storage";
import { useAsyncStorage } from '@react-native-community/async-storage';
import GallerySwiper from "react-native-gallery-swiper";
import axios from 'axios';
import store from 'react-native-simple-store';
import { Table, Row, Rows } from 'react-native-table-component';
import ItemSimples from '../../components/ItemSimples'
import getRelm from '../../config/realm'

function Detalhe(props) {
    const [produto, setProduto] = useState([]);
    const [imagem, setImagem] = useState([]);
    const [campos, setCampos] = useState([]);
    const [detalhes, setDetalhes] = useState([]);
    const modalRef = useRef();
    

    async function loadProdutos(id) {
      try {
        const realm = await getRelm();
        let dados = realm.objects('produtos');
        dados = dados.filtered(`id = ${id}`);
        console.log(dados[0])
        setProduto(dados[0])

        axios.defaults.headers.common["Authorization"] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.rLf26d52R2oBoTj83hQJMhgKzRCxnmW0n7vhNd42u7A';
        /*axios
          .get(`/produtos/${id}`)
          .then(response => {
            setProduto(response.data.data);
            if(response.data.data.campos){
              let c = JSON.parse(response.data.data.campos).map(item => item.title)
              setCampos(c);
            }else{
              setCampos([]);
            }
            if(response.data.data.detalhes){
              let d = [];
              JSON.parse(response.data.data.detalhes).forEach(dt => {
                let newArray = [];
                JSON.parse(response.data.data.campos).forEach(cp => {
                  if(dt[cp.field]){
                    newArray.push(dt[cp.field]);
                  }else{
                    newArray.push('');
                  }
                })
                if(newArray.length > 0){
                  d.push(newArray);
                }
              })
              setDetalhes(d);
            }else{
              setDetalhes([]);
            }
          })
          .catch(error => console.log("error:" + error));*/
      } catch (err) {
        console.log("error:" + err);
      }
    }

      useEffect(() =>{
        if(produto.campos){
          let c = JSON.parse(produto.campos).map(item => item.title)
          setCampos(c);
        }else{
          setCampos([]);
        }
        if(produto.detalhes){
          let d = [];
          JSON.parse(produto.detalhes).forEach(dt => {
            let newArray = [];
            JSON.parse(produto.campos).forEach(cp => {
              if(dt[cp.field]){
                newArray.push(dt[cp.field]);
              }else{
                newArray.push('');
              }
            })
            if(newArray.length > 0){
              d.push(newArray);
            }
        })
        setDetalhes(d);
      }else{
        setDetalhes([]);
      }
    }, [produto])

      useEffect(() =>{
        loadProdutos(props.navigation.getParam('id', 0));
      }, [])

    return (
        <Root>
        <Container style={styles.container}>
        <BarTelas titulo="Produto" botoes={[{icone: "magnify" , onPress: () => props.navigation.navigate("Pesquisa")}]}/>
           <View style={{ flex: 0.8}}>
            <ScrollView >
              <View >
                <Image source={{ uri:`${axios.defaults.baseURL}/static/${produto.imagem}`}} resizeMode="contain" style={{ height: 400, width: 400, alignSelf:"center", flex: 1}}/>   
                <Text style={styles.textNome}>{produto.codigo} - {produto.nome}</Text>
                <Text style={[styles.text, { flexWrap: "wrap", marginBottom: 20}]}>{produto.descricao}</Text>
                <View style={[styles.paper, {elevation: 5, width: "90%", alignSelf: "center"}]} >
                  <Table >
                      <Row data={campos} style={[styles.row]} textStyle={{ margin: 6, fontWeight: "bold" }}/>
                      { detalhes.map((rowData, indexx) => (
                          <Row
                          key={rowData.id}
                          data={rowData}
                          style={[styles.row, indexx%2 && {backgroundColor: '#eee'}]}
                          textStyle={{ margin: 6 }} />
                      ))}
                    </Table> 
                  </View>
                </View>  
              </ScrollView>
            </View>
            {/* <View style={{ flex: 0.2, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>Mais Produtos</Text>
              <FlatList
                horizontal={true}
                data={cards}
                renderItem={({ item }) => <ItemSimples />}
                key={item => Math.random()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </View> */}
        </Container>
      </Root>
    ) 
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.colors.white,
        borderRadius: 10,
    },
    titulo:{
        color: commonStyles.colors.primary,
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5
    },
    paper:{
      marginRight: 15,
      marginLeft: 15,
      marginBottom: 10,
      borderRadius: 15,
      backgroundColor: commonStyles.colors.white,
      paddingBottom: 15
    },
    row:{
        height: 40,
        paddingLeft: 10
    },
    textNome: {
      color: "#121212",
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 20,
      marginLeft: 20,
      flexWrap: 'wrap',
      alignSelf: "center"
    },
    text: {
      flexDirection: "row",
      flexWrap: "wrap",  
      color: "#121212",
      fontSize: 15,
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20
    },
    rect2: {
      marginTop: 5,
      marginLeft: 15,
      flexDirection: "row",
      flexWrap: "wrap"
    },
  });

export default withNavigation(Detalhe);