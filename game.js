var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;
var isUserTurn = false; // New flag to track if it's the user's turn

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
  userPattern = [];
  isUserTurn = false; // It's not the user's turn while the new sequence is being shown
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animation(randomChosenColour);
  playSound(randomChosenColour);

  setTimeout(function () {
    isUserTurn = true; // Allow the user to start their input after the sequence is shown
  }, 500);
}

$(".btn").click(function () {
  if (isUserTurn) {
    // Only allow input if it's the user's turn
    var userChosenColour = this.id;
    userPattern.push(userChosenColour);

    animation(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      isUserTurn = false; // Prevent input while the game is preparing the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("button").fadeIn();
    $("button").text("restart");

    playSound("wrong");
    playAgain();
  }
}

function playAgain() {
  gamePattern = [];
  started = false;
  level = 0;
  isUserTurn = false; // Reset the user turn flag
}

function playSound(name) {
  var audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
}

function animation(item) {
  $("#" + item)
    .fadeOut(100)
    .fadeIn(100);
}
