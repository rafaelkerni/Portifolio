import getRelm from './realm'
import axios from 'axios';
import moment from 'moment';
import "moment/locale/pt-br";

export default async function integracao(){
    const realm = await getRelm();
    categorias(realm)
    grupos(realm)
    produtos(realm)
    imagem_config(realm)

    teste(realm)
  }

  function teste(realm){
    let teste = realm.objects('produtos').filtered(`grupo_id = 2`);
    teste.forEach(i => console.log(i))
  }

 function imagem_config(realm){
    axios.get("/imagem_config").then(res => {
        res.data.data.forEach(item => {
            try{
              realm.write(() => {
                  realm.create('imagem_config', item, 'modified')
              })
            }catch (e) {
              console.log(e);
            }
        })
    }).catch(res => {
      if(res.response){
        console.log(res.response.data);
      }else{
        console.log(res); 
      }
    })
  }

 function produtos(realm){
    axios.get("/produtos").then(res => {
        res.data.data.forEach(item => {
            try{
              realm.write(() => {
                  realm.create('produtos', item, 'modified')
              })
            }catch (e) {
              console.log(e);
            }
        })
    }).catch(res => {
      if(res.response){
        console.log(res.response.data);
      }else{
        console.log(res); 
      }
    })
  }

 function grupos(realm){
    axios.get("/grupos").then(res => {
        res.data.data.forEach(item => {
            try{
              realm.write(() => {
                  realm.create('grupos', item, 'modified')
              })
            }catch (e) {
              console.log(e);
            }
        })
    }).catch(res => {
      if(res.response){
        console.log(res.response.data);
      }else{
        console.log(res); 
      }
    })
  }

 function categorias(realm){
    axios.get("/categorias").then(res => {
        res.data.data.forEach(item => {
            try{
              realm.write(() => {
                  realm.create('categorias', item, 'modified')
              })
            }catch (e) {
              console.log(e);
            }
        })
    }).catch(res => {
      if(res.response){
        console.log(res.response.data);
      }else{
        console.log(res); 
      }
    })
  }