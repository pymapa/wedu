import React, { Component } from 'react'

import Input from '../../components/form/input';
// import Textarea from '../../components/form/textarea';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }

        this.updateMessage = this.updateMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    handleTyping() {

    }

    updateMessage(e) {
        this.props.socket.emit('typing');
        this.setState({message: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.socket.emit('new message', {message: this.state.message})
        console.log("submit");
        this.setState({message: ""});
    }

    render() {
        return (
            <div id="message-area">
                <div id="message-input">
                    <form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        rows={2}
                        className="col-sm-12"
                        value={this.state.message}
                        onChange={this.updateMessage}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Message