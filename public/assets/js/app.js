
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {


  $(".note").on("click", function(event) {
    var id = $(this).data("id");
    
    console.log("I am getting notes from articles! ", notes)

    var newNote = {
      note: $(".note").val().trim(),
      // saved: $("[name=saved]:checked").val().trim()
    };

    $.ajax("/note/" + id, {
      type: "POST",
      data: newNote
    }).then(
      function() {
        console.log("deleted note", id);
        location.reload();
      }
    );
  });



  $(".delete").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/delete/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted note", id);
        location.reload();
      }
    );
  });



