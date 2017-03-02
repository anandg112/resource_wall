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

$("#registerBtn").click(function() {
var name = $("#first_name").val();
var lastname = $("#last_name").val();
  if (!lastname || !name || !email){
    alert("Please Fill All Fields");
  }else{
    if (validateEmail(email)) {
      $("#contactdiv").css("display", "none");
    }else {
      alert('Invalid Email Address');
    }
  function validateEmail(email) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
      if (filter.test(email)) {
        return true;
      }else {
        return false;
      }
    }
  }
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
