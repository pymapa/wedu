var courseService = require('./../services/course-service');


module.exports = function(app) {
    app.get('/course/getCourses', function(req, res) {
        courseService.getCourses(function(err, data) {
            if(!err) {
                res.status(200).send(data);
            } else {
                res.status(500).send(data);
            }
        })
    })

    app.get('/course/getCourseById/:_id', function(req, res) {
        courseService.getCourseByTagOrId(null, req.params._id, function(err, data) {
            if(!err) {
                res.status(200).send(data);
            } else {
                res.status(500).send(data);
            }
        })
    })

    app.get('/course/getCourseByTag/:tag', function(req, res) {
        courseService.getCourseByTagOrId(req.params.tag, null, function(err, data) {
            if(!err) {
                res.status(200).send(data);
            } else {
                res.status(500).send(data);
            }
        })
    })
}