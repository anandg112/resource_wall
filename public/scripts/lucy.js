$(document).ready(function(){
  $('#like').click(function(){
    num = parseInt($(".figure").text());
    $(".figure").text(num + 1);
  })
  // $(".like").click(function(ev){
  //   console.log($(this).tagId, "id");
  //   console.log($(this).data("likes"), "likes");
  //  //let id = this.attr('movieId')
  //  //let likes = this.attr('likes')
  //  $.ajax({
  //    method:"POST",
  //    url:"/users/:likes",
  //    data: {
  //      id: $(this).tagId,
  //      likes: $(this).data("likes")
  //    }
  //   })
  // })
})




//  .done(function(response){
//    // here we need to calll another function in order to load the data
//    loadResurces()fC
//  $("#like").css("display");
//  $("#like-change").css("display", "none");
//  })
// })
// });
//  const loadLikes = ( => {
// // makes it owns axa request to get data and write ut to the DOM
// // Make request to server to get data
// // Then use the new data crete elements on the document
//   $.ajax({
//     url: "",
//     method: "GET"
//   })
// })