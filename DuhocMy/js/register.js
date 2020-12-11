$(function(e){
    $('#setAvatar').bind("click" , function () {
        $('#pic').click();
    });


    $('#pic').change(function(e){
        if (this.files && this.files[0]) {

            var filename= $('#pic').val();
            var indexDot = filename.lastIndexOf('.')+1;
            var fileExt = filename.substr(indexDot, filename.length).toLowerCase();
            if (fileExt!= "jpg"&& fileExt!="png" && fileExt !="jpeg" && fileExt !="gif")
            {
                Swal.fire({
                    title: 'Error',
                    text: 'Only .jpg/.jpeg/.png/.gif file is allowed here!',
                    icon: 'error'
                })
            }else{
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#setAvatar')
                        .attr('src', e.target.result);
                };

                reader.readAsDataURL(this.files[0]);
            }

        }
    });

    $("#registerBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if(valid){
            // retrieve form input
            const username = $("#username").val();
            const password = $("#password").val();
            const repPassword = $("#repPassword").val();
            const email = $("#email").val();
            const firstname = $("#firstname").val();
            const lastname = $("#lastname").val();

            if(password != repPassword){
                Swal.fire({
                    'title': 'Error',
                    'text': "Password doesn't match",
                    'type': 'error'
                })
            }
            else{
                var formData = new FormData();
                e.preventDefault();

                if($('#pic')[0].files[0] && $('#pic')[0].files){
                    formData.append("file",$('#pic')[0].files[0]);
                }
                formData.append('username', username);
                formData.append('password', password);
                formData.append('email', email);
                formData.append('firstname', firstname);
                formData.append('lastname', lastname);

                // send form data to the server side php script.
                $.ajax({
                    type: 'POST',
                    url: 'api/user.php/user',
                    data: formData,
                    processData:false,
                    contentType:false,
                    success: function(data){
                        var success = JSON.parse(data);
                        if ($.trim(success) == "Success"){
                            Swal.fire({
                                title: 'Success',
                                text: 'Register successfully!',
                                icon: 'success'
                            })
                            setTimeout(' window.location.href =  "./login.html"', 1000);
                        }else{
                            Swal.fire({
                                title: 'Error',
                                text: data,
                                icon: 'error'
                            })
                        }
                    },
                    error: function(data){
                        Swal.fire({
                            title: 'Errors',
                            text: 'There were errors connecting to server.',
                            icon: 'error'
                        })
                    }
                });
            }
        }
    });
});
