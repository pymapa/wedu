import React, { Component } from 'react'
import './Courses.css'
import { Link } from 'react-router-dom';

class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
        // this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log("asdf")
        fetch('/course/getCourses', {
            accept: 'application/json'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ courses: data })
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    componentWillUnmount() {

    }

    render() {
        let courses = this.state.courses.map((course, i) => {
            return (
                <Link to={"/course/" + course._id} className="card" key={i}>
                    <div className="card">
                        <div className="card-header">
                            <h3>{course.name}</h3>
                        </div>
                        <div className="card-block">
                            <p className="card-text">Course tag: {course.tag}</p>
                        </div>
                    </div>
                </Link>
            )
        })
        return (
            <div className="container" id="courses-container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Join a course to get going</h3>
                    </div>
                </div>

                <div className="row" id="courses">
                    <div className="col-sm-12">
                        {courses}
                    </div>
                </div>
            </div>
        )
    }
}

export default Courses