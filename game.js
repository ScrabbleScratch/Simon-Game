var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false; // Keep track if the game has started or not, so nextSequence() is called at the first key press
var level = 0; // Keep track of the level starting at 0

// Add a listener event to any button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); // Take the id of the pressed button using jQuery
  userClickedPattern.push(userChosenColour); // Add the pressed button to the userClickedPattern

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColour); // Play the sound for the clicked button
  animatePress(this); // Call the animatePress() function giving the pressed button object as argument
});

// When a key is pressed and the game hasn't started, display the level and start the game
$(document).keydown(function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [] // Reset the user pattern

  level++; // Increase the level
  $("#level-title").text("Level " + level); // Change the level-title to show the current level

  var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; // Select the new color from buttonColours using randomNumber
  gamePattern.push(randomChosenColour); // Insert the new color to the pattern list

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Generate a flashing animation for the selected color

  playSound(randomChosenColour);
}

// Play the sound for the selected color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed"); // Add the "pressed" class to the pressed button
  setTimeout(function () {
    $(currentColour).removeClass("pressed"); // Remove the "pressed" class from the pressed button after 50 miliseconds
  }, 50);
}

// Check if the patter of the user is correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // Check if the last pressed key is the same as the last in the pattern
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length) { // Check if the rest of the pattern is correct
      setTimeout(function () {
        nextSequence(); // Call the nextSequence() function after a 1000 milisecond delay
      }, 1000);
    }
  } else {
    console.log("wrong ");
    playSound("wrong");
    $("body").addClass("game-over"); // Add the game-over class to the body element
    setTimeout(function () {
      $("body").removeClass("game-over"); // Remove the gam,e-over class from the body element after a 200 miliseconds delay
    }, 200);
    $("#level-title").text("Game Over, Press Any key to Restart"); // Change the level title to game over text

    startOver();
  }
}

// Restart the value of the variables to restart the game
function startOver() {
  level = [];
  gamePattern = [];
  started = false;
}
