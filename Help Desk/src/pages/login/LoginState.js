import firebase  from 'firebase/app'
import "firebase/auth";

export const initialState = {
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("id_token"),
  error: null,
  isForgetPassword: false,
  msgEmail: '',
};

export const FORGET_PASSWORD = "Password/FORGET_PASSWORD";
export const ENTER_ACCOUNT = "LOGIN/ENTER_ACCOUNT";
export const FORGET_PASSWORD_MESSAGE = "Password/Message";
export const START_LOGIN = "Login/START_LOGIN";
export const LOGIN_SUCCESS = "Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "Login/LOGIN_FAILURE";
export const RESET_ERROR = "Login/RESET_ERROR";
export const LOGIN_USER = "Login/LOGIN_USER";
export const SIGN_OUT_SUCCESS = "Login/SIGN_OUT_SUCCESS";


export const startLogin = () => ({
  type: START_LOGIN
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const esqueceuSenha = () => ({
  type: FORGET_PASSWORD
});

export const entrarConta = () => ({
  type: ENTER_ACCOUNT
});

export const loginUser = (login, password) => dispatch => {
  dispatch(startLogin());
  if (!!login && !!password) {
    firebase.auth().signInWithEmailAndPassword(login, password)
    .then(usuario =>  {
      localStorage.setItem("id_token", usuario.user.uid)
      dispatch(loginSuccess())
    })  
    .catch(error => {dispatch(loginFailure())})
  } else {
    dispatch(loginFailure());
  }
};

export const enviarEmail = (login) => dispatch => {
  if (!!login) {
    firebase.auth().sendPasswordResetEmail(login)
    .then(() => dispatch(envioEmailMsg('Foi enviado um e-mail para a sua redefinição de senha!')))  
    .catch(error => dispatch(envioEmailMsg('Houve um erro ao enviar o e-mail de redefinição de senha!')))
  } else {
    dispatch(envioEmailMsg('É necessário informar seu E-mail!'))
  }
  
}

export const envioEmailMsg = message => ({
  type: FORGET_PASSWORD_MESSAGE,
  payload: { msgEmail: message }
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOut = () => dispatch => {
  localStorage.removeItem("id_token");
  dispatch(signOutSuccess());
};

export default function LoginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case RESET_ERROR:
      return {
        error: false
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        isForgetPassword: true
      };
    case ENTER_ACCOUNT:
        return {
          ...state,
          isForgetPassword: false
        };  
    case FORGET_PASSWORD_MESSAGE:
      return {
        ...state,
        error: true, 
        msgEmail: payload.msgEmail
      };    
    default:
      return state;
  }
}
