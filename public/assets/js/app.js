
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

/*    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };*/

    // Send the POST request.
    $.ajax({
      url: "/saved", 
      method: "POST"
    }).then(
      function() {
        console.log("saved articles!");
        // Reload the page to get the updated list
        location.reload();
      });
  });

})


/*
  $(".note").on("click", function(event) {
    var id = $(this).data("id");
    
    console.log("I am getting notes from articles! ", notes)

    // Send the DELETE request.
    $.ajax("/note/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted cat", id);
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
        console.log("deleted cat", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

*/



/*function deleteNotes() {
  $.getJSON("/delete", function (notes) {

    console.log(notes);

    // Loop through and provide the articles
    for (var i = 0; i < notes.length; i++) {

      // Create the HTML well (section) and add the article content for each
      var noteContainer = $("<div>");
      noteContainer.addClass(".notes");
      noteContainer.attr("id", "article-well-" + note.id);
      $(".notes").append(noteContainer);

      var articleNotes = $("<button>");
      var an = "Article Notes";
      articleNotes.addClass("btn btn-info");
      articleNotes.text(an);
      articleNotes.attr("data-name", an );
      $(".article-container").append(articleNotes);

      var deleteFromSaved = $("<button>");
      var ds = "Delete From Saved";
      deleteFromSaved.addClass("btn btn-danger");
      deleteFromSaved.text(ds);
      deleteFromSaved.attr("data-name", ds );
      $(".article-container").append(deleteFromSaved);
      
      $(".notes").append("<p data-id='" + notes[i]._id + ">" + "<h5>Section: " + notes[i].title +  + "</h5>" + "<br />" + notes[i].link + "</p>");

      console.log("notes id: ", notes._id);
      console.log("notes title: ", notes.title);
      console.log("notes link: ", notes.link);
    }
  });
}
*/
