import { SETAR_ENTREGA } from './actionTypes'

import { markActionsOffline } from 'redux-offline-queue'

const EntregaActions = {
    setarEntrega: entrega => ({
            type: SETAR_ENTREGA,
            payload: entrega
    })
}

markActionsOffline( EntregaActions, ['setarEntrega'])

export { EntregaActions } 