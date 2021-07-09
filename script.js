var gamePattern =[]
var userClickPattern=[]
var buttonColors=["red","blue","green","yellow"]
var gameStarted = false
var patternPlaying = false
var highScore = 0
var level = 0

// use jQuery to add keypress listener to start the game when player presses any key
$(document).on('keydown',function(){
    if(!gameStarted){
       gameStarted = true
        console.log("button pressed");
        // ADD MORE LOGIC FOR Playing game
        startGame();

    }
})


// user jQuery to add click listeners to each button
buttonColors.forEach(color =>  {
    $("#"+color).click(()=>{
        if(gameStarted && !patternPlaying){
             playSound(color)
             animatePress(color)
             userClickPattern.push(color)
             checkPattern(userClickPattern.length-1)
        } 
    })
});


function startGame(){
    level++
    $("#level-title").html("Level<br>" + level)
    let randNum = Math.floor(Math.random()*4)+1;
    //console.log(buttonColors[randNum]+""+randNum);
    let randomChosenColor = buttonColors[randNum-1]
    gamePattern.push(randomChosenColor)
    console.log(randNum)
    console.log(gamePattern)

    // Disable Player
    patternPlaying = true
    setTimeout(() => {
        patternPlaying = false
    }, 500*gamePattern.length);
    
    // Play Pattern
    for(let i=1;i<=gamePattern.length;i++){
        setTimeout(() => {
            //Color Animation
            playSound(gamePattern[i-1])
            animatePress(gamePattern[i-1])

        }, 500 * i)
    }

}

function animatePress(color){
    $("#"+color).addClass('pressed')
    setTimeout(() =>$("#"+color).removeClass('pressed'),100)
}

function playSound(color){
  let audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

function checkPattern(index){
    if(userClickPattern[index] === gamePattern[index]){
        if (userClickPattern.length === gamePattern.length) {
        userClickPattern=[] 
        patternPlaying = true
        setTimeout(startGame, 500)
        }
    }else{
        userClickPattern=[]
        gamePattern=[]
        $("body").addClass("game-over")
        playSound("wrong")
        $('#level-title').html('Game Over!<br>Press a Key to Start')
        setTimeout(() =>$("body").removeClass("game-over"),150);
        // update the high score
        if (highScore < level) {
            highScore = level
        }
        $('#high-score').text(highScore)
        startOver()
    }    
}
function startOver(){
    userClickPattern=[]
    gamePattern=[]
    gameStarted = false
    level = 0
}