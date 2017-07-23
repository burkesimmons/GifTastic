
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {
        // movie = search
        var search = $(this).attr('data-name');
        // console.log(search);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=3&rating=g&rating=pg&rating=pg-13";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // Creates a div to hold the movie
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class ="item">');
            var rating = results[i].rating;
            var p = $('<p>').text('Rating: ' + rating);
            var personImage = $('<img>');
            personImage.attr('src', results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $('#gifs-appear-here').prepend(gifDiv);
          }
        });
      };

 var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $('#buttons-view').empty();
        // Loops through the array of movies
        for (var i = 0; i < movies.length; i++) {
          
          movies.sort();

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $('<button>');
          // Adds a class of movie to our button
          a.addClass('movie');
          // Added a data-attribute
          a.attr('data-name', movies[i]);
          // Provided the initial button text
          a.text(movies[i]);

          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#movie-input").val().trim();
        // The movie from the textbox is then added to our array
        // Calling renderButtons which handles the processing of our movie array
          var btn = document.createElement("BUTTON");
          var t = document.createTextNode(movie);
          btn.appendChild(t);
          // document.body.appendChild(btn);



          // Added the button to the buttons-view div
        $('#first-buttons-view').empty();
        $('#first-buttons-view').append(btn);
        // displayMovieInfo();
        // console.log(event);
        renderButtons();
        movies.push(movie);

        // console.log(movie);
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();