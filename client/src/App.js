import React, { Component } from 'react';
import './App.css';

// import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Courses from './components/courses/Courses';
import Course from './components/course/Course';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';

import user from './services/user/User-service';

const socket = io.connect();

class App extends Component {


  componentDidMount() {
    if(user.isSignedIn()) {
      socket.emit('add user', {user: user.getUserName()});
      console.log(user.getUserName())
    }
  }

  render() {
    
    return (
      <div id="main-wrapper">
        <BrowserRouter>
          <div>
            {/*<SocketProvider socket={socket}>*/}
            <Header />
            <Route exact path="/" render={() => <Home socket={socket}/> } />
            <Route path="/courses" render={() => <Courses socket={socket}/>} />
            <Route path="/course/:_id" render={(props) => <Course socket={socket} {...props}/>} />
            <Footer />
            {/*</SocketProvider>*/}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
