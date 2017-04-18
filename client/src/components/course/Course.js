import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import Board from '../../components/board/Board';

class Course extends Component {
    constructor (props) {
        super(props)
        this.state = {
            course: {},
            user: localStorage.getItem('user')
        }
    }

    componentDidMount () {
        fetch('/course/getCourseById/' + this.props.match.params._id, {
            accept: 'application/json'
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({course: data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render () {
        return (
            <div className="container">
                <h1>{this.state.course.name}</h1>
                <h1><small>{this.state.course.tag}</small></h1>

                <Board room={this.state.course._id} user={this.state.user} />
            </div>
        )
    }
}

export default Course