      $('body').on('click', '.gif', function() {
      var current = $(this);
      var state = $(this).attr('data-state');
      console.log(state);
      var animateUrl = current.attr('data-animate');
      console.log(animateUrl);
      var stillUrl = current.attr('data-still');
      
      if(state === 'still') {
        current.attr('src', animateUrl);
        current.attr('data-state', 'animate');
      } else {
        current.attr('src', stillUrl);
        current.attr('data-state', 'still');
      };
    });
      // displayRockStar function re-renders the HTML to display the appropriate content
      function displayRockStar() {
        // rock = search
        var search = $(this).attr('data-name');
        // console.log(search);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the specific rock button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // Creates a div to hold the rock
          console.log(response);
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class ="item">');
            var rating = results[i].rating;
            var personImage = $('<img>');
            var p = $('<p>').text('Rating: ' + rating);
            personImage.attr('src', response.data[i].images.fixed_height_still.url);
            personImage.attr('data-still', response.data[i].images.fixed_height_still.url);
            personImage.attr('data-animate', response.data[i].images.fixed_height.url);
            personImage.attr('data-state', 'still');
            personImage.addClass('gif');
            gifDiv.prepend(personImage);
            gifDiv.prepend(p);
            $('#gifs-appear-here').prepend(gifDiv);
          }
        });
      };

 var rockStars = ["The Beatles", "Beach Boys", "Mick Jagger", "Elvis"];

      // Function for displaying rock data
      function renderButtons() {

        // Deletes the rockStars prior to adding new rockStars
        // (this is necessary otherwise you will have repeat buttons)
        $('#buttons-view').empty();
        // Loops through the array of rockStars
        for (var i = 0; i < rockStars.length; i++) {
          
          rockStars.sort();

          // Then dynamicaly generates buttons for each rock in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $('<button>');
          // Adds a class of rock to our button
          a.addClass('rock');
          // Added a data-attribute
          a.attr('data-name', rockStars[i]);
          // Provided the initial button text
          a.text(rockStars[i]);

          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add rock button is clicked
      $("#add-rock").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var rock = $("#rock-input").val().trim();
        // The rock from the textbox is then added to our array
        // Calling renderButtons which handles the processing of our rock array
          var btn = $('<button>');
          // var t = document.createTextNode(rock);
          btn.text(rock);
          // btn.appendChild(t);
          btn.addClass('rock big-button');
          btn.attr('data-name', rock);
          // console.log(btn);

          // Added the button to the buttons-view div
        $('#first-buttons-view').empty();
        $('#first-buttons-view').append(btn);
        // console.log(event);
        renderButtons();
        rockStars.push(rock);

        // console.log(rock);
      });

      // Adding click event listeners to all elements with a class of "rock"
      $(document).on("click", ".rock", displayRockStar);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      // When the user scrolls down 20px from the top of the document, show the button
      window.onscroll = function() {scrollFunction()};

      function scrollFunction() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
              document.getElementById("myBtn").style.display = "block";
          } else {
              document.getElementById("myBtn").style.display = "none";
          }
      }

      // When the user clicks on the button, scroll to the top of the document
      function topFunction() {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
      }