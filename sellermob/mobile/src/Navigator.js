import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import Menu from './screens/Menu'
import Login from '../src/screens/Login/Login'
import Home from './screens/Home/Home'
import AlterarSenha from './screens/AlterarSenha'
import Detalhe from './screens/Detalhe'
import Notificacoes from './screens/Notificacoes'
import Baralho from './screens/Baralho'
import Grupos from './screens/Grupos'
import Produtos from './screens/Produtos'
import Pesquisa from './screens/Pesquisa'

const Stack = createStackNavigator(
  {
    Home,
    Grupos,
    Pesquisa,
    Produtos,
    Detalhe,
    Baralho,
    AlterarSenha,
    Notificacoes,
  },
  {
    defaultNavigationOptions: () => ({
        header: null
    }),
  }
);

export default  DrawerNavigator = createAppContainer(createDrawerNavigator(
  {
    Login,
    Stack,
  },
  {
    contentComponent: () => <Menu />,
    drawerWidth: 230,
    minSwipeDistance: 100,
    initialRouteName: 'Login'
  },
));