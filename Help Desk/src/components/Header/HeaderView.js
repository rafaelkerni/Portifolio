import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  withStyles
} from "@material-ui/core";
import { ConfirmationNumber as ConfirmationNumberIcon,
        Group as GroupIcon,
        ExitToApp as ExitToAppIcon,
        Menu as MenuIcon
} from "@material-ui/icons";
import classNames from "classnames";
import { Typography } from "../Wrappers";

import userInfo from "../../config/userInfo";

function Header({ classes, isSidebarOpened, toggleSidebar, ...props }){
  const [usuario, setUsuario] = useState([]);

  async function getUserInfo() {
    await userInfo(setUsuario)
  }

  useEffect(() => {
    getUserInfo() 
  }, [])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
      <img
          alt="WMC Software"
          className={classes.logoEmpresa}
          src="/logo_top.svg" />
        <Typography variant="h6" weight="medium" className={classes.logotype}>Help Desk</Typography>
        <div className={classes.grow} />
        
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={props.openProfileMenu} >
          <MenuIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(props.profileMenu)}
          anchorEl={props.profileMenu}
          onClose={props.closeProfileMenu}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {!usuario || !usuario.nome ? 'Nome' : usuario.nome}
            </Typography>
            <Typography color="primary">
              {!usuario || !usuario.empresa? 'Empresa' : usuario.empresa}
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )} >
            <ConfirmationNumberIcon className={classes.profileMenuIcon} /> Tickets
          </MenuItem>
          {!usuario ? false : (usuario.adm === true) ?  <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )} >
            <GroupIcon className={classes.profileMenuIcon} /> Usuários
          </MenuItem> : false }
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
            onClick={props.signOut}>
            <ExitToAppIcon className={classes.profileMenuIcon} /> Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const styles = theme => ({
  logoEmpresa: {
    height: "50%",
    width: "125px",
    marginLeft: 15
  },
  logotype: {
    color: "white",
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  appBar: {
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  hide: {
    display: "none"
  },
  grow: {
    flexGrow: 1
  },
  
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing.unit * 1.25,
    width: "100%"
  },
  messageContent: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenu: {
    marginTop: theme.spacing.unit * 7
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  headerMenuButton: {
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit / 2
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing.unit * 2
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 1)"
  },
  headerIconCollapse: {
    color: "white"
  },
  profileMenu: {
    minWidth: 265
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2
  },
  profileMenuItem: {
    color: theme.palette.secondary
  },
  profileMenuIcon: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.main
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light
    }
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing.unit * 2
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0
  },
  sendMessageButton: {
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textTransform: "none"
  },
  sendButtonIcon: {
    marginLeft: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Header);
