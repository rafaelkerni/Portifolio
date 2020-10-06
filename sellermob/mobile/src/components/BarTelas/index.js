import React, { useRef } from 'react'
import { StyleSheet, View, BackHandler } from 'react-native'
import { Header, Left, DatePicker, Button, Title, Right, Body } from 'native-base'
import { withNavigation, NavigationActions } from 'react-navigation'
import { DrawerActions } from 'react-navigation-drawer'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import commonStyles from '../../commonStyles'

function BarTelas(props) {
    let bt = !props.botoes ? [] : props.botoes
    bt = !props.notificacao ? bt : [ ...bt, {icone:"bell", onPress:() => props.navigation.navigate("Notificacoes")}]
    const botoes = !bt ? false : bt.map((botao, i) => 
      <Button transparent onPress={botao.onPress} key={botao.icone} >
          <Icon name={botao.icone} style={appBarStyles.icon} size={25} />
      </Button> 
    );
     
        return (
            <Header style={appBarStyles.header}
                    androidStatusBarColor={commonStyles.colors.third}>
                <Left style={appBarStyles.left}>
                    <Button transparent
                            onPress={props.back ? () => props.navigation.dispatch(NavigationActions.back()) 
                                                     : () => props.navigation.dispatch(DrawerActions.toggleDrawer()) } >
                        <Icon name={props.back ? "arrow-left" : "menu"} style={appBarStyles.icon} size={25} />
                    </Button>
                   
                </Left>
                <Body style={appBarStyles.body}>
                     <Title style={appBarStyles.title}>
                        { props.titulo ? props.titulo : 'SellerMob'}
                    </Title>
                </Body>
                <Right style={appBarStyles.right}>
                    { botoes }
                </Right>
            </Header>
        );
}

const appBarStyles = StyleSheet.create({
    header: {
      backgroundColor: commonStyles.colors.primary,
    },
    body:{
        flex: 1,
        backgroundColor: commonStyles.colors.primary,
        alignItems: 'center'
    },  
    left: {
      flex: 0.5,
      flexDirection: 'row'
    },
    title: {
      fontSize: 15,
      color: commonStyles.colors.white,

    },
    icon: {
      color: commonStyles.colors.white,
    },
    right: {
        flex: 0.5
    }
  });

export default withNavigation(BarTelas);
