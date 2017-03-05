$(document).ready(function(e){
  $(".material-icons").submit(function(){
    $.ajax({
      method:"POST",
      url:"/users/:likes"
    })
    .done(function(){
    //e.preventDefault();
    $(".material-icons").hide();
    $(".icons-color").show();

    })

  })

})
