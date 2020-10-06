import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Platform, PermissionsAndroid, FlatList } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';
import { Root, Button, Item, Input, Toast, Icon } from "native-base";
import { FlatGrid } from 'react-native-super-grid';
import getRelm from '../../config/realm'
import ItemSimples from '../../components/ItemSimples'
import commonStyles from "../../commonStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import BarTelas from '../../components/BarTelas'
//import Slideshow from 'react-native-slideshow';
import ItemGrupo from '../../components/ItemGrupo'

function Home(props) {
  const [position, setPosition] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [token, setToken] = useState(null);
  const [slide, setSlide] = useState([
    { url:'http://placeimg.com/1280/700/any' },
    { url:'http://placeimg.com/1280/710/any' },
    { url:'http://placeimg.com/1280/720/any' }
  ]);

  useEffect(() => { buscarUserData() }, []);

  function buscarSlide(){
    axios.get("/imagem_config").then(res => {
      /*let urls = []
      res.data.data.forEach(item => urls.push({ url: `${axios.defaults.baseURL}/static/${item.imagem}`}))
      setSlide(urls)*/
      //setSlide([])
    }).catch(res => {
      console.tron.log(res)
    })
  }

  function atualizarSlide(){
     setInterval(() => {
      if(position === slide.length){
        setPosition(0)
       }else{
        setPosition(position + 1)
       }
     }
      , 5000);
  }


  async function buscarUserData(){
    let t = await AsyncStorage.getItem('userToken')
    if(t === ""){
      props.navigation.navigate("Login")
    }else{
      setToken(t);    
    }     
  }

  useEffect(() =>{
    //console.tron.log(1);
    if(token && token !== ""){
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`
      loadImages();
      buscarSlide();
      atualizarSlide();
    }
  }, [token]);

  async function loadImages(){
    const realm = await getRelm();
    let cats = realm.objects('categorias');
    //cats.forEach(i => console.log[i])
    setCategorias(cats)
    /*axios.get("/categorias").then(res => {
      setCategorias(res.data.data)
    }).catch(res => {
      if(res.response){
        setSnack([res.response.data, true])
      }else{
        setSnack(['Ocorreu um erro ao obter os dados!', true])
      }
    })*/
    
  }

  return (
    <View style={styles.container}>
        <BarTelas titulo="" botoes={[{icone: "magnify" , onPress: () => props.navigation.navigate("Pesquisa")}]} />   
        <View style={styles.scrollContainer}>
          {/* <Slideshow 
            position={position}
            resizeMode="contain"
            //onPositionChanged={position => setPosition(position)}
            dataSource={slide}/>  */}
          <Text style={{ fontWeight: "bold", fontSize: 24, margin: 15, color: commonStyles.colors.primary }}>Categorias</Text>
          <FlatGrid
            itemDimension={200}
            items={categorias}
            renderItem={({ item, index }) => <ItemGrupo item={item} proximo={"Grupos"}/>}
         />
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    scrollArea: {
      flex: 1,
      backgroundColor: commonStyles.colors.third,
    },
    pesquisa:{
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20
    },
    scrollContainer:{
      flex: 1,
      backgroundColor: commonStyles.colors.secondary
    },
    bemvindo:{
      fontSize: 25,
      fontWeight: "bold"
    },
    ao: {
      fontSize: 20,
      fontWeight: "bold"
    },
    sellermob:{
      fontSize: 45,
      fontWeight: "bold",
      color: commonStyles.colors.primary
    },
    button:{
      marginTop: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: commonStyles.colors.primary
    },
    textButton:{
      paddingVertical: 20,
      paddingHorizontal: 50,
      color: commonStyles.colors.white,
      fontSize: 20,
      fontWeight: "bold"
    }
  })


export default withNavigation(Home);
