$(".login").submit(function (e) {
    e.preventDefault();
    let login = new Object();

    login.Email = $("input[name='email']").val();
    login.Password = $("input[name='password']").val();

    $.ajax({
        type: "POST",
        url: "login/login/",
        data: login,
        success: function (result) {
            console.log("Success", JSON.stringify(login))
            console.log(result)
            switch (result.status) {
                case 200:
                    window.location.replace("../account/")
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong Email or Password',
                    })
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed", JSON.stringify(login))
            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
        }
    });
    console.log(login)
});
   