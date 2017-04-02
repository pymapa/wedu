var messageService = require('./../services/message-service');

module.exports = function (io, socket) {
    "use strict";
    
    socket.on('typing', function () {
        console.log("typing");
        socket.broadcast.emit('typing', { user: socket.user });
    })

    socket.on('stop typing', function () {
        console.log("stop typing");
        socket.broadcast.emit("stop typing", { user: socket.user });
    })

    /** 
     * Questions and messages on threads are both message instances
     * New message in question has to be added to the thread
    **/
    socket.on('new message', function (message) {
        // Message to db
        message.user = socket.user;
        message.course = socket.course;
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
                    created: data.created,
                    _id: data._id
                };

                /** 
                 * In case message is new question just notify users
                 * Client has to handle different types
                 * TYPE_MESSAGE has to have id of it's parent
                 **/
                if (newMessage.type === messageService.TYPE_QUESTION) {
                    console.log("test new message: added question");
                    // io.sockets.emit('new message', newMessage);
                    io.to(socket.course).emit('new message', newMessage);

                } else if (newMessage.type === messageService.TYPE_MESSGE) {
                    if (message.questionId !== undefined || message.questionId.length > 0) {
                        messageService.addMessageToQuestion(message.questionId, newMessage,
                            function (err, data) {
                                if (!err) {
                                    console.log("message added to a thread " + newMessage);
                                    io.sockets.emit('new message', newMessage);
                                } else {
                                    console.log("new message, in error " + err);
                                }
                            });
                    } else {
                        console.log("")
                    }
                } else {
                    res.status(404).send("Something went wrong");
                }
            } else {
                console.log("new message, in error " + err);
            }
        });
    })


    socket.on('upvote', function (data) {
        data.user = socket.user;
        data._id = data.messageId;
        messageService.upvoteMessage(data, function (err, data) {
            io.sockets.emit('voted', {
                messageId: data._id,
                grade: data.grade
            })
        })

    })

    socket.on('downvote', function (data) {
        data.user = socket.user;
        data._id = data.messageId;
        messageService.downvoteMessage(data, function (err, data) {
            io.sockets.emit('voted', {
                messageId: data._id,
                grade: data.grade
            })
        })
    })
}