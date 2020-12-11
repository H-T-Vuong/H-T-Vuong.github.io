$(function(e) {
    $("#addSubjectBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if (valid) {
            //GET INPUT
            const username = getCookie('username')
            const subject  = $('#subject').val();
            var price = $('#price').val();
            var description = $('#description').val();
            price = parseFloat(price).toFixed(2);
            // SEND USERNAME AND PASSWORD TO SERVER
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/DuhocMy/api/subject.php/subject',
                data: {username: username, subject: subject, price:price, description: description},
                success: function (data) {
                    var success = JSON.parse(data);
                    if ($.trim(success) == "Success") {
                        Swal.fire({
                            title: 'Success',
                            text: 'Register subject successfully!',
                            icon: 'success'
                        })
                        setTimeout(' window.location.reload()', 500);
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
