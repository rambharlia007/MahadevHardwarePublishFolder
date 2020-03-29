var validation = $(function () {

    function removeWarningMessage(e) {
        setTimeout(function () {
            e.next("span").remove();
        }, 2000);
    }

    return {
        isFormDataValid: function () {
            var x;
            $("form").each(function () {
                x = $(this).find(':input');
            });
            for (i = 0; i < x.length; i++) {
                var ele = $(x[i]);
                ele.focusout();
            }
            return $(".custom-alert").length;
        },
        isTableDataValid: function (id) {
            var x = $("#" + id).find(":input");
            for (i = 0; i < x.length; i++) {
                var ele = $(x[i]);
                ele.focusout();
            }
            return $(".custom-alert").length;
        },
        register: function () {
            $(':input[type="number"]').keypress(function (e) {
                var inputKeyCode = e.keyCode ? e.keyCode : e.which;
                if (inputKeyCode !== null) {
                    if (inputKeyCode === 45) {
                        $(e.target).next("span").remove();
                        $(e.target).after("<span class='custom-alert'>negative numbers are not allowed</span>");
                        e.preventDefault();
                        removeWarningMessage($(e.target));
                    }
                }
            });

            $(':input[cv="phone"]').focusout(function (e) {
                $(e.target).removeClass("correct");
                var value = $(e.target).val();
                var count = value.length;
                //if (!count) {
                //    $(e.target).next("span").remove();
                //    return;
                //}

                if (value.includes("+") && count !== 14 && value.includes(" ")) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Phone number is not valid.</span>");
                }
                else if (value.includes("+") && count !== 13 && !value.includes(" ")) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Phone number is not valid.</span>");
                }
                else if (!value.includes("+") && count !== 10) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Phone number is not valid.</span>");
                }
                else if (value.length > 0) {
                    $(e.target).addClass("correct");
                    $(e.target).next("span").remove();
                }

                if (value.length < 1) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Field is required.</span>");
                }
            });

            $(':input[cv="phone"]').keypress(function (e) {
                var validKeys = ["+", " "];
                var key = e.key.toUpperCase();
                if (key !== null && (isNaN(parseInt(key)) && !validKeys.includes(key))) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Phone number is not valid.</span>");
                    e.preventDefault();
                    removeWarningMessage($(e.target));
                }
            });

            $(':input[cv="gstin"]').focusout(function (e) {
                $(e.target).removeClass("correct");
                var gstinFormat = new RegExp('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$');
                var value = $(e.target).val();
                if ((!gstinFormat.test(value) && value.length > 0)) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>GSTIN number is not valid.</span>");
                }
                else if (value.length < 1) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Field is required.</span>");
                }
                else if (value.length > 0) {
                    $(e.target).addClass("correct");
                    $(e.target).next("span").remove();
                }
            });

            $(':input[cv="required"]').focusout(function (e) {
                $(e.target).removeClass("correct");
                var compare = RegExp("\\d{1,}");
                var value = $(e.target).val();
                if (value.length < 1) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Field is required.</span>");
                } else if (value.length > 0) {
                    $(e.target).addClass("correct");
                    $(e.target).next("span").remove();
                }
            });

            $(':input[type="email"]').focusout(function (e) {
                $(e.target).removeClass("correct");
                var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var value = $(e.target).val();
                if ((!email.test(value) && value.length > 0)) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Email Id is not valid.</span>");
                }
                else if (value.length < 1) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Field is required.</span>");
                }
                else if (value.length > 0) {
                    $(e.target).addClass("correct");
                    $(e.target).next("span").remove();
                }
            });

            $(':input[cv="username"]').focusout(function (e) {
                $(e.target).removeClass("correct");
                var userName = /^[a-z0-9_-]{3,16}$/;
                var value = $(e.target).val();
                if ((!userName.test(value) && value.length > 0)) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>user name is not valid.</span>");
                }
                else if (value.length < 1) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Field is required.</span>");
                }
                else if (value.length > 0) {
                    $(e.target).addClass("correct");
                    $(e.target).next("span").remove();
                }
            });

            $(':input[cv="confirmpassword"]').focusout(function (e) {
                $(e.target).removeClass("correct");
                $("#password").removeClass("correct");
                var password = $("#password").val();
                var confirmPassword = $(e.target).val();
                if (password !== confirmPassword) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>password and confirm password not matching.</span>");
                }
                else if (password.length < 1) {
                    $(e.target).next("span").remove();
                    $(e.target).after("<span class='custom-alert'>Field is empty.</span>");
                    $("#password").next("span").remove();
                    $("#password").after("<span class='custom-alert'>Field is empty.</span>");
                }
                else {
                    $("#password").addClass("correct");
                    $("#password").next("span").remove();
                    $(e.target).addClass("correct");
                    $(e.target).next("span").remove();
                }
            });
        }
    };
}());

