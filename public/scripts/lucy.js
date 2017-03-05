$(document).ready(function(){
  $(".material-icons").click(function(){

    $.ajax({
      method:"POST",
      url:"/users/:likes"
    })
    .done(function(){
    $(".material-icons").hide();
    $(".icons-color").show();

    })

  })

})
