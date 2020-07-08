import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Grid,
  CircularProgress,
  Typography,
  withStyles,
  Button,
  TextField,
  Fade
} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import 'typeface-roboto';
 
function Login({ classes, ...props }){
  const recaptchaRef = React.createRef();

    function onChange(value) {
      props.handleInput(value, "google")  
    }

    return(
      <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={'/logo_footer.svg'} alt="logo" className={classes.logotypeImage} />
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
            <React.Fragment>
            <div className={classes.iconContainer}>
              <img src={'/android-chrome-192x192.png'} alt="logo" className={classes.iconImage} />
            </div>  
              <Typography variant="h3" className={classes.greeting}>
              WMC Software Help Desk
              </Typography>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <div className={classes.formDivider} />
              </div>
              {!props.error ? false :
                <Fade in={props.error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                  {props.isForgetPassword ? props.msgEmail : 'Algo está errado com seu e-mail ou senha!' }
                  </Typography>
                </Fade> }
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={props.loginValue}
                onChange={e => props.handleInput(e, "login")}
                margin="normal"
                placeholder="E-mail"
                type="email"
                fullWidth
              />
              {props.isForgetPassword ? false :
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField
                    }
                  }}
                  value={props.passwordValue}
                  onChange={e => props.handleInput(e, "password")}
                  margin="normal"
                  placeholder="Senha"
                  type="password"
                  fullWidth
                />
              }
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdRcq0UAAAAABUKAbH1lVPcynXIvIDgFLFR7rsf"
                onChange={onChange}
                className={classes.recaptcha}
              />
              <div className={classes.formButtons}>
                {props.isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      props.loginValue.length === 0 ||
                      (props.passwordValue.length === 0 && !props.isForgetPassword) ||
                      props.googleValue.length === 0
                    }
                    onClick={!props.isForgetPassword ? props.handleLoginButtonClick : props.handleEsqueceuSenhaClick}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    {props.isForgetPassword ? 'Enviar' : 'Entrar' }
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick={() => props.handleToggleEsqueceuSenha(props.isForgetPassword)} >
                  {props.isForgetPassword ? 'Entrar na sua conta?' : 'Esqueceu sua senha?' }
                </Button>
              </div>
            </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
            {`Todos os direitos reservados @ ${new Date().getFullYear()} `}
            <Link color="inherit" href="https://www.wmcsoftware.com/">
                WMC Software.
            </Link>
        </Typography>
      </div>
    </Grid>
  )
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
    alignItems: 'center',
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
    marginTop: theme.spacing.unit * 2,
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
    whiteSpace: 'nowrap',
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing.unit * 2,
    }
  }
});

export default withStyles(styles, { withTheme: true })(Login);
