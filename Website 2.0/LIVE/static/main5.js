$(document).ready(function () {

    // window.addEventListener("hashchange", function() { scrollBy(100, -300) })

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('#instant-sms').html("07506874100");
        $('#instant-call').html("07506874100");
        $('#instant-email').html("bartek@cfcomputers.co.uk");
    }

    function repeat(str, times) {
        return new Array(times + 1).join(str);
    }

    var xmlhttp = new XMLHttpRequest();
    var requestJson = JSON.stringify({
        "type": "get-times"
    });

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var JSONData = JSON.parse(xmlhttp.responseText);

            $(".call-back-time-display").html(JSONData.call);
            $("#visit-time-display").html(JSONData.visit);
        }
    };
    xmlhttp.open("POST", "/", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(requestJson);
    $('.modal-trigger').leanModal();

    var xmlhttpreviews = new XMLHttpRequest();
    var requestJson = JSON.stringify({
        "type": "review"
    });
    xmlhttpreviews.onreadystatechange = function () {
        if (xmlhttpreviews.readyState == 4 && xmlhttp.status == 200) {
            var finalHTML = "";
            var JSONData = JSON.parse(xmlhttpreviews.responseText);
            var reviews = JSONData.reviews;
            var star = "<i class=\"material-icons rating-star\">star</i>";
            var emptystar = "<i class=\"material-icons rating-star\">star_border</i>";
            for (var review in reviews) {
                var current = reviews[review];
                finalHTML += "<div class ='review'>"
                finalHTML += "<div class = 'review-stars'>" + repeat(star, parseInt(current.stars)) + repeat(emptystar, parseInt(current.emptystars)) + "<div class = 'review-date'>" + current.date + "</div></div>"
                finalHTML += "<div class = 'review-content'>" + current.content + "</div>"
                finalHTML += "<div class = 'review-name'><a target=\"_blank\" href = '" + current.url + "'> - " + current.name + "</a></div>"
                finalHTML += "</div>"
            }
            $("#reviewsCard").html(finalHTML);
        }
    };
    xmlhttpreviews.open("POST", "/", true);
    xmlhttpreviews.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttpreviews.send(requestJson);


    $('#callback-number').keypress(function (e) {
        if (e.which == 13) {
            $('#callback-number').blur();
            $("#callback-button").trigger('click');
        }
    });

    $('#post-code').keypress(function (e) {
        if (e.which == 13) {
            $('#post-code').blur();
            $("#coverage-button").trigger('click');
        }
    });

    $("#callback-button").click(function () {
        if ($("#callback-number").val().length == 0) {
            Materialize.toast('Please enter your phone number', 4000);
            return;
        }
        var xmlhttp = new XMLHttpRequest();
        var now = new Date(Date.now());
        var requestJson = JSON.stringify({
            "number": $("#callback-number").val(),
            "time": now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
            "type": "callback"
        });
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                Materialize.toast('Callback requested succesfully, please stay by your phone', 8000);
                return;
            }
        };
        xmlhttp.open("POST", "/", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(requestJson);
    });

    $("#coverage-button").click(function () {
        if ($("#post-code").val().length == 0) {
            Materialize.toast('Please enter your post-code', 4000);
            return;
        }
        var xmlhttp = new XMLHttpRequest();
        var requestJson = JSON.stringify({
            "postcode": $("#post-code").val(),
            "type": "postcode"
        });
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var JSONData = JSON.parse(xmlhttp.responseText);
                if (JSONData.result == true) {
                    $("#post-code-display").html("<span class='green-text'>You qualify for free in-home visits & free pickup & delivery</span>")
                    Materialize.toast('You qualify for free in-home visits & free pickup & delivery', 6000);
                } else if (JSONData.result == false) {
                    $("#post-code-display").html("<span class='red-text'>Sadly you are out of service coverage. If you wish to use my services you will have to deliver your computer to me at 220 Wallace Street, G5 8AF, Glasgow. Please request a callback, text, or e-mail me for more info.</span>")
                    Materialize.toast('Sadly you are out of service coverage. If you wish to use my services you will have to deliver your computer to me at 220 Wallace Street, G5 8AF, Glasgow. Please request a callback, text, or e-mail me for more info.', 6000);
                } else {
                    $("#post-code-display").html("<span>Invalid Post-Code</span>")
                    Materialize.toast('Invalid Post-Code', 3000);
                }

            }
        };
        xmlhttp.open("POST", "/", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(requestJson);
    })


}); // Document ready ending