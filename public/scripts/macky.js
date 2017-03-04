
$(document).ready(function(){

  console.log("document ready")
  $(".btn").click(function(ev){
    goToURL($("textarea").val())
  })



  function goToURL(tagname){
  window.location.href=`/tags/${tagname}`
}
})



