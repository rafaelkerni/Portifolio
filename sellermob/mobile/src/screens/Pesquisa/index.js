import React, { useState, useRef, useEffect } from "react";
import { withNavigation } from 'react-navigation';
import { Container, Root, Item, Input } from "native-base";
import { FlatGrid } from 'react-native-super-grid';
import commonStyles from '../../commonStyles'
import BarTelas from '../../components/BarTelas'
import ItemGrupo from '../../components/ItemGrupo'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Voice from 'react-native-voice';
import Modal from '../../components/Modal'

function Produtos(props) {
  const [produtos, setProdutos] = useState([])
  const [token, setToken] = useState(null)
  const [buscar, setBuscar] = useState('');
  const [falando, setFalando] = useState(false);
  const modalBuscar = useRef();

    useEffect(() => { 
      speakToText();
      buscarUserData() 
    }, []);

    async function buscarUserData(){
      let t = await AsyncStorage.getItem('userToken')
      if(t === ""){
        props.navigation.navigate("Login")
      }else{
        if(token && token !== ""){
          axios.defaults.headers.common['Authorization'] = `bearer ${token}`
        } 
      }     
    }

    function loadImages(){
      axios.get(`/produtos?buscar=${buscar}`).then(res => {
        console.tron.log(res.data.data)
        setProdutos(res.data.data)
      }).catch(res => {
        console.tron.log(res)
      })
    }

    speakToText = () =>{
      Voice.destroy().then(Voice.removeAllListeners);
      Voice.onSpeechEnd = (result) => vaifalar()
      Voice.onSpeechResults = (result) => {
        setBuscar(result.value[0])
        modalBuscar.current.toggleModal();
      }
    }

    vaifalar = () =>{
      if(falando){
        Voice.stop();
        setFalando(false);
      }else{
        Voice.start('pt-BR');
        setFalando(true);
      }
    }

    return (
       <Root>
        <Container style={{ flex: 1, backgroundColor: commonStyles.colors.secondary, }}>
        <BarTelas titulo="PESQUISA" />
        <Item style={{ marginTop: 15,
            marginLeft: 15,
            marginRight: 15,
            height: 45,
            backgroundColor: '#fff', }}>
          <MaterialCommunityIconsIcon name='magnify' size={25} color={commonStyles.colors.primary} style={{ marginLeft: 5 }} />
          <Input placeholder='Busque seu produto...' value={buscar} 
            onChangeText={text => setBuscar(text)} 
            onSubmitEditing={text => {
              console.tron.log(text.text)
              setBuscar(text.text)
              loadImages()
            }}/>
          <MaterialCommunityIconsIcon name={falando ? 'microphone-off' : 'microphone'} size={25} color={commonStyles.colors.primary} style={{ marginRight: 5 }} onPress={() => vaifalar()} ons/>
        </Item>
        <FlatGrid
            itemDimension={200}
            items={produtos}
            renderItem={({ item, index }) => <ItemGrupo item={item} proximo={"Detalhe"}/>}
         />
        </Container>
        <Modal
          ref={modalBuscar}
          titulo="Pesquisa"
          tamanho={125}
          sim={() => {
            setBuscar('')
            modalBuscar.current.toggleModal();
            props.navigation.navigate("ResultadoBusca", { tipoBusca: 1, parametro_busca: buscar})
          }}
          nao={() => modalBuscar.current.toggleModal()}
          texto={`Deseja pesquisar por ${buscar}?`}
        />
      </Root>
    ) 
}

export default withNavigation(Produtos);