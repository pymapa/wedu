var messageService = require('./../services/message-service');

module.exports = function(app) {

    app.get('/message/getMessages', function(req, res) {
        messageService.getMessages(function(data) {
            res.status(200).send(data);
        })
    })

}