import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import user from '../../services/user/User-service';

import Input from '../../components/form/input';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            user: "",
            course: ""
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
    }

    componentDidMount() {
        if (user.isSignedIn()) {
            this.setState({ user: user.getUserName() });
            this.setState({ signedIn: true });
        }
    }

    signIn(e) {
        e.preventDefault();
        user.signIn(this.state.user)
        this.setState({ signedIn: true })
    }

    handleUserChange(e) {
        this.setState({ user: e.target.value });
    }
    handleCourseChange(e) {
        this.setState({ course: e.target.value });
    }

    render() {
        let courseInput = (
            <form onSubmit={this.selectCourse}>
                <Input type="text" value={this.state.course} onChange={this.handleCourseChange} placeholder="Course tag" />
            </form>
        )
        let findCourse = (
            <Link to="/courses">
                <h2>Find your course</h2>
            </Link>
        )
        let signIn = (
            <form onSubmit={this.signIn}>
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Input type="text" value={this.state.user} onChange={this.handleUserChange} placeholder="What's your name?" />
                    </div>
                </div>
            </form>
        )
        return (
            <div className="container vertical-center" id="home-container">
                <div className="row">
                    <div className="col-sm-12" id="welcome-box">
                        <h1><small>Welcome to</small></h1>
                        <h1>WEDU</h1>
                    </div>
                    <div className="col-sm-12">
                        {this.state.signedIn ? "Hi there " + this.state.user + "!" : ""}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        {!this.state.signedIn ? signIn : ""}
                    </div>
                </div>

                <div className="row" id="choose-course">
                    <div className="col-sm-4 vertical-center">
                        {this.state.signedIn ? findCourse : ""}
                    </div>

                    <div className="col-sm-2 col-sm-offset-1 vertical-center">
                        {this.state.signedIn ? <h3><small>OR...</small></h3> : ""}
                    </div>

                    <div className="col-sm-4 col-sm-offset-1">
                        {this.state.signedIn ? courseInput : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home