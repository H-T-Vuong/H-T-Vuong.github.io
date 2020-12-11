$(function(e) {
    $("#searchBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if (valid) {
            //GET INPUT
            const name = $("#tutorsName").val();
            const subjectName = $("#subject").val();
            const price = $("#price").val();

            // SEND USERNAME AND PASSWORD TO SERVER
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: 'api/subject.php/subject',
                data: {name: name, subjectName: subjectName, price:price},
                success: function (data) {
                    const subjects = JSON.parse(data);
                    if(subjects!="No result"){
                        $('#displaySubjects').remove();
                        $('#displaySubjectsBox').append('<div class="row" id="displaySubjects"></div>')
                        $.each(subjects,function (index, subject){
                            $('#displaySubjects').append(
                                '   <div class="col-auto text-left mt-3">\n' +
                                '       <div class="card subjectCard" style="width: 18rem;" id="subject'+subject.subjectId+'">\n' +
                                '           <div class="card-body">\n' +
                                '               <h5 class="card-title">Subject: '+subject.subject+'</h5>\n' +
                                '               <h6 class="card-subtitle mb-2 text-muted">Price: $'+subject.price+'/hour</h6>\n' +
                                '               <div class="card-text">Tutor: '+subject.tutor+'</div>\n' +
                                '           </div>\n' +
                                '       </div>\n' +
                                '   </div>\n'
                            );
                            $("#subject"+subject.subjectId).click(function (e) {
                                if (getCookie("username") != "") {
                                    if (getCookie("username") == subject.tutor){
                                        window.location.href ="myProfile.html";
                                    }else{
                                        window.location.href = "userProfile.html?profileName=" + subject.tutor;
                                    }
                                } else if (getCookie("username") === "") {
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
                            });
                        });
                    } else {
                        Swal.fire({
                            text: 'No Result Found ',
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
