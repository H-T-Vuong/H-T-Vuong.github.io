$(function (e){
    if (getCookie("username") === "") {
        Swal.fire({
            title: "This session is for members only",
            text: "Log in to  continue",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Log In",
        }).then((result) => {
            if (result.isConfirmed) {
                window.top.location.href = "login.html";
            }
        });
    }
    $.ajax({
        type: 'GET',
        url: 'api/message.php/recent',
        data: {username:getCookie('username')},
        success: function (data){
            var recentchat = JSON.parse(data);
            if($.trim(recentchat)!="No result"){
                $('#chatFrame').attr('src', 'chatBox.html?chatMate='+recentchat[0].name);
                $.each(recentchat, function (index, chatMate) {
                    $('#recentChat').append(
                        '<div class="border border-primary">'+
                        '   <a class="btn btn-outline-primary btn-block p-1" href="chatBox.html?chatMate='+chatMate.name+'" target="chatFrame">'+chatMate.name+'</a>'+
                        '</div><br>')
                })
            }
        }
    })

    // $.ajax({
    //     type: 'GET',
    //     url: 'api/message.php/mostRecent',
    //     data: {username:getCookie('username')},
    //     success: function (data){
    //         var mostrecentchat = JSON.parse(data);
    //         if($.trim(mostrecentchat)!="No result"){
    //             $('#chatFrame').attr('src', 'chatBox.html?chatMate='+mostrecentchat.name);
    //         }
    //     }
    // })
})