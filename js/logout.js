function logout(){

    $.ajax({
        type: 'POST',
        url: 'api/login.php/logout',
        success: function (data) {
            var success = JSON.parse(data);
            if ($.trim(success) == "Success"){
                Swal.fire({
                    text: "Logging Out",
                    icon:'success',
                    showConfirmButton:false
                })
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
    deleteCookie('username');
    setTimeout("location.href = 'home.html'",1000);
}


