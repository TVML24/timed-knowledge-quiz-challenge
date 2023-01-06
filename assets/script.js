
// Establish page elements as variables
var questionHolder = document.getElementById("question-container");
var highscoreBtn = document.getElementById("view-high-scores");
var timeRemaining = document.getElementById("time-remaining");
var answerHolder = document.getElementById("button-container");
var answerResponse = document.getElementById("answer-container");

// variable that holds the text content of whichever button has been chosen so as to compare it to the correct answer
var chosenAnswer = " ";

// variable that holds the current question
var currentQuestion = "";

// variable that holds 

// variables for the timer
var countDown = 100;
var timer;

// variable that will end the game when it gets to the maximum number of questions
var progress = 0; 

// establish object with questions as value in key value pair
var questions = ["Which Javascript method can be used to get the sum of all the numbers in an array?", "Where can you access a variable that was delcared inside an if statement that is inside of a function?"];


// Establish object with question and answers as key value pairs
var correctAnswers = [".concat()", "Anywhere inside that 'if statement'"];


// Establish object with questions identical to the above and four possible answers
var buttononeAnswers = [".join()", "Anywhere inside the function"];
var buttontwoAnswers = [".sumAll()", "Anywhere inside that 'if statement'"];
var buttonthreeAnswers = [".combine()", "Globally"];
var buttonfourAnswers = [".concat()", "In any other function it is referenced"];

// init() function that constructs heading with start button and instructions inside questionHolder
function init() {
    var introTitle = document.createElement('h1');
    var introText = document.createElement('h2');
    var startBtn = document.createElement('button');
        introTitle.textContent = "Coding Quiz Challenge";
        introText.textContent = "Try to answer the folowing code-related questions within the time limit. Keep in mind that incorrect answers will penalise your score-time by ten seconds!";
        startBtn.textContent = "Start Quiz!"
        introTitle.id = "main-heading";
        introText.id = "paragraph-text";
        startBtn.id = "start-button";
        questionHolder.appendChild(introTitle);
        questionHolder.appendChild(introText);
        questionHolder.appendChild(startBtn);
        startBtn.addEventListener("click", startGame);
}

// startGame function that runs from an event listener attached to the button built by init()
function startGame() {
    var startBtnTwo = document.getElementById("start-button");
    var introTitleTwo = document.getElementById("main-heading");
    var introTextTwo = document.getElementById("paragraph-text");
    startBtnTwo.remove();
    introTitleTwo.remove();
    introTextTwo.remove();
    progress = 0;
    countDown = 100;
    timerFunction();
    questionChooser();
}

// starts timerFunction()
// part of this will clear the answerResponse at each interval
// calls function youLost()

function timerFunction() {
    timer = setInterval(function() {
        countDown--;
        timeRemaining.textContent = countDown;
        if (countDown === 0) {
            clearInterval(timer);
            youLost();
        }
        answerResponse.textContent = " ";
    }, 1000);
}

// questionchooser()
// function that chooses a question from the array
// clears the variable chosenAnswer
// selects a question based on progress variable e.g. questions[progress]
// runs buttonBuilder() function

function questionChooser() {
    chosenAnswer = "";
    currentQuestion = questions[progress];
    var question = document.createElement('h1');
    question.className = "printed-question";
    question.id = "current-question";
    question.textContent = currentQuestion;
    questionHolder.appendChild(question);
    buttonBuilder();
}

