$(function(e) {
    $("#loginBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if (valid) {
            //GET INPUT
            const username = $("#username").val();
            const password = $("#password").val();
            // SEND USERNAME AND PASSWORD TO SERVER
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: 'api/login.php/login',
                data: {username: username, password: password},
                success: function (data) {
                    var userInfo = JSON.parse(data);
                    if (userInfo.hasOwnProperty('username')) {
                        setLoginCookie(userInfo.username);
                        window.location.href =  "home.html";
                    } else {
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
});
