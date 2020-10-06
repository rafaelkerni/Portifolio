import { APP_TOAST } from "../actions/actionTypes";
import { Toast } from "native-base"
import commonStyles from '../../commonStyles'

const initialState = {
  payload: ["Mensagem", 3000, "OK"]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_TOAST: 
        const tipo_toast = !action.payload[2] ? {
          text: action.payload[0],
          duration: action.payload[1],
          position: 'bottom',
          textStyle: { color: commonStyles.colors.primary }
        } :
        {
          text: action.payload[0],
          duration: action.payload[1],
          position: 'bottom',
          textStyle: { color: commonStyles.colors.primary, marginLeft: 5 },
          buttonText: action.payload[2],
          buttonTextStyle: { color: "#FFF" },
          buttonStyle: { backgroundColor: commonStyles.colors.primary }
        }
        Toast.show(tipo_toast);
        return state;
    default:
        return state;
  }
};

export default reducer;
