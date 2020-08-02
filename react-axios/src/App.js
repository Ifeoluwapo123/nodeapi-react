import React, { Component } from 'react';
import Nav from './nav.jsx';
import Home from './home.jsx';
import Register from './register.jsx';
import Profile from './profile.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';
import Products from './products.jsx';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';

class App extends Component {
  style = {
    position: 'absolute',
    padding: 15,
    bottom: 0,
    backgroundColor: '#b2beb5'
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/products' component={Products} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={Register} />
            <Route path='/' exact component={Home} />
          </Switch>
          <footer className=' container-fluid footer' style={this.style}>
            <div className='row'>
              <div className='col-xs-12 col-sm-12 text-center' style={{ color: '#fff' }}>Copyright © react app 2020</div>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
