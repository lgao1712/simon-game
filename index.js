// alert("working!");

// Initial Declarations
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //Randomly generated button sequence array
var userClickedPattern = []; //User clicked button pattern array
var level = 0; //level tracker
var gameStarted = false; //Game start tracker
var a = 0;
var b = 0;

//7. START THE GAME
$(document).on("keydown", function() {
  if (gameStarted == false) {
    $("level-title").html("Level " + level);
    setTimeout(function() {
      nextSequence();
    }, 1000);
    gameStarted = true;
    // checkUserPattern();
  }
});

checkUserPattern();

//2. Randomly generated button sequence with animation and sound.
function nextSequence() {
  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  userClickedPattern = [];

  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log("gamePattern = " + gamePattern);

  //3. Button flash animation for gamePattern
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  //Audio output for gamePattern
  playSound(randomChosenColour);
}

//4. Check which button is pressed - Selects the button that the user clicked and stores the value. Checks this against the gamePattern.
function checkUserPattern() {
  $('.btn').on("click", function() {
    var userChosenColour = this.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log("userClickedPattern = " + userClickedPattern);
    checkAnswer(level);
  });
}


//5. Playing sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//6. Animation when clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

//8. Check answer function - change so you match every sequence in the array
function checkAnswer(currentLevel) {
  // console.log("level = " + currentLevel);
  // console.log("userClickcedPattern Length = " + userClickedPattern.length);
  // console.log("gamePattern is " + gamePattern);
  // console.log("userClickedPattern is " + userClickedPattern);
  if (userClickedPattern[userClickedPattern.length - 1] == gamePattern[userClickedPattern.length - 1]) {
    // console.log("success");
  } else { //User gets it wrong
    //Play sound
    playSound("wrong");

    //Apply game-over flast effect
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //Change headline to say Game Over
    $("h1").html("Game Over, Press Any Key to Restart");

    // console.log("wrong");
    startOver();
    return;
  }

  // 8. If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
  if (userClickedPattern.length == currentLevel) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
  return;
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  // $('.btn').off("click");
}
