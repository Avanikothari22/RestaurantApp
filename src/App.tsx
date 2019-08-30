import React, {ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
export default class App extends React.Component<{},{} >{
    render(): ReactNode{
      return (
        <div className='App'>
          <Home/>  
      </div>
  );
}
}
