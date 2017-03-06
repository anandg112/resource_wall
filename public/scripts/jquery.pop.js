$(document).ready(function() {
  $("#onclick").click(function() {
    $("#contactdiv").css("display", "block");
  });

  // $("#regBt").click(function(e) {
  //   e.preventDefault();
  //   var name = $("#first_name").val();
  //   var lastname = $("#last_name").val();
  //   var email = $("#email").val();
  //   var password = $("#password").val();

  //   if (!name || !lastname || !email || !password){
  //     return alert("Please fill up the whole form");
  //   }else{
  //     $("#regbox").css("display", "none");
  //   }

  //   $.ajax({
  //     method: "POST",
  //     url:"/register"
  //   }).done((data) => {
  //     if (data === "OK") {
  //       $(".form-horizontal").hide();
  //     }
  //   })

  // });


  $("#loginbtn").submit(function(e) {
  var email = $("#email-login").val();
  var password = $("#password-login").val();
    if (!email.length || !password.length) {
     alert("Please enter both email and password");
     }else{

      $.ajax({
        method:"POST",
        url: "/login"
      })
      .done(function() {
        $("#contactdiv").css("display", "none");
      })

    }
  })
});
