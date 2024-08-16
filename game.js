var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$("button").click(function () {
  if (!started) {
    $("body").removeClass("game-over");
    $("#level-title").text("Level " + level);
    $("button").fadeOut();
    
    setTimeout(function () {
      nextSequence();
    }, 1000);
  
    started = true;
  }
});

function nextSequence() {
  // Clear the user pattern for the new level
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("/sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  userPattern.push(userChosenColour);

  $("#" + userChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("/sounds/" + userChosenColour + ".mp3");
  audio.play();

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("button").fadeIn();
    $("button").text("restart")

    var audio = new Audio("/sounds/wrong.mp3");
    audio.play();

    playAgain();
  }
}

function playAgain() {
  gamePattern = [];
  started = false;
  level= 0;
}
 