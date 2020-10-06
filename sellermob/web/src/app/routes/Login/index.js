import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  withStyles,
  Button,
  TextField,
  Fade,
  Snackbar,
  IconButton,
  Link
} from "@material-ui/core";
import axios from "axios";
import CloseIcon from '@material-ui/icons/Close';

function Login({ classes, ...props }) {
  const [isForgetPassword, setForgetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [snack, setSnack] = useState(['', false]);

  function logar() {
    axios.post("/signin", {
      email,
      senha
    }).then(res => {
      axios.defaults.headers.common["Authorization"] = `bearer ${res.data.token}`;
      localStorage.setItem("data_sellermob", JSON.stringify(res.data));
      props.history.push("/");
    }).catch(res => {
      setSnack([res.response.data, true])
    })
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        {/* <img
          src={}
          alt="logo"
          className={classes.logotypeImage}
        /> */}
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <div className={classes.iconContainer}>
              <img
                src={require("../../../assets/images/catalog.png")}
                alt="logo"
                className={classes.iconImage}
              />
            </div>
            <Typography variant="h4" className={classes.greeting}>
              SellerMob
            </Typography>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
              <div className={classes.formDivider} />
            </div>
            {!props.error ? (
              false
            ) : (
              <Fade in={props.error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {isForgetPassword
                    ? props.msgEmail
                    : "Algo está errado com seu e-mail ou senha!"}
                </Typography>
              </Fade>
            )}
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={email /*props.loginValue*/}
              onChange={
                e =>
                  setEmail(
                    e.target.value
                  ) /*e => props.handleInput(e, "login")*/
              }
              margin="normal"
              placeholder="E-mail"
              type="email"
              fullWidth
            />
            {isForgetPassword ? (
              false
            ) : (
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={senha /*props.passwordValue*/}
                onChange={
                  e =>
                    setSenha(
                      e.target.value
                    ) /*e => props.handleInput(e, "password")*/
                }
                margin="normal"
                placeholder="Senha"
                type="password"
                fullWidth
              />
            )}

            <div className={classes.formButtons}>
              {props.isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={false}
                  onClick={() => logar()}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {isForgetPassword ? "Enviar" : "Entrar"}
                </Button>
              )}
              <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
                onClick={() => setForgetPassword(!isForgetPassword)}
              >
                {isForgetPassword
                  ? "Entrar na sua conta?"
                  : "Esqueceu sua senha?"}
              </Button>
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          {`Todos os direitos reservados @ ${new Date().getFullYear()} `}
        </Typography>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snack[1]}
        autoHideDuration={6000}
        onClose={() => setSnack(['', false])}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snack[0]}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setSnack(['', false])}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Grid>
  );
}

const styles = theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  iconContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "25%",
    marginBottom: theme.spacing.unit
  },
  logotypeImage: {
    width: "65%",
    marginBottom: theme.spacing.unit * 4
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48
    }
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  },
  form: {
    width: 320
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 4
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  },
  formDividerContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    alignItems: "center"
  },
  formDividerWord: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40"
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 16
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  recaptcha: {
    marginTop: theme.spacing.unit * 2
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  loginLoader: {
    marginLeft: theme.spacing.unit * 4
  },
  copyright: {
    marginTop: theme.spacing.unit * 4,
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing.unit * 2
    }
  }
});

export default withStyles(styles, { withTheme: true })(Login);
