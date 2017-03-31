$(document).ready(function() {
  // Animated random search button
  $("#random").on({
    mouseover: function() {
      $(".btn-txt").css("visibility", "visible");
    },
    mouseout: function() {
      $(".btn-txt").css("visibility", "hidden");
    }
  });

  //Adds Smooth Scrool to Back to Top button
  $("#btt a[href^='#']").on('click', function(e) {

    // Prevent default click behavior
    e.preventDefault();

    var hash = this.hash;

    // Animation
    $("html, body").animate({
       scrollTop: $(this.hash).offset().top -50
    }, 400, function(){

        // When done, add hash to url
        // (default click behavior)
        window.location.hash = hash;
    });
  });

  // Search article called throug submit
  $("#search").keypress(function(e){
    // Render the content
    $("#content").html("");
    $("#content").show();
    $("#content-random").hide();

    // Use "enter" key to search
    if (e.which == 13) {
      searchArticle($("#search").val());
      (e).preventDefault;
    }
  });

  // Search article called throug icon
  $("#search-icon").on("click",function(e) {
    // Render the content
    $("#content").html("");
    $("#content").show();
    $("#content-random").hide();

    // Call the function
    searchArticle($("#search").val());
    (e).preventDefault;
  });

  // Random article call
  $("#random").on("click", function(e) {

    // Prevent to make other calls until get the current response from API
    $(this).attr("disable", true);

    // Hide results from search-icon and show the results for random search
    $("#content").hide();
    $("#content-random").show();

    // Call the function
    randomArticle();
    e.preventDefault();

  });
});

// Search function
function searchArticle(query) {
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + query + "&callback=?", function(result) {

    //$("#search").attr("disable", false);

    if (result.hasOwnProperty("query")) {
      $.each(result.query.pages, function(key, page) {

        var extract = page.extract.length > 200 ? page.extract.substring(0, 200) + "..." : page.extract;

        $("#content").append('<li id="item"><a href="http://en.wikipedia.org/?curid=' + page.pageid + '" target="_blank"><div id="title">' + page.title + '</div> <div id="text">' + extract + '</div></a></li>');
      });
    }

  });
}

// Random function
function randomArticle() {
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&generator=random&grnnamespace=0&callback=?", function(result) {

    $("#random").attr("disable", false);

    $.each(result.query.pages, function(key, page) {
      $("#content-random").html('<li id="item"><a href="http://en.wikipedia.org/?curid=' + page.pageid + '" target="_blank"><div id="title">' + page.title + '</div> <div id="text">' + page.extract + '</div></a></li>');
    });

  });
}
