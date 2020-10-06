import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, YellowBox, NativeModules, View, PanResponder } from 'react-native'
import Navigator from './src/Navigator'
import { name as appName } from './app.json'
import axios from 'axios'
import { Root } from "native-base";
//import { Sentry } from 'react-native-sentry';

//axios.defaults.baseURL = 'http://192.241.248.251:3525'
axios.defaults.baseURL = 'http://192.168.1.150:3525'

if(__DEV__) {
    import('./src/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

//Sentry.config('https://17ecd17d3942492281b63213c6eb18c2@sentry.io/1788707').install();

YellowBox.ignoreWarnings(['Remote debugger', `VirtualizedLists`,
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?']);

import store from './src/store/storeConfig'

const Redux = () => (
            <Root >
                <Provider store={store}>
                    <Navigator />
                </Provider>
            </Root> 
)

AppRegistry.registerComponent(appName, () => Redux)
