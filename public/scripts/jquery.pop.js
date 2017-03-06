$(document).ready(function() {
  $("#onclick").click(function() {
    $("#contactdiv").css("display", "block");
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
      url: "/register",
      data:{
        first_name: first_name,
        last_name: last_name,
        email: email,
        pasword: password
      }
    })
    .done((data) => {
      if (data === "OK") {
        $(".form-horizontal").hide();
      } else {
        alert("Oooops something went wrong here!");
      }
    })
  });


  $("#loginbtn").submit(function(e) {
    e.preventDefault();
    var email = $("#email-login").val();
    var password = $("#password-login").val();
    // if (!email || !password) {
    //    alert("Please enter both email and password");
    //    } else {
    $.ajax({
      method:"POST",
      url: "/login",
      data:{
        email: email,
        password: password
      }
    })
    .done(function(response) {
      if( {response.email = email}){
        $("#contactdiv").css("display", "none");
      } else{
        alert("Oops...something went wrong");
      }
      console.log(response);
      debugger;
    })
  })
});
