
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {

  $(".scrape").on("click", function(event) {

    // Send the PUT request.
    $.ajax({
      url: "/scrape",
      method: "GET"
    }).then(
      function() {
        console.log("scraped new data!");
        // Reload the page to get the updated list
        location.reload();
      });
    });


  $(".saved").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Send the POST request.
    $.ajax({
      url: "/saved", 
      method: "GET"
    }).then(
      function() {
        console.log("saved articles!");
        // Reload the page to get the updated list
        location.reload();
      });
  });

})



  $(".note").on("click", function(event) {
    var id = $(this).data("id");
    
    console.log("I am getting notes from articles! ", notes)

    var newNote = {
      note: $(".note").val().trim(),
      saved: $("[name=saved]:checked").val().trim()
    };

    $.ajax("/note/" + id, {
      type: "POST",
      data: newNote
    }).then(
      function() {
        console.log("deleted note", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



  $(".delete").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/delete/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted note", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



