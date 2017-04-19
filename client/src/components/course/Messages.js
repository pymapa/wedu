import React, { Component } from 'react';

import user from '../../services/user/User-service';

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ""
        }
    }

    componentDidMount() {
        this.setState({user: user.getUserName});
    }

    render() {
        let messages = this.props.messages.map((m, i) => {
            return (
                <div className="card" key={i}>
                    <div className="card-block">
                        <div className="card-subtitle">
                        <p><small>{m.user}</small></p>
                        </div>
                        <p className="card-text">{m.message}</p>
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