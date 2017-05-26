import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import user from '../services/user/User-service';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        }
    }
    componentDidMount() {
        if(user.isSignedIn()) {
            this.setState({user: user.getUserName()});
            this.setState({signedIn: true});
        }
    }

    logout() {
        user.logOut();
    }

    render() {
        return (
            <div className="container-fluid" id="footer-container">
                <div className="row">
                    <div className="col-sm-2 offset-sm-5 vertical-center">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="col-sm-2 offset-sm-3">
                        {this.state.signedIn ? "Signed in as " + this.state.user: ""}<br/>
                        {this.state.signedIn ? <Link to="/" onClick={this.logout}>Sign out</Link>: this.state.user}
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer