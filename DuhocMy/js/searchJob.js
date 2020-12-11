$(function(e) {
    $("#searchBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if (valid) {
            //GET INPUT
            const city = $('#city').val();
            const state = $('#state').val();
            const zip = $('#zip').val();
            const companyName = $('#compName').val();
            var salary = $('#salary').val();
            const jobType = $('#selectTypeOfJob').val();
            const position = $('#position').val();


            // SEND USERNAME AND PASSWORD TO SERVER
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: 'api/job.php/job',
                data: {city:city, state:state, zip:zip, companyName:companyName, salary:salary, jobType:jobType, position:position},
                success: function (data) {
                    const jobs = JSON.parse(data);
                    if(jobs!="No result"){
                        $('#displayJobs').remove();
                        $('#displayJobsBox').append('<div class="row" id="displayJobs"></div>')
                        $.each(jobs,function (index, job){
                            $('#displayJobs').append(
                                '<div class="col-auto text-left mt-3">\n' +
                                '                        <div class="card" style="width: 18rem;">\n' +
                                '                            <div id="carousel'+job.jobPostId+'" class="carousel slide" data-ride="carousel">\n' +
                                '                                <div class="carousel-inner" id="jobImg'+job.jobPostId+'">\n' +
                                '                                </div>\n' +
                                '                                <a class="carousel-control-prev" href="#carousel'+job.jobPostId+'" role="button" data-slide="prev">\n' +
                                '                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
                                '                                    <span class="sr-only">Previous</span>\n' +
                                '                                </a>\n' +
                                '                                <a class="carousel-control-next" href="#carousel'+job.jobPostId+'" role="button" data-slide="next">\n' +
                                '                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
                                '                                    <span class="sr-only">Next</span>\n' +
                                '                                </a>\n' +
                                '                            </div>\n' +
                                '\n' +
                                '                            <div class="card-body">\n' +
                                '                               <h5 class="card-title">Recruiting: ' + job.jobTitle + '</h5>\n' +
                                '                               <h6 class="card-subtitle mb-2 text-muted">' + job.companyName + '</h6>\n' +
                                '                               <div class="card-text">Address: ' + job.address +', '+job.city+', '+ job.state+', '+job.zip +'</div>\n' +
                                '                               <div class="card-text">Salary: $' + job.salary+'/month</div>\n' +
                                '                               <button class = "btn btn-primary" id ="jobBtn'+job.jobPostId+'">More detail</button>'+
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>'
                            );

                            var folder = "img/job/"+job.gallery+"/";
                            $.ajax({
                                url : folder,
                                success: function (data) {
                                    var imgs =[];
                                    $(data).find("a").attr("href", function (i, val) {
                                        if( val.match(/\.(jpe?g|png|gif)$/) ) {
                                            imgs.push(folder + val)
                                        }
                                    });
                                    $("#jobImg"+job.jobPostId).append('<div class="carousel-item active">\n' +
                                        '      <img class="d-block w-100" src="'+imgs[0]+'" alt="First slide"></div>')
                                    for(let i =1; i< imgs.length; i++){
                                        $("#jobImg"+job.jobPostId).append('<div class="carousel-item">\n' +
                                            '      <img class="d-block w-100" src="'+imgs[i]+'" alt="First slide"></div>')
                                    }
                                }
                            });

                            $('#jobBtn'+job.jobPostId).click(function (e) {
                                if (getCookie("username") != "") {
                                    if (getCookie("username") == job.reruiter) {
                                        window.location.href = "myProfile.html";
                                    } else {
                                        window.location.href = "userProfile.html?profileName=" + job.recruiter + '&jobPostId=' + job.jobPostId;
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
