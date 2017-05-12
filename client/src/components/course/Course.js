import React, { Component } from 'react'
import ReactDOM from 'react-dom';
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

    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: "smooth" });
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

        this.props.socket.on('new message', (data) => {
            console.log(data)
            let arr = this.state.messages.slice();
            arr.push(data);
            this.setState({ messages: arr })
        });
    }

    render() {

        return (
            <div className="container">
                <h1>{this.state.course.name}</h1>
                <h1><small>{this.state.course.tag}</small></h1>

                <div id="messages-wrapper row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-8">
                        <Messages messages={this.state.messages} />
                    </div>
                    <div id="dummy-message" ref={(el) => { this.messagesEnd = el; }}>

                    </div>
                </div>
                <div id="message-wrapper row">
                    <div className="col-sm-10">
                        <Message socket={this.props.socket} />
                    </div>
                    <div className="col-sm-2 form-group">
                        <label htmlFor="attachment">Attachment</label>
                        <input type="file" id="attachment" className="form-control-file" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Course