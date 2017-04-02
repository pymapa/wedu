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
}