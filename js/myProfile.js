$(function (e){
    if (getCookie('username') != ''){
        $.ajax({
            type: 'GET',
            url: 'api/user.php/user',
            data: {username: getCookie('username')},
            success: function (data) {
                const userInfo = JSON.parse(data);
                $('#avatar').attr("src", "img/avatar/"+userInfo.avatar);
                $('#fullname').append(userInfo.fullname);
                $('#email').append(userInfo.email);
                $('#tel').append(userInfo.tel);
                $('#bio').append(userInfo.bio);
            }
        });
    }else if(getCookie('username')===''){
        window.location.href="home.html";
    }

    $.ajax({
        type: 'GET',
        url: '/DuhocMy/api/subject.php/subject',
        data: {username: getCookie('username')},
        success: function (data) {
            const subjects = JSON.parse(data);
            if(subjects!="No result"){
                $('#myTab').append('                            <li class="nav-item">\n' +
                    '                                <a class="nav-link" id="tutor-tab" data-toggle="tab" href="#tutor" role="tab" aria-controls="tutor" aria-selected="true">Tutor</a>\n' +
                    '                            </li>');
                $.each(subjects, function (index, subject) {
                    $('#displaySubjects').append(
                        '   <div class="col-auto text-left mt-3">\n' +
                        '       <div class="card" style="width: 18rem;" id="subject' + subject.subjectId + '">\n' +
                        '           <div class="card-body">\n' +
                        '               <h5 class="card-title">Subject: ' + subject.subject + '</h5>\n' +
                        '               <h6 class="card-subtitle mb-2 text-muted">Price: $' + subject.price + '/hour</h6>\n' +
                        '               <div class="card-text">Tutor: ' + subject.tutorName + '</div>\n' +
                        '               <div class="card-text" style="white-space: pre-wrap;">' + subject.description + '</div>\n' +
                        '               <input type = submit class="btn btn-primary" id="removeSubjectBtn'+subject.subjectId+'" value="Remove">'+
                        '           </div>\n' +
                        '       </div>\n' +
                        '   </div>\n'
                    );

                    $('#removeSubjectBtn'+subject.subjectId).click(function (e){
                        var subjectId = subject.subjectId;
                        Swal.fire({
                            title: 'Remove Confirm',
                            text: 'Are you sure removing this subject from your profile?',
                            icon: 'question',
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    type: 'POST',
                                    url: 'api/subject.php/removeSubject',
                                    data: {username: getCookie('username'), subjectId:subjectId},
                                    success: function (data) {
                                        const success = JSON.parse(data);
                                        if ($.trim(success) == "Success") {
                                            Swal.fire({
                                                title: 'Success',
                                                text: 'Subject remove successfully!',
                                                icon: 'success'
                                            })
                                            setTimeout('window.location.reload()',500)
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
                    })
                });
            }

        }
    });

    $.ajax({
        type: 'GET',
        url: '/DuhocMy/api/room.php/room',
        data: {username: getCookie('username')},
        success: function (data) {
            const rooms = JSON.parse(data);
            if(rooms!="No result"){
                $('#myTab').append('                            <li class="nav-item">\n' +
                    '                                <a class="nav-link" id="rental-tab" data-toggle="tab" href="#renter" role="tab" aria-controls="rental" aria-selected="false">Rental</a>\n' +
                    '                            </li>');
                $.each(rooms, function (index, room) {
                    $('#displayRentalInfo').append(
                        '<div class="col-auto text-left mt-3">\n' +
                        '                        <div class="card" style="width: 36rem;">\n' +
                        '                            <div id="carousel'+room.rentalId+'" class="carousel slide" data-ride="carousel">\n' +
                        '                                <div class="carousel-inner" id="rentalImg'+room.rentalId+'">\n' +
                        '                                </div>\n' +
                        '                                <a class="carousel-control-prev" href="#carousel'+room.rentalId+'" role="button" data-slide="prev">\n' +
                        '                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
                        '                                    <span class="sr-only">Previous</span>\n' +
                        '                                </a>\n' +
                        '                                <a class="carousel-control-next" href="#carousel'+room.rentalId+'" role="button" data-slide="next">\n' +
                        '                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
                        '                                    <span class="sr-only">Next</span>\n' +
                        '                                </a>\n' +
                        '                            </div>\n' +
                        '\n' +
                        '                            <div class="card-body">\n' +
                        '                               <h5 class="card-title">Renter: ' + room.renterFullname + '</h5>\n' +
                        '                               <h6 class="card-subtitle mb-2 text-muted">Price: $' + room.price + '/month</h6>\n' +
                        '                               <div class="card-text">Address: ' + room.address +', '+room.city+', '+ room.state+', '+room.zip +'</div>\n' +
                        '                               <div class="card-text" style="white-space: pre-wrap;">' + room.description+'</div>\n'+
                        '                               <input type = submit class="btn btn-primary" id="removeRoomBtn'+room.rentalId+'" value="Remove">'+
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>'
                    );

                    var folder = "img/room/"+room.gallery+"/";
                    $.ajax({
                        url : folder,
                        success: function (data) {
                            var imgs =[];
                            $(data).find("a").attr("href", function (i, val) {
                                if( val.match(/\.(jpe?g|png|gif)$/) ) {
                                    imgs.push(folder + val)
                                }
                            });
                            $("#rentalImg"+room.rentalId).append('<div class="carousel-item active">\n' +
                                '      <img class="d-block w-100" src="'+imgs[0]+'" alt="First slide"></div>')
                            for(let i =1; i< imgs.length; i++){
                                $("#rentalImg"+room.rentalId).append('<div class="carousel-item">\n' +
                                    '      <img class="d-block w-100" src="'+imgs[i]+'" alt="First slide"></div>')
                            }
                        }
                    });

                    $('#removeRoomBtn'+room.rentalId).click(function (e){
                        var rentalId = room.rentalId;
                        Swal.fire({
                            title: 'Remove Confirm',
                            text: 'Are you sure removing this rental room from your profile?',
                            icon: 'question',
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    type: 'POST',
                                    url: 'api/room.php/removeRoom',
                                    data: {username: getCookie('username'), rentalId:rentalId},
                                    success: function (data) {
                                        const success = JSON.parse(data);
                                        if ($.trim(success) == "Success") {
                                            Swal.fire({
                                                title: 'Success',
                                                text: 'Room remove successfully!',
                                                icon: 'success'
                                            })
                                            setTimeout('window.location.reload()',500)
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
                    })
                });
            }

        }
    });

    $.ajax({
        type: 'GET',
        url: '/DuhocMy/api/job.php/job',
        data: {username: getCookie('username')},
        success: function (data) {
            const jobs = JSON.parse(data);
            if(jobs!="No result"){
                $('#myTab').append('                            <li class="nav-item">\n' +
                    '                                <a class="nav-link" id="jobPost-tab" data-toggle="tab" href="#recruiter" role="tab" aria-controls="jobPost" aria-selected="false">Job Posting</a>\n' +
                    '                            </li>');
                $.each(jobs,function (index, job){
                    $('#displayJobs').append(
                        '<div class="col-auto text-left mt-3">\n' +
                        '                        <div class="card" style="width: 36rem;">\n' +
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
                        '                               <div class="card-text" style="white-space: pre-wrap;">' + job.description+'</div>\n' +
                        // '                               <input type = submit class="btn btn--outline-primary" id="newResumeBtn'+job.jobPostId+'" value="All Résummé">'+
                        '                               <input type = submit class="btn btn-primary" id="removeJobBtn'+job.jobPostId+'" value="Remove">'+
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

                    $('#newResummeBtn'+job.jobPostId).click(function (e){
                        var jobPostId = job.jobPostId;
                    });

                    $('#removeJobBtn'+job.jobPostId).click(function (e){
                        var jobPostId = job.jobPostId;
                        Swal.fire({
                            title: 'Remove Confirm',
                            text: 'Are you sure removing this job post from your profile?',
                            icon: 'question',
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    type: 'POST',
                                    url: 'api/job.php/removeJob',
                                    data: {username: getCookie('username'), jobPostId:jobPostId},
                                    success: function (data) {
                                        const success = JSON.parse(data);
                                        if ($.trim(success) == "Success") {
                                            Swal.fire({
                                                title: 'Success',
                                                text: 'Job post remove successfully!',
                                                icon: 'success'
                                            })
                                            setTimeout('window.location.reload()',500)
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
                    })

                });
            }
        },
    });

    $.ajax({
        type: 'GET',
        url: '/DuhocMy/api/group.php/group',
        data: {username: getCookie('username')},
        success: function (data) {
            const groups = JSON.parse(data);
            if(groups!="No result"){
                $('#myTab').append('                            <li class="nav-item">\n' +
                    '                                <a class="nav-link" id="group-tab" data-toggle="tab" href="#group" role="tab" aria-controls="groupPost" aria-selected="false">Group</a>\n' +
                    '                            </li>');
                $.each(groups,function (index, group){
                    $('#displayGroups').append(
                        '<div class="col-auto text-left mt-3">\n' +
                        '                        <div class="card" style="width: 36rem;">\n' +
                        '                            <div id="carousel'+group.groupId+'" class="carousel slide" data-ride="carousel">\n' +
                        '                                <div class="carousel-inner" id="groupImg'+group.groupId+'">\n' +
                        '                                </div>\n' +
                        '                                <a class="carousel-control-prev" href="#carousel'+group.groupId+'" role="button" data-slide="prev">\n' +
                        '                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
                        '                                    <span class="sr-only">Previous</span>\n' +
                        '                                </a>\n' +
                        '                                <a class="carousel-control-next" href="#carousel'+group.groupId+'" role="button" data-slide="next">\n' +
                        '                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
                        '                                    <span class="sr-only">Next</span>\n' +
                        '                                </a>\n' +
                        '                            </div>\n' +
                        '\n' +
                        '                            <div class="card-body">\n' +
                        '                               <h5 class="card-title">' + group.groupName + '</h5>\n' +
                        '                               <h6 class="card-subtitle mb-2 text-muted">Address: ' + group.address +', '+group.city+', '+ group.state+', '+group.zip + '</h6>\n' +
                        '                               <div class="card-text" style="white-space: pre-wrap;">' + group.description+'</div>\n' +
                        '                               <input type = submit class="btn btn-primary" id="removeGroupBtn'+group.groupId+'" value="Remove">'+
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>'
                    );

                    var folder = "img/group/"+group.gallery+"/";
                    $.ajax({
                        url : folder,
                        success: function (data) {
                            var imgs =[];
                            $(data).find("a").attr("href", function (i, val) {
                                if( val.match(/\.(jpe?g|png|gif)$/) ) {
                                    imgs.push(folder + val)
                                }
                            });
                            $("#groupImg"+group.groupId).append('<div class="carousel-item active">\n' +
                                '      <img class="d-block w-100" src="'+imgs[0]+'" alt="First slide"></div>')
                            for(let i =1; i< imgs.length; i++){
                                $("#groupImg"+group.groupId).append('<div class="carousel-item">\n' +
                                    '      <img class="d-block w-100" src="'+imgs[i]+'" alt="First slide"></div>')
                            }
                        }
                    });


                    $('#removeGroupBtn'+group.groupId).click(function (e){
                        var groupId = group.groupId;
                        Swal.fire({
                            title: 'Remove Confirm',
                            text: 'Are you sure removing this group from your profile?',
                            icon: 'question',
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    type: 'POST',
                                    url: 'api/group.php/removeGroup',
                                    data: {username: getCookie('username'), groupId:groupId},
                                    success: function (data) {
                                        const success = JSON.parse(data);
                                        if ($.trim(success) == "Success") {
                                            Swal.fire({
                                                title: 'Success',
                                                text: 'Group remove successfully!',
                                                icon: 'success'
                                            })
                                            setTimeout('window.location.reload()',500)
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
                    })

                });
            }
        },
    });


    $.ajax({
        type: 'GET',
        url: '/DuhocMy/api/rating.php/rate',
        data: {username: getCookie('username')},
        success: function (data) {
            const aveRate = JSON.parse(data);
            if(aveRate!="No result"){
                $('.rateDisplay').append(rateValue(parseInt(aveRate.aveRateVal)));
                $('#rate').append(Math.round((parseFloat(aveRate.aveRateVal) + Number.EPSILON) * 100) / 100+'/5');
            }

        }
    });

});