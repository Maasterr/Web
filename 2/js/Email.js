$(document).ready(function() {

    $("#validate").keyup(function(){

        var email = $("#validate").val();

        if(email != 0)
        {
            if(isValidEmailAddress(email))
            {
                $(".content-blog-mail-input").css({
                    "border": "1px solid green"
                });
                $(".email").css({
                    "color": "#f6f6f6"
                });
            } else {
                $(".content-blog-mail-input").css({
                    "border": "1px solid red"
                });

                $(".email").css({
                    "color": "red"


                });
                $(".email").css({

                    "display": "block"

                });
            }
        } else {
            $(".content-blog-mail-input").css({
                "border": "0"
            });
            $(".email").css({

                "display": "none"

            });
        }

    });

});


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}