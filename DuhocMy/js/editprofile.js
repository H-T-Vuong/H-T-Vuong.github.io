$(function(e){

    //DISPLAY DEFAULT INFO
    if (getCookie('username') != ''){
        $.ajax({
            type: 'GET',
            url: 'api/user.php/user',
            data: {username: getCookie('username')},
            success: function (data) {
                const userInfo = JSON.parse(data);
                $('#setAvatar').attr("src", "img/avatar/"+userInfo.avatar);
                $('#editFirstname').val(userInfo.firstname);
                $('#editLastname').val(userInfo.lastname);
                $('#editEmail').val(userInfo.email);
                $('#editTel').val(userInfo.tel);
                $('#editBio').val(userInfo.bio);
            }
        });
    }else if(getCookie('username')===''){
        window.location.href="home.html";
    }

    //BROWSE PICTURE AND PREVIEW
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

    //CHANGE AVATAR BTN

   $('#changeAvatarBtn').click(function (e){
       const valid = this.form.checkValidity();
       if(valid){
           var formData = new FormData();
           e.preventDefault();
           if($('#pic')[0].files[0] && $('#pic')[0].files){
               formData.append("file",$('#pic')[0].files[0]);
               formData.append('username', getCookie('username'));
               $.ajax({
                   type:"POST",
                   url: "api/user.php/changeAvatar",
                   data: formData,
                   processData: false,
                   contentType: false,
                   success: function(data){
                       var success = JSON.parse(data);
                       if ($.trim(success) == "Success"){
                           Swal.fire({
                               title: 'Success',
                               text: 'Change profile picture successfully',
                               icon: 'success'
                           })
                           setTimeout(' window.location.href =  "myProfile.html"', 1000);
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
           else{
               Swal.fire({
                   title: 'Error',
                   text: "No file has been selected",
                   icon: 'error'
               })
           }

       }
   })

    //CHANGE GENERAL INFO
    $("#changeInfoBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if(valid){
            // retrieve form input
            const email = $("#editEmail").val();
            const firstname = $("#editFirstname").val();
            const lastname = $("#editLastname").val();
            const username = getCookie('username');
            const tel = $('#editTel').val();
            const bio = $('#editBio').val();
                e.preventDefault();
                // send form data to the server side php script.

                $.ajax({
                    type: 'POST',
                    url: 'api/user.php/changeInfo',
                    data:{firstname:firstname, lastname:lastname, email:email, username: username, tel:tel, bio:bio},
                    success: function(data){
                        var success = JSON.parse(data);
                        if ($.trim(success) == "Success"){
                            Swal.fire({
                                title: 'Success',
                                text: 'Info changed successfully!',
                                icon: 'success'
                            })
                            setTimeout(' window.location.href =  "myProfile.html"', 1000);
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
    });

    //CHANGE PASSWORD

    $("#changePasswordBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if(valid){
            // retrieve form input
            const currPassword = $('#currentPassword').val();
            const password = $('#newPassword').val();
            const repPassword = $('#repNewPassword').val();
            const username = getCookie('username');
            if(password != repPassword){
                Swal.fire({
                    'title': 'Error',
                    'text': "Password doesn't match",
                    'type': 'error'
                })
            }

            e.preventDefault();
            // send form data to the server side php script.

            $.ajax({
                type: 'POST',
                url: 'api/user.php/changePassword',
                data:{password:password, currentPassword:currPassword, username:username},
                success: function(data){
                    var success = JSON.parse(data);
                    if ($.trim(success) == "Success"){
                        Swal.fire({
                            title: 'Success',
                            text: 'Password Changed Successfully!',
                            icon: 'success'
                        })
                        setTimeout(' window.location.href =  "myProfile.html"', 1000);
                    }else{
                        Swal.fire({
                            title: 'Erorr',
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
    });

});
