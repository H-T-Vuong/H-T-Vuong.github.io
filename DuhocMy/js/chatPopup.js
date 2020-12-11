$(function (e){
    $('#chatMateName').click(function (e){
        e.preventDefault();
        if( $('#conversationBox').hasClass('open')){
            $('#conversationBox').removeClass('open');
            $('#conversationBox').addClass('close');
            $('#conversationBox').height(50);
            $('#chatBox').height(0);
        }
        else {
            $('#conversationBox').removeClass('close');
            $('#conversationBox').addClass('open');
            $('#conversationBox').height(500);
            $('#chatBox').height(450);
        }

    });


});

