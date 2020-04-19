// alert("SIMON GAME RULES REMBER WHAT THE COLORS ARE PRESSED PRESS THE COLOR IN CORRECT ORDER ");
var userClickedPattern = [];
var gamePattern = [];
var buttonsColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameState = false;







function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonsColors[randomNumber];
  // empty array
  userClickedPattern = [];
  gamePattern.push(randomChosenColor);
  // animating flash
  $('#'+buttonsColors[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // sound
  playSound(randomChosenColor);
  // press animation
  animatePress(randomChosenColor);
  // level increment
  level++;
  //level call
  $('#level-title').text("LEVEL "+ level);

}

// on clikc event listener
$('.btn').on('click',function(event){
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

// sound on buttons func
function playSound(name){
  // sound effect
  var sound = new Audio('sounds/'+ name + '.mp3');
  sound.play();
}
// animatin press func
function animatePress(currentColor){
  $("."+currentColor).addClass('pressed');
  setTimeout(function(){
    $("."+currentColor).removeClass('pressed');
  }, 100)
}

var gameState = false;

// deteciting keypress
$(document).on('keypress', function(event){
  if(gameState === false){
    nextSequence();
    $("#level-title").text("Level " + level);
    gameState = true;

  }
})
//check
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log('okok')
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log('bagaga');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200)
    // game over call
    $('#level-title').text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
// restart function
function startOver(){
  gameState = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
