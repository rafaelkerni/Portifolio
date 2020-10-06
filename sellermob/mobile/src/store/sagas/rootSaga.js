import { takeEvery, takeLatest, put, delay, all, spawn } from 'redux-saga/effects'
import * as actionTypes from '../../store/actions/actionTypes'
import { startWatchingNetworkConnectivity } from './offline'

function* asyncMenuSelecionado(action){
    //yield delay(30000)

    yield put({
        type: actionTypes.MENU_SELECIONADO,
        payload: {
             selecionado: action.payload
            }
        });
}

export default function* root(){
    yield all([
        spawn(startWatchingNetworkConnectivity),
        takeLatest(actionTypes.SELECIONAR_MENU, asyncMenuSelecionado)
    ])
}