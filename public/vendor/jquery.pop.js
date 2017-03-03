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

  $("#registerBtn").click(function(e) {
    e.preventDefault();
    var name = $("#first_name").val();
    var lastname = $("#last_name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    if (!name || !lastname || !email|| !password){
      return alert("Please fill up the whole form");
    }else{
      $("#register").css("display", "none");
    }

    $.ajax({
      method: "POST",
      url:"/register"
    }).done((data) => {
      console.log(data)
      if (data === "OK") {
        $('form').hide();
        $("#contactdiv").css("background: white;")
      } else {
        alert("Oops something went wrong");
      }
    })

  });


  $("#loginbtn").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();
    if (!email|| !password){
    alert("Username or Password was Wrong");
      }else{
    $("#logindiv").css("display", "none");
      }
    });
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
