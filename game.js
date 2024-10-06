var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelNumber = 0;
var gameStarted = false;

$("#start").click( function(event) {
    if (gameStarted == false) {
      nextSequence();
      gameStarted = true;
      $("h2").text("");
    }
  });

$(document).keypress( function(event) {
    if (gameStarted == false) {
      nextSequence();
      gameStarted = true;
      $("h2").text("");
    }
  });

function nextSequence() {
    function onKeyDown(event) {
    event.preventDefault();
  }
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).animate({opacity: "0.1"}, 150);
  $("#" + randomChosenColour).animate({opacity: "1"}, 150);

  playSound(randomChosenColour);

  levelNumber++;
  $("h1").text("Level " + levelNumber);
};

$(".btn").click(function handler(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function playSound(name) {
  var buttonSound = new Audio("./" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  checkAnswer(userClickedPattern.length - 1)
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Sucsess");
  }
  else {
    $("h1").text("Game Over, Press any Key or start to Restart");
    $("h2").text("(Your score: Level " + levelNumber +")");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    var wrongSound = new Audio("./wrong.mp3")
    wrongSound.play()
    startOver()
  }
  if (gamePattern.length == userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  }
}

function startOver() {
  levelNumber = 0;
  gamePattern = [];
  gameStarted = false;
}
