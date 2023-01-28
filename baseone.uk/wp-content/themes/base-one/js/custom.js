jQuery(function($) {
    "use strict";
    const cookiesSetting = {
        cookieName: "_base_time_stamp_data",
        informerElement: ".cookies-informer",
        init: function() {
            $(document).ready(function() {
                if (!cookiesSetting.readCookie(cookiesSetting.cookieName) == true) {
                    setTimeout(function() {
                        $(cookiesSetting.informerElement).addClass("active");
                    }, 4000)
                }
            });
            cookiesSetting.close();
            cookiesSetting.accept();
        },
        close: function() {
            $(document).on("click", `${cookiesSetting.informerElement} .close`, function() {
                $(this).parents(cookiesSetting.informerElement).removeClass("active");
            });
        },
        accept: function() {
            $(document).on("click", ".set-cookies", function() {
                cookiesSetting.createCookie(cookiesSetting.cookieName, true, 30);
                $(this).parents(cookiesSetting.informerElement).removeClass("active");
            });
        },
        eraseCookie: function(name) {
            cookiesSetting.createCookie(name, "", -1);
        },
        readCookie: function(name) {
            var nameEQ = encodeURIComponent(name) + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0)
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
            return null;
        },
        createCookie: function(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = encodeURIComponent(name) +
                "=" +
                encodeURIComponent(value) +
                expires +
                "; path=/";
        }
    }
    cookiesSetting.init();
});