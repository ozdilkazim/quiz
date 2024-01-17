var startBtn = document.querySelector(`#start`);
var startScreen =document.querySelector(`#start-screen`);
var questionPage = document.querySelector(`#questions`);
var askQuestion = document.querySelector(`#question-title`);
var clickedChoice = document.querySelectorAll(`.choices`);
var choice1 = document.querySelector(`#choice1`);
var choice2 = document.querySelector(`#choice2`);
var choice3 = document.querySelector(`#choice3`);
var choice4 = document.querySelector(`#choice4`);
var resultArea = document.querySelector(`#result-area`);
var checkLine = document.querySelector(`#check_line`);
var time = document.querySelector(`#time`);
var endScreen = document.querySelector(`#end-screen`);
var finalScore = document.querySelector(`#final-score`);

// Create audido path
var correctAnswer = document.createElement(`audio`);
var wrongAnswer = document.createElement(`audio`);
correctAnswer.setAttribute(`src`, `assets/sfx/correct.wav`);
wrongAnswer.setAttribute(`src`, `assets/sfx/incorrect.wav`);


//Set start parameters
var secondsLeft = 75;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// Main countdown function
function countdown() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time left: ` + secondsLeft + ` s`;
        if (secondsLeft <= 0){
            clearInterval(timerInterval);
            time.textContent = `Time over!`; 
            timeOver();
        } else  if(questionCount >= questions.length +1) {
            clearInterval(timerInterval);
            timeOver();
            } 
    }, 1000);
}
// A start button that when clicked a timer starts and the first question appears.
function startQuiz () {
    startScreen.style.display = `none`;
    questionPage.style.display = `block`;
    questionNumber = 0
    countdown();
    showQuestion(questionNumber);
      
}

startBtn.addEventListener(`click`, startQuiz);

// Questions contain buttons for each answer.
function showQuestion (n) {
    askQuestion.textContent = questions[n].question;
    choice1.textContent = questions[n].choices[0];
    choice2.textContent = questions[n].choices[1];
    choice3.textContent = questions[n].choices[2];
    choice4.textContent = questions[n].choices[3];
    questionNumber = n;
}

// When answer is clicked, the next question appears
clickedChoice.forEach(function(click){
    click.addEventListener(`click`, checkAnswer);
});

//  If the answer clicked was incorrect then subtract time from the clock
function checkAnswer(event) {
    event.preventDefault();
    // Check if the answer is correct or not 
    if (questions[questionNumber].answer == event.target.value) {
        resultArea.textContent = `Correct!`;
        correctAnswer.play(); 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 15;
        resultArea.textContent = `Wrong!`;
        wrongAnswer.play(); 
    }
    if (questionNumber < questions.length -1 ) {
        showQuestion(questionNumber +1);
    } else {
    timeOver();
    }
questionCount++;
}

// When the time is over, game is over.
function timeOver() {
        questionPage.style.display = `none`;
        endScreen.style.display = `block`;
        finalScore.textContent = totalScore;
        time.style.display = `none`; 
};


