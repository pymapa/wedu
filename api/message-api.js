var messageService = require('./../services/message-service');

module.exports = function (app) {

    app.get('/message/:id', function (req, res) {
        let questionId = req.params.id;
        messageService.getMessage(questionId, function (err, data) {
            console.log("error? " + err);
            if (!err) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ "error": "resource not found: ",
                    "message" : data });
            }
        })
    })

    app.get('/message/getMessages', function (req, res) {
        messageService.getMessages(function (data) {
            res.status(200).send(data);
        }, function (error) {
            res.status(404).send({ "error": "resources not found" });
        })
    })

}