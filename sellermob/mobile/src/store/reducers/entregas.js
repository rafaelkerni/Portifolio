import { SETAR_ENTREGA } from "../actions/actionTypes";

const initialState = {
  entrega: {
    id: 0,
    pessoa_id: 0,
    pessoa: "Pessoa",
    carga_id: 0,
    obs: "Obs",
    data_hora_finalizacao: null,
    situacao: "A",
    created_at: null,
    updated_at: null,
    delete_at: null,
    entrega_registros: [],
    pedidos: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETAR_ENTREGA:
      return {
        ...state,
        entrega: action.entrega
      };
    default:
      return state;
  }
};

export default reducer;
