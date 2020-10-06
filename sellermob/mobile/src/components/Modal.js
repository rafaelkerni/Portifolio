import React, { useEffect, useState, useImperativeHandle } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from "react-native";
import { Spinner } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import commonStyles from "../commonStyles";
import Modal from "react-native-modal";

export default React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.visible || false);
  const botoes = !botoes
    ? false
    : props.botoes.map((botao, i) => (
        <TouchableWithoutFeedback onPress={botao.onPress}>
          <View style={styles.botao}>
            <Text style={styles.botoesText}>{botao.nome}</Text>
          </View>
        </TouchableWithoutFeedback>
      ));

  useImperativeHandle(ref, () => ({
    toggleModal() {
      setVisible(!visible);
    }
  }));

  const spinner = props.spinner | false;

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  return (
    <View ref={ref}>
      <Modal
        isVisible={visible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationOutTiming={1}
        animationInTiming={1}
        transparent={true}
        avoidKeyboard
        coverScreen={true}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        KeyboardAwareScrollView={true}
        onBackdropPress={spinner ? false : () => setVisible(!visible)}
        onBackButtonPress={spinner ? false : () => setVisible(!visible)}
        children={
          <View style={[styles.container, { height: props.tamanho || 200 }]}>
            <View style={styles.titulo}>
              {/* { props.icone ? 
                                        <Icon name={props.icone || "information-outline"} 
                                            size={25}
                                            style={styles.icone}/> : false } */}
              <Text style={styles.tituloText}>
                {props.titulo || "Confirmação"}
              </Text>
            </View>
            {props.texto ? (
              <View style={styles.textView}>
                {!spinner ? (
                  false
                ) : (
                  <Spinner color={commonStyles.colors.third} />
                )}
                <Text style={styles.conteudoText}>{props.texto}</Text>
              </View>
            ) : props.conteudo ? (
              <View style={styles.conteudo}>{props.conteudo}</View>
            ) : (
              false
            )}
            <View style={styles.botoes}>
              {!spinner && props.nao ? (
                <TouchableWithoutFeedback onPress={props.nao}>
                  <View style={styles.botao}>
                    <Text style={styles.botoesText}>NÃO</Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                false
              )}
              {!spinner && props.cancelar ? (
                <TouchableWithoutFeedback onPress={props.cancelar}>
                  <View style={styles.botao}>
                    <Text style={styles.botoesText}>CANCELAR</Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                false
              )}
              {!spinner && props.sim ? (
                <TouchableWithoutFeedback onPress={props.sim}>
                  <View style={styles.botao}>
                    <Text style={styles.botoesText}>SIM</Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                false
              )}
              {!spinner && props.ok ? (
                <TouchableWithoutFeedback onPress={props.ok}>
                  <View style={styles.botao}>
                    <Text style={styles.botoesText}>OK</Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                false
              )}

              {!spinner ? botoes : false}
            </View>
          </View>
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.colors.white,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20
  },
  titulo: {
    flexDirection: "row"
  },
  tituloText: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 7,
    color: commonStyles.colors.mainText
  },
  textView: {
    flexDirection: "row",
    alignItems: "center"
  },
  conteudo: {
    flex: 1
  },
  conteudoText: {
    color: commonStyles.colors.subText,
    fontSize: 15,
    marginLeft: 15
  },
  botoes: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 10,
    margin: 15,
    justifyContent: "flex-end"
  },
  botao: {
    margin: 12
  },
  botoesText: {
    color: commonStyles.colors.primary
  }
});
