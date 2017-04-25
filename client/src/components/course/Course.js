import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

import './Course.css'
import Messages from './Messages';
import Message from './Message';

class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {},
            user: localStorage.getItem('user'),
            messages: []
        }
    }

    componentDidMount() {
        fetch('/course/getCourseById/' + this.props.match.params._id, {
            accept: 'application/json'
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ course: data });
                this.props.socket.emit('select room', { room: data._id })
            })
            .catch((err) => {
                console.log(err);
            })

        fetch('/message/getMessagesByCourseId/' + this.props.match.params._id, {
            accept: 'application/json'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ messages: data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.course.name}</h1>
                <h1><small>{this.state.course.tag}</small></h1>

                <div id="messages-wrapper">
                    <Messages messages={this.state.messages} />
                </div>
                <div id="message-wrapper">
                    <Message socket={this.props.socket} />
                </div>
            </div>
        )
    }
}

export default Course