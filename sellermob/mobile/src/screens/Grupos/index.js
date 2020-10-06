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

function Grupos(props) {
  const [grupos, setGrupos] = useState([])
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
      let dados = realm.objects('grupos');
      dados = dados.filtered(`id = ${id}`);
     // dados.forEach(i => console.log(i))
      setGrupos(dados.filtered(`categoria_id = ${id}`))
      /*axios.get(`/grupos?categoria_id=${id}`).then(res => {
        setGrupos(res.data.data)
      }).catch(res => {
        console.tron.log(res)
      })*/
    }

    return (
       <Root>
        <Container style={{ flex: 1, backgroundColor: commonStyles.colors.secondary, }}>
        <BarTelas titulo="GRUPOS" botoes={[{icone: "magnify" , onPress: () => props.navigation.navigate("Pesquisa")}]}/>
        <FlatGrid
            itemDimension={200}
            items={grupos}
            renderItem={({ item, index }) => <ItemGrupo item={item} proximo={"Produtos"}/>}
         />
        </Container>
      </Root>
    ) 
}

export default withNavigation(Grupos);