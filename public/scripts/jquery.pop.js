$(document).ready(function() {
  function popup() {
    $("#logindiv").css("display", "block");
  }
  $("#login #cancel").click(function() {
    $(this).parent().parent().hide();
  });
  $("#onclick").click(function() {
    $("#contactdiv").css("display", "block");
  });
  $("#contact #cancel").click(function() {
    $(this).parent().parent().hide();
  });

  $("#regBt").click(function(e) {
    e.preventDefault();
    var name = $("#first_name").val();
    var lastname = $("#last_name").val();
    var email = $("#email").val();
    var password = $("#password").val();

    if (!name || !lastname || !email || !password){
      return alert("Please fill up the whole form");
    }else{
      $("#regbox").css("display", "none");
    }

    $.ajax({
      method: "POST",
      url:"/register"
    }).done((data) => {
      if (data === "OK") {
        $(".form-horizontal").hide();
      } else {
        alert("Oops something went wrong");
      }
    })

  });


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
        $("#logindiv").css("display", "none");
      })

    }
  })
});












  // function validateEmail(email) {
  //   var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  //   if (filter.test(email)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  //
  // if (validateEmail(email)) {
  //   $("#contactdiv").css("display", "none");
  // }
  //});
