var messageService = require('./../services/message-service');

module.exports = function (app) {
    // needed for let -variable devinitions
    "use strict";

    app.get('/message/getMessage/:id', function (req, res) {
        let questionId = req.params.id;
        messageService.getMessage(questionId, function (err, data) {
            if (!err) {

                //Earlier Android handled only long value for created. But that is now fixed

                // let message = {
                //     user: data.user,
                //     message: data.message,
                //     grade: data.grade,
                //     course: data.course,
                //     solved: data.solved,
                //     type: data.type,
                //     thread: data.thread,
                //     created: data.created.getTime(),
                //     _id: data._id
                // };
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    "error": "resource not found: ",
                    "message": data
                });
            }
        })
    })

    app.get('/message/getMessages/:questionId', function (req, res) {
        let questionId = req.params.questionId;
        messageService.getMessages(questionId, function (err, data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(404).send({ "error": "resources not found" });
        });
    })

    app.get('/message/getQuestions', function (req, res) {
        messageService.getQuestions(function (err, data) {
            console.log("data fetched");
            res.status(200).send(data);
        }, function (err) {
            res.status(404).send({ "error": "resources not found" });
        });
    })


    // ONLY FOR TESTING WITH POSTMAN
    app.post('/test/message/newMessage', function (req, res) {

        let message = req.body;
        let err = false;

        messageService.newMessage(message, function (err, data) {

            if (!err) {
                console.log("new message, in callback");

                let newMessage = {
                    user: data.user,
                    message: data.message,
                    grade: data.grade,
                    course: data.course,
                    solved: data.solved,
                    type: data.type,
                    createdJS: data.created,
                    thread: data.thread,
                    created: data.created.getTime(),
                    _id: data._id
                };

                /** 
                 * In case message is new question just notify users
                 * Client has to handle different types
                 * TYPE_MESSAGE has to have id of it's parent
                 **/
                if (newMessage.type === messageService.TYPE_QUESTION) {
                    res.status(200).send(newMessage);
                    console.log("test new message: added question");
                    // io.sockets.emit('new message', newMessage);

                } else if (newMessage.type === messageService.TYPE_MESSGE) {
                    if (message.questionId !== undefined || message.questionId.length > 0) {
                        messageService.addMessageToQuestion(message.questionId, newMessage,
                            function (err, data) {
                                if (!err) {
                                    let newlyAddedMessage = {
                                        user: data.user,
                                        message: data.message,
                                        grade: data.grade,
                                        course: data.course,
                                        solved: data.solved,
                                        type: data.type,
                                        createdJS: data.created,
                                        thread: data.thread,
                                        created: data.created.getTime(),
                                        _id: data._id
                                    };
                                    console.log(newlyAddedMessage);

                                    res.status(200).send(newlyAddedMessage);
                                } else {
                                    console.log("new message, in error " + err);
                                    res.status(404).send(err);
                                }
                            });
                    }
                } else {
                    res.status(404).send("Something went wrong");
                }
            } else {
                console.log("new message, in error " + err);
            }
        });
    });

}