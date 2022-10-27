import React from 'react';
import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


import AllTodos from "../pages/Todos/AllTodos";
import { UpdateTodo } from '../pages/Todos/UpdateTodo';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
     
     <Router>
   
    <Routes>
    <Route exact path=''  element={<AllTodos/>}/>
    <Route exact path='/update/:id'  element={<UpdateTodo/>}/>
    
    </Routes>

    </Router>
       
        
      
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
