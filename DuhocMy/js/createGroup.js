$(function(e){
    $('#setAvatar').bind("click" , function () {
        $('#pic').click();
    });


    $('#pic').change(function(e){
        $('#imgPrev').remove();
        $('#imgPrevBox').append('<div class = "row" id="imgPrev"></div>')
        if (this.files) {
            var filesAmount = this.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var filename = this.files[i].name;
                var indexDot = filename.lastIndexOf('.')+1;
                var fileExt = filename.substr(indexDot, filename.length).toLowerCase();
                if (fileExt!= "jpg"&& fileExt!="png" && fileExt !="jpeg" && fileExt !="gif") {
                    Swal.fire({
                        title: 'Error',
                        text: 'Only .jpg/.jpeg/.png/.gif file is allowed here!',
                        icon: 'error'
                    });
                }else{
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#imgPrev').append('<div class="col-auto m-2">\n' +
                            '      <img  class="imagePrev" src="'+e.target.result+'" alt="First slide">\n' +
                            '    </div>')
                    };
                    reader.readAsDataURL(this.files[i]);
                }

            }
        }
    });



    $("#addGroupBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if(valid){
            // retrieve form input
            const username = getCookie('username');
            const groupName = $('#orgName').val();
            const description = $('#groupDescription').val();
            const address = $('#address').val();
            const city = $('#city').val();
            const state = $('#state').val();
            const zip = $('#zipcode').val();

            var formData = new FormData();
            e.preventDefault();

            if( $('#pic')[0].files){
                for (let i = 0; i < $('#pic')[0].files.length; i++) {
                    formData.append("file[]",$('#pic')[0].files[i]);
                }
            }
            formData.append('username', username);
            formData.append('description', description);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('zip', zip);
            formData.append('groupName', groupName);


            // send form data to the server side php script.
            $.ajax({
                type: 'POST',
                url: 'api/group.php/group',
                data: formData,
                processData:false,
                contentType:false,
                success: function(data){
                    var success = JSON.parse(data);
                    if ($.trim(success) == "Success"){
                        Swal.fire({
                            title: 'Success',
                            text: 'Group created successfully!',
                            icon: 'success'
                        })
                        setTimeout(' window.location.reload()', 500);
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
});
