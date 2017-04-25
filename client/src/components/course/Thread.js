import React, {Component} from 'react'

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {}
        }
    }

    componentDidMount() {
        fetch('/message/getMessage/' + this.props.match.params._id,
        {accept: 'application/json'}
        )
        .then((res) => res.json())
        .then((data) => {
            this.setState({message: data})
        })
        console.log(this.state.message)
    }

    render () {
        return (
            <div className="container">
                <h1>{this.state.message.message}</h1>
            </div>
        )
    }
}

export default Thread