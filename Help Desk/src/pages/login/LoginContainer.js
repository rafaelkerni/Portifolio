import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginView from "./LoginView";
import { loginUser, resetError, esqueceuSenha, entrarConta, enviarEmail } from "./LoginState";

export default compose(
  connect(
    state => ({
      isLoading: state.login.isLoading,
      isAuthenticated: state.login.isAuthenticated,
      error: state.login.error,
      isForgetPassword: state.login.isForgetPassword,
      msgEmail: state.login.msgEmail
    }),
    { loginUser, resetError, esqueceuSenha, entrarConta, enviarEmail }
  ),
  withRouter,
  withState("activeTabId", "setActiveTabId", 0),
  withState("googleValue", "setGoogleValue", ""),

  withState("loginValue", "setLoginValue", ""),
  withState("passwordValue", "setPasswordValue", ""),
  withHandlers({
    handleTabChange: props => (e, id) => {
      props.setActiveTabId(id);
    },
    handleInput: props => (e, input = "login") => {
      if (props.error) {
        props.resetError();
      }

      if (input === "login") {
        props.setLoginValue(e.target.value);
      } else if (input === "password") {
        props.setPasswordValue(e.target.value);
      } else if (input === "google") {
        props.setGoogleValue(e);
      }
    },
    handleToggleEsqueceuSenha: props => () => {
      if(props.isForgetPassword){
        props.entrarConta()
      }else{
        props.esqueceuSenha()
      }
    },

    handleEsqueceuSenhaClick: props => () => {
      props.enviarEmail(props.loginValue)
    },
    handleLoginButtonClick: props => () => {
      props.loginUser(props.loginValue, props.passwordValue);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.error && nextProps.error) {
        this.props.setPasswordValue("");
      }
    }
  })
)(LoginView);
