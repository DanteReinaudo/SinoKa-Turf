import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexbox: {
    display: 'flex',
    flexGrow: 1
  },
  items: {
    flexGrow: 3,
    float: 'center',
    textAlign: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    display: 'none',
    [
      theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  image: {
    marginRight: theme.spacing(2),
  }
}));

export default function MainNavigation() {
  const classes = useStyles();
  const [showToken, setShowToken] = useState(false);
  const [showCarreras, setShowCarreras] = useState(false);
  const [showCaballo, setShowCaballo] = useState(false);

  let history = useHistory();

  const redirectHandler = (showMenu, route) => {
    showMenu(false);
    history.push(route);
  }

  return (
    <div className={classes.flexbox}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.items}>
            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => redirectHandler(setShowCarreras, '/')}
            >
              Home
            </Button>

            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => redirectHandler(setShowCarreras, '/carreras')}
            >
              Carreras
            </Button>

            <Button
              id="fade-menu-recursos"
              aria-controls="fade-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => redirectHandler(setShowCaballo, '/ver-caballo')}
            >
              Caballos
            </Button>

          </div>

        </Toolbar>
      </AppBar >
    </div >
  );
}
