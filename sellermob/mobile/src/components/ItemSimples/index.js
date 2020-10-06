import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { withNavigation } from 'react-navigation';
import { Icon } from "native-base";
import stylesItemSimples from "./styles";
import commonStyles from '../../commonStyles' 

function ItemSimples(props) {
    const [altura, setAltura]= useState(0)
    const [imgPrincipal, setImgPrincipal]= useState(null)
    const [item, setItem]= useState(null)
    const [semFoto, setSemFoto]= useState(false)

    useEffect(() => {
        setItem(props.item)
    }, [])
    
    useEffect(() => {
        if(item){
            !item.veiculos_imagens ? false : item.veiculos_imagens.forEach(i =>{
                    if(i.imagem_tipo === "principal"){
                        setImgPrincipal(i.imagem_nome);
                    }
            })
            if(!imgPrincipal && item.veiculos_imagens && item.veiculos_imagens.size > 0){
                setImgPrincipal(item.veiculos_imagens[0].imagem_nome);
            }
        }
    }, [item])
    
    const styles = stylesItemSimples(props.listaHor, props.mt);
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View  style={[styles.container]}  >
                <View style={[styles.rect]} onLayout={e => setAltura(e.nativeEvent.layout.height)}>
                    <Text style={styles.textNome}>Linha 207 - Disco de Corte 2 telas Alcar</Text>
                    <Text style={[styles.text]}>Corte de aço e de materiais ferrosos.Produto desenvolvido para o corte de perfis, barras e chapas.Ideal para utilização em serralherias. Possui duas telas de reforço</Text>
                </View>
                <Image
                    onError={() => setImgPrincipal(semFoto)}
                    source={require('../../assets/images/foto_01_discos_ab2.jpg')}
                    resizeMode="contain"
                    style={[styles.image, { height: altura }]}
                />
            </View>
        </TouchableWithoutFeedback>    
    );
}

export default withNavigation(ItemSimples);