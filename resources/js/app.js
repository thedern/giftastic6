
/* ==========================================================================
    what do I need this to do at a high level?
   ========================================================================== */
/*

1. create an array of strings from which I will create buttons.  Array items are things I am interested in.
2. create buttons described above.
3. when button is clicked, giffy api is contacted and brings back 10 images.
4. images are formatted and displayed on page, static.
5. when clicked the images animate.
6. when clicked again the image is again, static.
7. add a form that takes input from user and allows them to add a button to my array.
after they add their button, they can toggle static and aninated states on their newly added button.
*/


// giffy api nthAiLFE7WuzEBw0pJjAywk3BBCY17Xf

// globals
var myInterests = ['jeep_off_road','subaru','australian_shepherd','bjj','desert','mountain_bike'];

/*
   add buttons to document
   ========================================================================== */

$(function () {

    for (var i = 0; i < myInterests.length; i++) {
        var buttons = $('<button>');
        buttons.addClass('btn btn-primary m-2');
        buttons.attr('data-interest', myInterests[i]);
        buttons.text(myInterests[i]);
        $('div#searchButtons').append(buttons);
    }

   
});



/*
   form to Enter New Buttons on user clicking the on-screen submit button
   ========================================================================== */

$(function() {
    $('#addNewButton').on('click', function() {
        var userButtonText = $('#newButton').val();
        userButtonText = userButtonText.toLowerCase();
        var buttons = $('<button>');
        buttons.addClass('btn btn-primary m-2');
        buttons.attr('data-interest', userButtonText);
        buttons.text(userButtonText);
        $('div#searchButtons').append(buttons);
    });
});

/*
   giffy API Query
   ========================================================================== */

// click event for giff search vi giffy
$(function() {

    //! need to deactivate button after click
    $('#searchButtons').on('click','.btn-primary', function(){
        var buttonText = $(this).attr('data-interest');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=$" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

        // create a div to contain all the images for each button press
        var interestDiv = $('<div>');
        interestDiv.addClass('m-2 p-2');
        interestDiv.css('background-color', 'rgba(128, 128, 128, 0.7)');

        // create delete button for each div.  Place delete button in top corner
        var delPara = $('<p>');
        delPara.addClass('d-flex justify-content-end');
        delPara.attr('id', 'deleteSectionWrapper');

        var delButtons = $('<button>');
        delButtons.addClass('btn btn-danger m-2');
        delButtons.attr('id', 'deleteSection');
        delButtons.text('X');

        delPara.append(delButtons);
        interestDiv.append(delPara);

        // need to figure out how to only fade in the new div..  perhaps give div and id of buttonText and append by id?
        $('#images').prepend(interestDiv).hide().fadeIn(2000); 

        // ajax call
        // used the 'each' function to iterate through the response's data array and get the embed.url
        // syntax:  $.each( array, function( index, value ){

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
           
            $.each(response.data, function(index, value) {
                
                // create image tag and add to document
                var interestS = $('<span>');
                interestS.addClass('p-2');
                var interestImg = $('<img>');
                interestImg.attr('src', value.images.fixed_height.url);
                interestImg.attr('alt', value.title);

                interestS.append(interestImg);
                interestDiv.append(interestS);
                // animation needs to be default stopped!!!
            });
        });

        /* Remove button for current section
            due to scope, del section must be located here within the giffy api function which creates and populates the images div
            the click event below gets the parent of the delete button and removes the parent and its content.
        */
        $('#deleteSectionWrapper').on('click','.btn', function() {
            $('#deleteSectionWrapper').parent().fadeOut(2000, function () {
                $('#deleteSectionWrapper').parent().remove();
            });
        });
    });
});


/*
   Animaton Start/Stop
   ========================================================================*/


/*
   Clear All
   ========================================================================== */

// clear screen by fadeout and remove all child nodes from #images
$(function () {
    $('button#deleteAll').on('click', function() {
        $('#images').fadeOut(2000, function () {
            $(this).empty();
        });
    }); 
});


/*
   Clear Current section
   ========================================================================== */