// buttonbuilder()
// function that builds the answer buttons based on the possible answers given in the questions object
// if progress = 0; 
// for loop that continues for the length of the questionone array inside the possibleAnswers object - https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
// for each iteration it inserts a button into the buttonHolder Element and changes it's text content to the possible answer given to it by the object
// adds event listener to each button that will call answerSelector
// if progress > 0 - for loop that changes text content of buttons rather than constructing new buttons
function buttonBuilder() {
    if (progress === 0) {
        var buttonOne = document.createElement('button');
        var buttonTwo = document.createElement('button');
        var buttonThree = document.createElement('button');
        var buttonFour = document.createElement('button');
        buttonOne.textContent = buttononeAnswers[0];
        buttonTwo.textContent = buttontwoAnswers[0];
        buttonThree.textContent = buttonthreeAnswers[0];
        buttonFour.textContent = buttonfourAnswers[0];
        buttonOne.id = "button-one";
        buttonTwo.id = "button-two";
        buttonThree.id = "button-three";
        buttonFour.id = "button-four";
        buttonOne.className = "answer-button";
        buttonTwo.className = "answer-button";
        buttonThree.className = "answer-button";
        buttonFour.className = "answer-button";
        answerHolder.appendChild(buttonOne);
        answerHolder.appendChild(buttonTwo);
        answerHolder.appendChild(buttonThree);
        answerHolder.appendChild(buttonFour);
        buttonOne.addEventListener("click", function () {
            chosenAnswer = buttonOne.textContent;
            answerCheck();
        })
        buttonTwo.addEventListener("click", function () {
            chosenAnswer = buttonTwo.textContent;
            answerCheck();
        })
        buttonThree.addEventListener("click", function () {
            chosenAnswer = buttonThree.textContent;
            answerCheck();
        })
        buttonFour.addEventListener("click", function () {
            chosenAnswer = buttonFour.textContent;
            answerCheck();
        })
    } else {
        var buttonOne = document.getElementById("button-one");
        var buttonTwo = document.getElementById("button-two");
        var buttonThree = document.getElementById("button-three");
        var buttonFour = document.getElementById("button-four");
        buttonOne.textContent = buttononeAnswers[progress];
        buttonTwo.textContent = buttontwoAnswers[progress];
        buttonThree.textContent = buttonthreeAnswers[progress];
        buttonFour.textContent = buttonfourAnswers[progress];
        buttonOne.addEventListener("click", function () {
            chosenAnswer = buttonOne.textContent;
            answerCheck();
        })
        buttonTwo.addEventListener("click", function () {
            chosenAnswer = buttonTwo.textContent;
            answerCheck();
        })
        buttonThree.addEventListener("click", function () {
            chosenAnswer = buttonThree.textContent;
            answerCheck();
        })
        buttonFour.addEventListener("click", function () {
            chosenAnswer = buttonFour.textContent;
            answerCheck();
        })
    }
}

// answerCheck()
// for correct answer
// function that compares variable chosenAnswer to correctAnswers value
// if progress = 0, if (chosenAnswer === correctAnswers[progress]) 
// displays correct in answerResponse
// progress++
// if (progress = 10 calls wellDone() function) 

function answerCheck() {
    if (chosenAnswer === correctAnswers[progress]) {
        if (progress < 10) {
            var question = document.getElementById("current-question");
            question.remove();
            progress++;
            answerResponse.textContent = "Correct!";
            questionChooser();
        } else {
            var question = document.getElementById("current-question");
            question.remove();
            clearButtons();
            welldone();
        }
// for incorrect answer
// displays incorrect in answer response
// countDown - 10;
// if countdown = 0
    } else {
        answerResponse.textContent = "Incorrect!";
        countDown -= 10;
        if (countDown < 1) {
            youLost();
        } else {
            return;
        }
    }
}

// clearButtons()
// this functions deletes any button elements inside answerHolder using event delegation https://dev.to/js_bits_bill/event-delegation-with-vanilla-js-js-bits-2lnb
// e.g. delete answerHolder.children('button') or similar
function clearButtons() {
    var buttonOne = document.getElementById("button-one");
    var buttonTwo = document.getElementById("button-two");
    var buttonThree = document.getElementById("button-three");
    var buttonFour = document.getElementById("button-four");
    buttonOne.remove();
    buttonTwo.remove();
    buttonThree.remove();
    buttonFour.remove();
}

init();





// wellDone()
// calls clearButtons()
// questionHolder displays Well Done!
// countdown = finalScore
// buttonHolder element displays "your final score is + finalScore"
// answerResponse element has "enter initials" + an input + submit button

// storeResult()
// this function stores the text from the text input generated by wellDone() into local storage and finalScore variable
// removes elements inside answerResponse using event delegation
// calls viewhighScores()

// youLost()
// calls clearButtons()
// answerResponse displays "out of time!" 
// calls init()

// viewhighScores()
// this function summons the score board
// question holder displays text "High Scores"
// ordered list is created inside answerHolder
// intial and finalscore are retreived from local storage and pushed into arrays 
// for loop generates list items inside answerHolder iterating along the array until it hits the array length
// e.g. <li> initial[0] + "   " + finalScore[0] </li>
// creates go back and reset scores buttons underneath

// resetScores()
// this function uses localStorage.removeItem(""); to remove the objects stored into local storage
// it uses event delegation to clear the ol and li from answerholder

// goBack()
// clears question holder of text
// clearButtons()
// init()

