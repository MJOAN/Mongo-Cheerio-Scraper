

//  scrape route
$(document).on("click", "#button", function () {
      $.get("/articles", function (NYTimes) {
          scrapeArticles(data);
          console.log("scraping articles! ", data)
      }).done(function () {

      })
  });

function scrapeArticles() {
  $.getJSON("/articles", function (NYTData) {
    // }).done(function() {
    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);

      // Create the HTML well (section) and add the article content for each
      var articleContainer = $("<div>");
      articleContainer.addClass(".article-container");
      articleContainer.attr("id", "article-well-" + NYTData.id);
      $(".article-container").append(articleContainer);

      var saveArticle = $("<button>");
      var sa = "Save Article";
      saveArticle.addClass("btn-success");
      saveArticle.text(sa);
      saveArticle.attr("data-name", sa);
      $(".article-container").append(saveArticle);

      var articleNotes= $("<button>");
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

    // Loop through and provide the correct number of articles
    for (var i = 0; i < NYTData.length; i++) {

      // $(".article-container").append("<p data-id='" + NYTData[i]._id + "'>" + NYTData[i].title + "<br />" + NYTData[i].link + "</p>");
      // Then display the remaining fields in the HTML (Section Name, Date, URL)
      $(".article-container").append("<h5>Section: " + NYTData[i].title + "</h5>");
      $(".article-container").append("<h5>" + NYTData[i].link + "</h5>");
      //$(".article-container").append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");

      // Log the remaining fields to console as well
      console.log(NYTData._id);
      console.log(NYTData.title);
      console.log(NYTData.link);
    }
  });
}


// This button clears the top articles section
$("#clear-all").on("click", function() {
  $(".article-container").empty();
});
