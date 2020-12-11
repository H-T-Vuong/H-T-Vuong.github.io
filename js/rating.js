
    // Check Radio-box
    function rateSubmit(username){
        $(".rating input:radio").attr("checked", false);

        $('.rating input').click(function () {
            $(".rating span").removeClass('checked');
            $(this).parent().addClass('checked');
        });

        $('.rating input:radio').change(
            function(){
                const userRating = this.value;
                Swal.fire({
                    title: 'Rating Confirm',
                    html: 'Rate '+username+' '+userRating+'/5<br><div class="rateDisplay">'+rateValue(userRating)+'</div>',
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: 'POST',
                            url: 'api/rating.php/rate',
                            data: {username: username, rater: getCookie('username'), rateValue: userRating},
                            success: function (data) {
                                const success = JSON.parse(data);
                                if ($.trim(success) == "Success") {
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
                    else {
                        window.location.reload();
                    }
                });
            });
}

