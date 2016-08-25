$(document).ready(function() {

    var xmlhttp = new XMLHttpRequest();
    var requestJson = JSON.stringify({
        "type": "get-times"
    });
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var JSONData = JSON.parse(xmlhttp.responseText);
            $("#callback-time").html(JSONData.call);
            $("#visit-time").html(JSONData.visit);
        }
    };
    xmlhttp.open("POST", "/", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(requestJson);
    var time = new Date(Date.now());
    $("#service-active-status").html(time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }))
        //$("#callback-time").html("<b class='green-text text-darken-1'>3 mins</b>");
        //$("#visit-time").html("<b class='green-text text-darken-1'>45 mins</b>");

    $('#callback-number').keypress(function(e) {
        if (e.which == 13) {
            $('#callback-number').blur();
            $("#get-callback").trigger('click');
        }
    });

    $('#post-code-checker').keypress(function(e) {
        if (e.which == 13) {
            $('#post-code-checker').blur();
            $("#post-code-button").trigger('click');
        }
    });

    $("#get-callback").click(function() {
        var xmlhttp = new XMLHttpRequest();
        var now = new Date(Date.now());
        var requestJson = JSON.stringify({
            "number": $("#callback-number").val(),
            "time": now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
            "type": "callback"
        });
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                Materialize.toast('Callback requested succesfully, please stay by your phone', 8000);
                return;
            }
        };
        xmlhttp.open("POST", "/", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(requestJson);
    });

    $("#post-code-button").click(function() {
        var xmlhttp = new XMLHttpRequest();
        var requestJson = JSON.stringify({
            "postcode": $("#post-code-checker").val(),
            "type": "postcode"
        });
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var JSONData = JSON.parse(xmlhttp.responseText);
                if (JSONData.result == true) {
                    $("#post-code-status").html("<span class='green-text'>You qualify for free in-home visits & free pickup & delivery</span>")
                } else if (JSONData.result == false) {
                    $("#post-code-status").html("<span class='red-text'>Sadly you are out of service coverage. If you wish to use my services you will have to deliver your computer to me at 220 Wallace Street, G5 8AF, Glasgow. Please request a callback, text, or e-mail me for more info.</span>")
                } else {
                    $("#post-code-status").html("<span>Invalid Post-Code</span>")
                }

            }
        };
        xmlhttp.open("POST", "/", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(requestJson);
    })



}); // Document ready ending