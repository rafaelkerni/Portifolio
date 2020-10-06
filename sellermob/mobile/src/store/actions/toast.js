import { APP_TOAST } from './actionTypes'

const ToastActions = {
    setarToast: (msg, duracao, botao) => ({
            type: APP_TOAST,
            payload: [msg, duracao, botao]
    })
}

export { ToastActions } 