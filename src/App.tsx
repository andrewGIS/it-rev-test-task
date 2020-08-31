import React from 'react';
import logo from './logo.svg';
// import './App.css';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {TableComponent} from './components/Table'
import EnhancedTable from './components/TestTable'


// export const header = styled(Button)`
//   padding: 4em;
//   background: black;
// `;

const App =  function() {
  
    return (
      <div className="App">
        <TableComponent/>
        <EnhancedTable/> 
      </div>  
    )
}

export default App;
