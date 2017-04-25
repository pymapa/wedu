import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import user from '../../services/user/User-service';

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ""
        }
    }

    componentDidMount() {
        this.setState({ user: user.getUserName });
    }

    render() {
        let messages = this.props.messages.map((m, i) => {
            return (
                <div className="card" key={i}>
                    <div className="card-block">
                        <h4 className="card-title">
                            {m.message}
                        </h4>
                        <div className="card-subtitle">
                            <p>{m.user} <small><Moment format="DD.MM HH:mm">{m.createdAt}</Moment></small></p>
                        </div>
                        <Link to={"/thread/" + m._id} className="card-link">Join thread</Link>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {messages}
            </div>
        );
    }
}

export default Messages;