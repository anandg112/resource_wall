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
   // here we need to calll another function in order to load the data
   loadResurces()fC
 $("#like").css("display");
 $("#like-change").css("display", "none");
 })
})
});
 const loadLikes = ( => {
// makes it owns axa request to get data and write ut to the DOM
// Make request to server to get data
// Then use the new data crete elements on the document
  $.ajax({
    url: "",
    method: "GET"
  })
})

