import { MENU_SELECIONADO } from '../actions/actionTypes'

const initialState = {
    selecionado: 'Início',
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case MENU_SELECIONADO:
                return {
                    ...state,
                    selecionado: action.selecionado
                }   
        default:
                return state    
    }
}

export default reducer