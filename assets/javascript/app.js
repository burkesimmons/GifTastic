$(document).ready(function(){
  $('#add-cartoon').keypress(function(e){
    if(e.keyCode==13)
    $('#cartoon-button').click();
  });

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

  // displayCartoon function re-renders the HTML to display the appropriate content
  function displayCartoon() {
    var search = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    // Creates AJAX call for the specific cartoon button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Creates a div to hold the cartoon gif
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $('<div class ="item">');
        var rating = results[i].rating;
        var cartoon = $('<img>');
        var p = $('<p>').text('Rating: ' + rating);
        p.addClass('textWhite');
        cartoon.attr('src', response.data[i].images.fixed_height_still.url);
        cartoon.attr('data-still', response.data[i].images.fixed_height_still.url);
        cartoon.attr('data-animate', response.data[i].images.fixed_height.url);
        cartoon.attr('data-state', 'still');
        cartoon.addClass('gif');
        gifDiv.prepend(cartoon);
        gifDiv.prepend(p);
        $('#gifs-appear-here').prepend(gifDiv);
      }
    });
  };

  var cartoonList = ["Teen Titans", "The Chipmunks cartoon", "Garfield", "Garfield cartoon"];

  // Function for displaying cartoon data
  function renderButtons() {

    // Deletes the cartoonList prior to adding new cartoonList
    // (this is necessary otherwise you will have repeat buttons)
    $('#buttons-view').empty();
    // Loops through the array of cartoonList
    for (var i = 0; i < cartoonList.length; i++) {
      
      cartoonList.sort();

      // Then dynamicaly generates buttons for each cartoon in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $('<button>');
      // Adds a class of cartoon to our button
      a.addClass('cartoon');
      // Added a data-attribute
      a.attr('data-name', cartoonList[i]);
      // Provided the initial button text
      a.text(cartoonList[i]);

      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where the add cartoon button is clicked
  $("#cartoon-button").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var cartoon = $("#add-cartoon").val().trim();
    // The cartoon from the textbox is then added to our array
    // Calling renderButtons which handles the processing of our cartoon array
      var btn = $('<button>');
      // var t = document.createTextNode(cartoon);
      btn.text(cartoon);
      // btn.appendChild(t);
      btn.addClass('big-button');
      btn.attr('data-name', cartoon);
      // console.log(btn);

      // Added the button to the buttons-view div
    $('#first-buttons-view').empty();
    $('#first-buttons-view').append(btn);
    // console.log(event);
    renderButtons();
    cartoonList.push(cartoon);

    // console.log(cartoon);
  });

  // Adding click event listeners to all elements with a class of "cartoon"
  $(document).on("click", ".cartoon", displayCartoon);
  $(document).on("click", ".big-button", displayCartoon);


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
  function toTheTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }

});