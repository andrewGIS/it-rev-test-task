import React from 'react';
import logo from './logo.svg';
// import './App.css';
import styled from 'styled-components';
import { Button, Container, Box } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { TableComponent } from './components/Table'
import {Graphic} from './components/Graphic'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    margin: {
      margin: theme.spacing(1)
    }
  })
);

export const header = styled(Button)`
  padding: 4em;
  background: black;
`;

const App = function () {

  const classes = useStyles();
  return (
      <Grid container className={classes.root} >
        <Grid container justify="center" spacing={2}>
          <Grid item key={0} >
            
              <TableComponent/>
              
            </Grid>
            <Grid item key={1} >

              <Graphic/>

            </Grid>
          </Grid>
        </Grid>
  )
}

export default App;
