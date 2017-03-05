$(document).ready(function(){
  $("#like").click(function(){
    let id = this.attr('movieId')
    let likes = this.attr('likes')

    $.ajax({
      method:"POST",
      url:"/users/:likes",
      data: {
        id: id ,
        likes: likes
      }
    })
    .done(function(response){
    $("#like").css("display");
    $("#like-change").css("display", "none");
    // loadlikes();

    })

  })

});
