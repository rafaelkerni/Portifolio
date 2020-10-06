import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Reactotron from '../ReactotronConfig'
import menuReducer from './reducers/menu'
import toastReducer from './reducers/toast'
import rootSaga from './sagas/rootSaga'
//import { reducer as offline, offlineMiddleware, suspendSaga, consumeActionMiddleware } from 'redux-offline-queue'

//const sagaMonitor = Reactotron.createSagaMonitor()
//const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [];

// middlewares.push(offlineMiddleware())
// middlewares.push(suspendSaga(sagaMiddleware))
// middlewares.push(consumeActionMiddleware())


const reducers = combineReducers({
    //offline,
    menu: menuReducer,
    toast: toastReducer
})

const storeConfig = createStore(reducers, compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()))
//sagaMiddleware.run(rootSaga)

export default storeConfig