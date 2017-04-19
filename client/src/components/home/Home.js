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
            courseTag: "",
            course: {},
            message: ""
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
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
        this.props.socket.emit('add user', {user: this.state.user});
    }

    handleUserChange(e) {
        this.setState({ user: e.target.value });
    }
    handleCourseChange(e) {
        this.setState({ courseTag: e.target.value });
        this.setState({message: ""});
    }
    selectCourse(e) {
        e.preventDefault();
        fetch('/course/getCourseByTag/' + this.state.courseTag, {
            accept: 'application/json'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ course: data });
            })
            .catch((err) => {
                this.setState({message: "Course not found"});
                console.log(err);
            })

    }

    render() {
        let courseInput = (
            <form onSubmit={this.selectCourse}>
                <Input type="text" value={this.state.courseTag} onChange={this.handleCourseChange} placeholder="Course tag" />
            </form>
        )
        let findCourse = (
            <Link to="/courses">
                <h3>Find your course</h3>
            </Link>
        )
        let signIn = (
            <form onSubmit={this.signIn}>
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        <Input type="text" value={this.state.user} onChange={this.handleUserChange} placeholder="What's your name?" />
                    </div>
                </div>
            </form>
        )
        let courseCard = (
            <Link to={"/course/" + this.state.course._id}>
            <div className="col-sm-8 offset-sm-2 course-card">
                <div className="course-name">
                        <h3>{this.state.course ? this.state.course.name: ""}</h3>
                    </div>
                    <div className="course-info">
                        <p>Course tag: {this.state.course ? this.state.course.tag: ""}</p>
                    </div>
            </div>
            </Link>
        )
        return (
            <div className="container vertical-center" id="home-container">
                <div className="row">
                    <div className="col-12" id="welcome-box">
                        <h1><small>Welcome to</small></h1>
                        <h1>WEDU</h1>
                    </div>
                    <div className="col-sm-12">
                        {this.state.signedIn ? "Hi there " + this.state.user + "!" : ""}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        {!this.state.signedIn ? signIn : ""}
                    </div>
                </div>

                <div className="row" id="choose-course">
                    <div className="col-sm-4 vertical-center">
                        {this.state.signedIn ? findCourse : ""}
                    </div>

                    <div className="col-sm-2 offset-sm-1 vertical-center">
                        {this.state.signedIn ? <h3><small>OR...</small></h3> : ""}
                    </div>

                    <div className="col-sm-4 offset-sm-1">
                        {this.state.signedIn ? courseInput : ""}
                    </div>
                </div>

                <div className="row">
                    {this.state.course._id ? courseCard: ""}
                    {this.state.message}
                </div>
            </div>
        )
    }
}

export default Home