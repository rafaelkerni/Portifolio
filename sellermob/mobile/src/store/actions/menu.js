import { SELECIONAR_MENU } from './actionTypes'

import { markActionsOffline } from 'redux-offline-queue'

const MenuActions = {
    selecionarMenu: selecionado => ({
            type: SELECIONAR_MENU,
            payload: selecionado
    })
}

markActionsOffline(MenuActions, ['selecionarMenu'])

export { MenuActions } 