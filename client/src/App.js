import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';
import io from 'socket.io-client';

import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import Footer from './components/Footer';
import Header from './components/Header';

import user from './services/user/User-service';

const socket = io.connect();


const store = createStore(reducers);

class App extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    if (user.isSignedIn()) {
      socket.emit('add user', { user: user.getUserName() });
      console.log(user.getUserName())
    }
  }

  render() {

    return (
      <div id="main-wrapper">
        <BrowserRouter>
          <Provider store={store}>
            <div>
              <Header />
              <div id="content-wrapper">
                <Route exact path="/" render={() => <Home socket={socket} />} />
              </div>
              <Footer />
            </div>
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
