import React, {ReactNode} from 'react';
import { observer, inject } from 'mobx-react'; //These functions make our components observable 
//and be able to use the store
import logo from './logo.svg';
import './App.css';
import Home from '../pages/home/home';

import { Route, Link, Switch, BrowserRouter as Router, Redirect, } from 'react-router-dom';
import Restaurant from '../pages/restaurants/restaurant.component';

class App extends React.Component<{},{} >{
    render(): ReactNode{
      return (
        <div className='.App' style={{alignItems:'center'}}>

        <Router>
           <Switch>
              <Route path='/home' component={Home}/>
              <Route exact path="/restaurant" component={Restaurant} />
              <Redirect to='/home'/>
            </Switch>
           
        </Router>
        </div>
  );
}
}
export default inject('store')(observer (App));

