$(function(e) {
    $("#searchBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if (valid) {
            //GET INPUT
            const city = $('#city').val();
            const state = $('#state').val();
            const zip = $('#zip').val();
            const groupName = $('#groupName').val();

            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: 'api/group.php/group',
                data: {city:city, state:state, zip:zip, groupName:groupName},
                success: function (data) {
                    const groups = JSON.parse(data);
                    if(groups!="No result"){
                        $('#displayGroups').remove();
                        $('#displayGroupsBox').append('<div class="row" id="displayGroups"></div>')
                        $.each(groups,function (index, group){
                            $('#displayGroups').append(
                                '<div class="col-auto text-left mt-3">\n' +
                                '                        <div class="card" style="width: 18rem;">\n' +
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
                                '                               <button class = "btn btn-primary" id ="groupBtn'+group.groupId+'">More detail</button>'+
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

                            $('#groupBtn'+group.groupId).click(function (e) {
                                if (getCookie("username") != "") {
                                    if (getCookie("username") == group.leader){
                                        window.location.href ="myProfile.html";
                                    }else{
                                        window.location.href = "userProfile.html?profileName=" + group.leader+'&groupId='+group.groupId;
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
