import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Courses from './components/courses/Courses';
import Course from './components/course/Course';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';

class App extends Component {
  render() {
    return (
      <div id="main-wrapper">
        <Header />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/courses" component={Courses} />
            <Route path="/course/:id" component={Course} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
