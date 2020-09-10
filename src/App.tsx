import React from 'react';
import logo from './logo.svg';
// import './App.css';
import styled from 'styled-components';
import { Button, Container, Box } from '@material-ui/core';

import EnhancedTable from './components/TestTable'
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
    paper: {
      maxWidth: 450,
      height: 350
    },
    margin: {
      margin: theme.spacing(1)
    }
  })
);

// export const header = styled(Button)`
//   padding: 4em;
//   background: black;
// `;

const App = function () {

  const classes = useStyles();
  return (
      <Grid container className={classes.root} >
        <Grid container justify="center" spacing={2}>
          <Grid item key={0} >
            <Container fixed style={{maxWidth:'400px',maxHeight:'400px'}}>
            
              <TableComponent/>
              
              </Container>
            </Grid>
            <Grid item key={1} >
            <Container fixed style={{minWidth:'600px',minHeight:'400px'}}>

              <Graphic/>
              </Container>
            </Grid>
          </Grid>
        </Grid>
  )
}

export default App;
