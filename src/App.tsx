import React, {ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Restaurant from './pages/restaurants/restaurant.component';
const routes = [
  {
    path: '/Restaurant',
    component: Restaurant
  }
]
export default class App extends React.Component<{},{} >{
    render(): ReactNode{
      return (
        <Router>
        <div className='App'>
          <Home/>
      </div>
      </Router>
  );
}
}
