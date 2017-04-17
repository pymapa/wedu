import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Course extends Component {
    constructor (props) {
        super(props)

    }

    componentDidMount () {
        console.log("asdf")
        console.log(this.props.params.id);
    }

    render () {
        return (
            <div>
                <h1>Course</h1>
            </div>
        )
    }
}

export default Course