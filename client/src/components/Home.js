import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {updateUsername} from '../actions/user-actions';


class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Home</h1>

                <div className="row">
                    <div className="col-sm-6 form-group">
                        <input type="text" id="username" onChange={(e) => this.props.updateUsername(e.target.value)} className="form-control" />
                        {this.props.user.name ? <label htmlFor="username">Hello, {this.props.user.name}</label> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({updateUsername: updateUsername}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);