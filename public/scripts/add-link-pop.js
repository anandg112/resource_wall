$(document).ready(function() {

    $("#linkBtn").click(function(){
    $("#inputbox").css("display", "block");
    })
  $("#subBut").on("submit", (ev) => {
    ev.preventDefault();
    let text = $(ev.target).find('#textarea').val();
    if (!text.length){
      alert("Please fill out the whole form");
      } else {
       $.ajax({
        method:"POST",
        url: "/input"
      })
      .done(function() {
        $("#inputbox").hide();
      })

    }
  })
});
