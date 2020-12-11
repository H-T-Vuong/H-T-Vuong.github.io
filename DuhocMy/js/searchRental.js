$(function(e) {
    $("#searchBtn").click(function(e) {
        const valid = this.form.checkValidity();
        if (valid) {
            //GET INPUT
            const name = $("#renterName").val();
            const city = $('#city').val();
            const state = $('#state').val();
            const zip = $('#zip').val();
            const price = $("#price").val();

            // SEND USERNAME AND PASSWORD TO SERVER
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: 'api/room.php/room',
                data: {name: name, city:city, state:state, zip:zip, price:price},
                success: function (data) {
                    const rooms = JSON.parse(data);
                    if(rooms!="No result"){
                        $('#displayRooms').remove();
                        $('#displayRentalBox').append('<div class="row" id="displayRooms"></div>')
                        $.each(rooms,function (index, room){
                            $('#displayRooms').append(
                                '<div class="col-auto text-left mt-3">\n' +
                                '                        <div class="card" style="width: 18rem;">\n' +
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
                                '                               <button class = "btn btn-primary" id ="roomBtn'+room.rentalId+'">More detail</button>'+
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

                            $("#roomBtn"+room.rentalId).click(function (e) {
                                if (getCookie("username") != "") {
                                    window.location.href = "userProfile.html?profileName=" + room.renter+'&rentalId='+room.rentalId;
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
