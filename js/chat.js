function runChatApp(chatMate, user){
    $.ajax({
        type: 'GET',
        url: 'api/message.php/conversation',
        data: {username: user, chatMate: chatMate},
        success: function (data) {
            var conversation = JSON.parse(data);
            window.location.href="#lastMess";
            $.each(conversation, function (index, message) {
                if (message.sender === getCookie('username')) {
                    $('#messageDisplay').append('<div class="text-right messSender p-3 mb-2 bg-info text-white rounded mt-2 mb-2">' + message.content + '</div>');
                } else if (message.receiver === getCookie('username')) {
                    $('#messageDisplay').append('<div>'+message.sender+'</div>'+
                        '<div class="text-left messReceiver p-3 mb-2 bg-secondary text-white rounded mt-2 mb-2">' + message.content + '</div>');
                }
            });
        }
    });

    function getRealTimeMessage(){
        window.location.href="#lastMess";
        $.ajax({
            type: 'GET',
            url: 'api/message.php/message',
            data: {username:user, chatMate:chatMate},
            success: function (data) {
                var message = JSON.parse(data);
                var lastMessId = message.messageId;

                function getMessage() {
                    $.ajax({
                        type: 'GET',
                        url: 'api/message.php/message',
                        data: {username: user, chatMate: chatMate},
                        success: function (data) {
                            var message = JSON.parse(data);
                            if(message.messageId > lastMessId){
                                lastMessId = message.messageId;
                                if (message.sender === getCookie('username')) {
                                    $('#messageDisplay').append('<div class="text-right messSender p-3 mb-2 bg-info text-white rounded mt-2 mb-2">' + message.content + '</div>');
                                } else if (message.receiver === getCookie('username')) {
                                    $('#messageDisplay').append('<div>'+message.sender+'</div>'+
                                        '<div class="text-left messReceiver p-3 mb-2 bg-secondary text-white rounded mt-2 mb-2">' + message.content + '</div>');
                                }
                                window.location.href="#lastMess";
                            }
                            setTimeout(getMessage, 1000);
                            $('#message').focus();
                        }
                    });
                }
                getMessage();
            }
        });
    }
    getRealTimeMessage();




        $('#sendBtn').click(function (e){
            const message = $('#message').val().trim();
            const receiver = chatMate;
            const sender = user;

                e.preventDefault();
                if(message ==''){}
                else{
                    $.ajax({
                        type: 'POST',
                        url: 'api/message.php/message',
                        data: {receiver:receiver, sender:sender, content:message},
                        success: function (data){
                            var success = JSON.parse(data);
                            if($.trim(success) =="Success"){
                                $('#message').val('');
                            }else{
                                Swal.fire({
                                    title: 'Errors',
                                    text: data,
                                    icon: 'error'
                                })
                            }
                        },
                        error: function (data) {
                            Swal.fire({
                                title: 'Errors',
                                text: 'There were errors connecting to server.',
                                icon: 'error'
                            })
                        }
                    });
                }

        });

}