import React, { useState, useRef, useEffect } from "react";
import { withNavigation } from 'react-navigation';
import { Container, Root } from "native-base";
import { FlatGrid } from 'react-native-super-grid';
import commonStyles from '../../commonStyles'
import BarTelas from '../../components/BarTelas'
import ItemGrupo from '../../components/ItemGrupo'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import getRelm from '../../config/realm'

function Produtos(props) {
  const [produtos, setProdutos] = useState([])
  const [token, setToken] = useState(null)
  const [id, setID] = useState(0);

    useEffect(() => { 
      setID(props.navigation.getParam('id', 0));
      buscarUserData() 
    }, []);

    async function buscarUserData(){
      let t = await AsyncStorage.getItem('userToken')
      if(t === ""){
        props.navigation.navigate("Login")
      }else{
        setToken(t);    
      }     
    }

    useEffect(() =>{
      if(token && token !== ""){
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`
        loadImages();
      }
    }, [token]);

    async function loadImages(){
      const realm = await getRelm();
      let dados = realm.objects('produtos');
      /*dados = dados.filtered(`id = ${id}`);
      dados.forEach(i => console.log(i))*/
      console.log(`grupo_id = ${id}`)
      setProdutos(dados.filtered(`grupo_id = ${id}`))
      /*axios.get(`/produtos?grupo_id=${id}&situacao=1`).then(res => {
        setProdutos(res.data.data)
      }).catch(res => {
        console.tron.log(res)
      })*/
    }

    return (
       <Root>
        <Container style={{ flex: 1, backgroundColor: commonStyles.colors.secondary, }}>
        <BarTelas titulo="Produtos" botoes={[{icone: "magnify" , onPress: () => props.navigation.navigate("Pesquisa")}]}/>
        <FlatGrid
            itemDimension={200}
            items={produtos}
            renderItem={({ item, index }) => <ItemGrupo item={item} proximo={"Detalhe"}/>}
         />
        </Container>
      </Root>
    ) 
}

export default withNavigation(Produtos);