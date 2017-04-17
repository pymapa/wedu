import React, {Component} from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

import Input from '../../components/form/input';

class Home extends Component {
    render () {
        return (
            <div className="container vertical-center" id="home-container">
                <div className="row">
                    <div className="col-sm-12" id="welcome-box">
                        <h1><small>Welcome to</small></h1>
                        <h1>WEDU</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Input type="text" placeholder="What's your name?"/>
                    </div>
                </div>

                <div className="row" id="choose-course">
                    <div className="col-sm-6 vertical-center">
                        <Link to="/courses">
                            <h2>Find your course</h2>
                        </Link>

                    </div>

                    <div className="col-sm-4 col-sm-offset-1">
                        <Input type="text" placeholder="Course tag" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home