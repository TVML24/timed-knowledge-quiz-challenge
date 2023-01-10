
// Establish page elements as variables
var questionHolder = document.getElementById("question-container");
var highscoreBtn = document.getElementById("view-high-scores");
var timeRemaining = document.getElementById("time-remaining");
var answerHolder = document.getElementById("button-container");
var answerResponse = document.getElementById("answer-container");

// variable that holds the text content of whichever button has been chosen so as to compare it to the correct answer
var chosenAnswer = " ";

// variable that holds the current question
var currentQuestion = " ";

// variable that holds the final scoring info so that it can be passed to local storage
var finalScore = "";
var initials;
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var initialsRecord = JSON.parse(localStorage.getItem("initials")) || [];

// variables for the timer
var countDown = 100;
var timer;

// variable that will end the game when it gets to the maximum number of questions
var progress = 0; 

// variables that check for game condition when viewing the highscores
var gameStarted = false;
var gameWon = false;
var gameLost = false;
var preGame = false;
var postGame = false;
var athighScores = false;
var scoreReset = false;

// event handler for high scores button
var permanenthighscoresButton = document.getElementById("view-high-scores");
    permanenthighscoresButton.addEventListener("click", gethighScores);


// establish object with questions as value in key value pair
var questions = ["Which Javascript method can be used to get the sum of all the numbers in an array?", 
"Where can you access a variable that was delcared inside an if statement that is inside of a function?", 
"Which method returns a new array containing the result of a function for each element in another array?", 
"Which method adds a value to the font of an array?", 
"which method returns an array containing only the values in an array that meet a specified condition?", 
"Which method removes an element from the DOM?", "Which method stops event bubbling?", 
"Which method allows a string to be split according to a specified criteria and inserted into an array in it's pieces?", 
"Which method stops the browser from carrying out pre-defined instructions on an event?",
"Which method can call a function to be executed every x number of milliseconds?"];


// Establish object with question and answers as key value pairs
var correctAnswers = [".concat()", "Anywhere inside that 'if statement'", ".map()", ".push()", ".filter()", ".remove()", ".stopPropagation()", ".split()", ".preventDefault()", ".setInterval()"];


// Establish object with questions identical to the above and four possible answers
var buttononeAnswers = [".join()", "Anywhere inside the function", ".for()", ".splice()", ".filter()", ".remove()", ".noeventBubble()", ".filter()", ".stopPropagation()", ".setTimeout()"];
var buttontwoAnswers = [".sumAll()", "Anywhere inside that 'if statement'", ".while()", ".push()", ".sort()", ".delete()", ".preventPropagation()", ".insert()", ".stopDefault()", ".setTimer()"];
var buttonthreeAnswers = [".combine()", "Globally", ".map()", ".append()", ".matchTo()", ".unAppend()", ".stopBubble()", ".split()", ".preventDefault()", ".executeInterval()"];
var buttonfourAnswers = [".concat()", "In any other function it is referenced", ".iterateOver()", ".addTo()", ".getvalueBy()", ".domRemove()", ".stopPropagation()", ".createArray()", ".cancel()", ".setInterval()"];

// init() function that constructs heading with start button and instructions inside questionHolder
// updates game conditions that have been changed through the course of the game
function init() {
    var introTitle = document.createElement('h1');
    var introText = document.createElement('h2');
    var startBtn = document.createElement('button');
        introTitle.textContent = "Coding Quiz Challenge";
        introText.textContent = "Try to answer the folowing code-related questions within the time limit. Keep in mind that incorrect answers will penalise your score-time by ten seconds!";
        startBtn.textContent = "Start Quiz!";
        introTitle.className = "impressive-heading";
        introText.className = "paragraph";
        startBtn.className = "intro-button";
        introTitle.id = "main-heading";
        introText.id = "paragraph-text";
        startBtn.id = "start-button";
        questionHolder.appendChild(introTitle);
        questionHolder.appendChild(introText);
        questionHolder.appendChild(startBtn);
        startBtn.addEventListener("click", startGame);
        preGame = true;
        postGame = false;
        scoreReset = false;
        gameWon = false;
        gameLost = false;
}

// startGame function that runs from an event listener attached to the button built by init()
// updates game conditions that have been changed through the course of the game
function startGame() {
    var startBtnTwo = document.getElementById("start-button");
    var introTitleTwo = document.getElementById("main-heading");
    var introTextTwo = document.getElementById("paragraph-text");
        startBtnTwo.remove();
        introTitleTwo.remove();
        introTextTwo.remove();
        progress = 0;
        countDown = 100;
        finalScore = "";
        preGame = false;
        initials = null;
        gameStarted = true;
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
            var questiontwo = document.getElementById("current-question");
            questiontwo.remove();
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
    console.log(currentQuestion);
    questionHolder.appendChild(question);
    buttonBuilder();
}

// buttonbuilder()
// function that builds the answer buttons based on the possible answers given in the questions object
// if progress = 0; 
// for loop that continues for the length of the questionone array inside the possibleAnswers object
// This was changed to arrays for ease of use
// for each iteration it inserts a button into the buttonHolder Element and changes it's text content to the possible answer given to it by the object
// adds event listener to each button that will call answerSelector

function buttonBuilder() {
    var buttonOne = document.createElement('button');
    var buttonTwo = document.createElement('button');
    var buttonThree = document.createElement('button');
    var buttonFour = document.createElement('button');
        buttonOne.textContent = buttononeAnswers[progress];
        buttonTwo.textContent = buttontwoAnswers[progress];
        buttonThree.textContent = buttonthreeAnswers[progress];
        buttonFour.textContent = buttonfourAnswers[progress];
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
    }


// answerCheck()
// for correct answer
// function that compares variable chosenAnswer to correctAnswers value
// if progress = 0, if (chosenAnswer === correctAnswers[progress]) 
// displays correct in answerResponse
// progress++
// if (progress = 10 calls wellDone() function) 
// for incorrect answer
// displays incorrect in answer response
// countDown - 10;
// if countdown = 0 calls youlost()

function answerCheck() {
    if (chosenAnswer === correctAnswers[progress]) {
        var questiontwo = document.getElementById("current-question");
        questiontwo.remove();
        answerResponse.textContent = "Correct!";
        progress++;
        checkWin();
    } else {
        answerResponse.textContent = "Incorrect!";
        countDown -= 10;
        if (countDown <= 1) {
            var questiontwo = document.getElementById("current-question");
            questiontwo.remove();
            youLost();
        } else {
            return;
        }
    }
}

// seperate checkWin() function for easier debugging

function checkWin() {
    if (progress < questions.length) {
        currentQuestion = "";
        console.log(progress);
        clearButtons();
        questionChooser();
    } else {
        clearInterval(timer);
        wellDone();
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

// youLost()
// calls clearButtons()
// answerResponse displays "out of time!" 
// calls init()

function youLost() {
    clearButtons();
    clearInterval(timer);
    gameLost = true;
    gameStarted = false;
    gameWon = false;
    postGame = true;
    answerResponse.textContent = " ";
    var failureTitle = document.createElement('h1');
    var failureText = document.createElement('h2');
    var failureButton = document.createElement('button');
    failureTitle.className = "impressive-heading";
    failureText.className = "paragraph";
    failureButton.className = "failed-button";
    failureTitle.id = "failure-title";
    failureText.id = "failure-text";
    failureButton.id = "failure-button";
    failureTitle.textContent = "Out of Time!"
    failureText.textContent = "You'll do better next time"
    failureButton.textContent = "Try Again?"
    questionHolder.appendChild(failureTitle);
    questionHolder.appendChild(failureText);
    questionHolder.appendChild(failureButton);
    failureButton.addEventListener("click", goBack);
}
// goBack()
// this function clears whatever items may be on the page and calls init to being the game again
// this was ridiculous to code because of all the possible game conditions
// if I could go back in time and do it with jquery I would absolutely do it.

function goBack() {
    if (scoreReset === true) {
        var resetBtn = document.getElementById("high-score-reset");
        var gobackButton = document.getElementById("high-score-go-back");
        var scoresTitle = document.getElementById("scores-title");
        var highscoresOl = document.getElementById("ordered-list");
            resetBtn.remove();
            gobackButton.remove();
            scoresTitle.remove();
            athighScores = false;
            init();
    } else if (gameLost === true && gameStarted == false) {
        if (athighScores === false) {
        var failureTitle = document.getElementById("failure-title");
        var failureText = document.getElementById("failure-text");
        var failureButton = document.getElementById('failure-button');
            failureTitle.remove();
            failureText.remove();
            failureButton.remove();
            athighScores = false;
            init();
        } else {
            if (initialsRecord != null){
                var resetBtn = document.getElementById("high-score-reset");
                var gobackButton = document.getElementById("high-score-go-back");
                var scoresTitle = document.getElementById("scores-title");
                var highscoresOl = document.getElementById("ordered-list");
                var listItems = document.getElementsByTagName('li');
                    resetBtn.remove();
                    gobackButton.remove();
                    scoresTitle.remove();
                var items = highscoresOl.getElementsByTagName("li");
                for (var i = 0; i < items.length; ++i) {
                    items[i].remove();
                }
                    highscoresOl.remove();
                    athighScores = false;
                    init();
            } else {
                var resetBtn = document.getElementById("high-score-reset");
                var gobackButton = document.getElementById("high-score-go-back");
                var scoresTitle = document.getElementById("scores-title");
                var highscoresOl = document.getElementById("ordered-list");
                    resetBtn.remove();
                    gobackButton.remove();
                    scoresTitle.remove();
                    athighScores = false;
                    init();
            }
        }
    } else if (gameWon === true && gameStarted === false) {
        var resetBtn = document.getElementById("high-score-reset");
        var gobackButton = document.getElementById("high-score-go-back");
        var scoresTitle = document.getElementById("scores-title");
        var highscoresOl = document.getElementById("ordered-list");
        var listItems = document.getElementsByTagName('li');
            resetBtn.remove();
            gobackButton.remove();
            scoresTitle.remove();
        var items = highscoresOl.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            items[i].remove();
        }
            highscoresOl.remove();
            athighScores = false;
            init();
    } else if (gameWon === false && gameStarted === false) {
        if (initialsRecord != null){
            var resetBtn = document.getElementById("high-score-reset");
            var gobackButton = document.getElementById("high-score-go-back");
            var scoresTitle = document.getElementById("scores-title");
            var highscoresOl = document.getElementById("ordered-list");
            var listItems = document.getElementsByTagName('li');
                resetBtn.remove();
                gobackButton.remove();
                scoresTitle.remove();
            var items = highscoresOl.getElementsByTagName("li");
            for (var i = 0; i < items.length; ++i) {
                items[i].remove();
            }
                highscoresOl.remove();
                athighScores = false;
                init();
        } else {
            var resetBtn = document.getElementById("high-score-reset");
            var gobackButton = document.getElementById("high-score-go-back");
            var scoresTitle = document.getElementById("scores-title");
            var highscoresOl = document.getElementById("ordered-list");
                resetBtn.remove();
                gobackButton.remove();
                scoresTitle.remove();
                athighScores = false;
                init();
        }
    }
}

// wellDone()
// calls clearButtons()
// questionHolder displays Well Done!
// countdown = finalScore
// buttonHolder element displays "your final score is + finalScore"
// answerResponse element has "enter initials" + an input + submit button

function wellDone() {
    clearButtons();
    gameWon = true;
    gameStarted = false;
    postGame = true;
    finalScore = countDown;
    answerResponse.textContent = " ";
    var victoryTitle = document.createElement('h1');
    var victoryText = document.createElement('h2');
    var victoryinputLabel = document.createElement ("h3");
    var victoryInput = document.createElement("input");
    var victoryButton = document.createElement('input');
    victoryInput.type = "text";
    victoryButton.type = "submit";
    victoryInput.name = "intitials-input";
    victoryTitle.className = "impressive-heading";
    victoryText.className = "victory-para";
    victoryInput.className = "victory-input-label";
    victoryinputLabel.className = "victory-input-label";
    victoryinputLabel.id = "input-label";
    victoryTitle.id = "victory-title";
    victoryText.id = "victory-text";
    victoryInput.id = "victory-input";
    victoryButton.id = "victory-button";
    victoryTitle.textContent = "Well Done!";
    victoryText.textContent = "Your final score is " + countDown; 
    victoryinputLabel.textContent= "Enter your intials!";
    victoryButton.textContent= "Submit score!";
    questionHolder.appendChild(victoryTitle);
    questionHolder.appendChild(victoryText);
    questionHolder.appendChild(victoryinputLabel);
    answerResponse.appendChild(victoryInput);
    answerResponse.appendChild(victoryButton);
    victoryButton.addEventListener("click", prepareResult);
}

// this was originally part of storeResult and wellDone, but was modified into a seperate function during debugging

function prepareResult() {
    var input = document.getElementById("victory-input").value;
    initials = input;
    saveResult();
}

// storeResult()
// this function stores the text from the text input generated by wellDone() into local storage and finalScore variable
// removes elements inside answerResponse using event delegation
// calls viewhighScores()

function saveResult() {
    initialsRecord.push(initials);
    highScores.push(finalScore);
    storeResult();
}

function storeResult() {
    localStorage.setItem("initials", JSON.stringify(initialsRecord));
    localStorage.setItem("finalScore", JSON.stringify(highScores));
    gethighScores();
}

// viewhighScores()
// this function summons the score board
// question holder displays text "High Scores"
// ordered list is created inside answerHolder
// intial and finalscore are retreived from local storage and pushed into arrays 
// for loop generates list items inside answerHolder iterating along the array until it hits the array length
// e.g. <li> initial[0] + "   " + finalScore[0] </li>
// creates go back and reset scores buttons underneath

function gethighScores() {
    if (gameWon === true && gameStarted == false) {
        if (athighScores === true) {
            return;
        } else {
            var victoryTitle = document.getElementById("victory-title");
            var victoryText = document.getElementById("victory-text");
            var victoryinputLabel = document.getElementById ("input-label");
            var victoryInput = document.getElementById("victory-input");
            var victoryButton = document.getElementById('victory-button');
            var highscoresOl = document.createElement("ol");
            victoryText.remove();
            victoryinputLabel.remove();
            victoryInput.remove();
            victoryButton.remove(); 
            victoryTitle.remove();
            highscoresOl.id = "ordered-list";
            answerHolder.appendChild(highscoresOl);
            initialsRecord = JSON.parse(localStorage.getItem("initials"))
            highScores = JSON.parse(localStorage.getItem("finalScore"))
            viewhighScores();
        }
    } else if (preGame === true && gameStarted === false) {
        var startBtnTwo = document.getElementById("start-button");
        var introTitleTwo = document.getElementById("main-heading");
        var introTextTwo = document.getElementById("paragraph-text");
        var highscoresOl = document.createElement("ol");
        startBtnTwo.remove();
        introTitleTwo.remove();
        introTextTwo.remove();
        highscoresOl.id = "ordered-list";
        answerHolder.appendChild(highscoresOl);
        highscoreClicked = false;
        initialsRecord = JSON.parse(localStorage.getItem("initials"))
        highScores = JSON.parse(localStorage.getItem("finalScore"))
        viewhighScores();
    } else if (gameStarted === true && gameWon === false) {
        if (gameLost === false && athighScores === false)
                clearInterval(timer);
            var question = document.getElementById("current-question");
            var highscoresOl = document.createElement("ol");
                highscoresOl.id = "ordered-list";
                answerHolder.appendChild(highscoresOl);
                question.remove();
                clearButtons();
            initialsRecord = JSON.parse(localStorage.getItem("initials"))
            highScores = JSON.parse(localStorage.getItem("finalScore"))
                viewhighScores();
    } else if (gameLost === true) {
        if (athighScores === true) {
            return;
        } else if (athighScores === false && postGame == true) {
            var failureTitle = document.getElementById("failure-title");
            var failureText = document.getElementById("failure-text");
            var failureButton = document.getElementById('failure-button');
            var highscoresOl = document.createElement("ol");
                highscoresOl.id = "ordered-list";
                answerHolder.appendChild(highscoresOl);
                failureTitle.remove();
                failureText.remove();
                failureButton.remove();
            initialsRecord = JSON.parse(localStorage.getItem("initials"))
            highScores = JSON.parse(localStorage.getItem("finalScore"))
            viewhighScores();
        }
    }
}

// viewhighScores()
// this function summons the score board
// question holder displays text "High Scores"
// ordered list is created inside answerHolder
// intial and finalscore are retreived from local storage and pushed into arrays 
// for loop generates list items inside answerHolder iterating along the array until it hits the array length
// e.g. <li> initial[0] + "   " + finalScore[0] </li>
// creates go back and reset scores buttons underneath

function viewhighScores() {
    var scoresTitle = document.createElement('h1');
    var resetBtn = document.createElement('button');
    var gobackButton = document.createElement('button');
        athighScores = true;
        gameStarted = false;
        resetBtn.textContent = "Reset Highscores";
        gobackButton.textContent = "Go back?";
        scoresTitle.textContent = "High Scores!";
        scoresTitle.className = "impressive-heading";
        gobackButton.className = "back-button";
        scoresTitle.id = "scores-title";
        resetBtn.id = "high-score-reset";
        gobackButton.id = "high-score-go-back";
        questionHolder.appendChild(scoresTitle);
        answerResponse.appendChild(gobackButton);
        answerResponse.appendChild(resetBtn);
        gobackButton.addEventListener("click", goBack);
        resetBtn.addEventListener("click", resetScores);
    var highscoresOl = document.getElementById("ordered-list");
        if (highScores === null) {
            return;
        } else {
            for (var i = 0; i < highScores.length; i++) {
                var initialforLi = initialsRecord[i];
                var scoreforLi = highScores[i];
                var listItem = document.createElement("li");
                    listItem.className = "score-list-item";
                    listItem.textContent = "            " + initialforLi + "             " + scoreforLi; 
                    highscoresOl.appendChild(listItem);
            }
        }

}
// resetScores()
// this function uses localStorage.removeItem(""); to remove the objects stored into local storage
// it uses event delegation to clear the ol and li from answerholder
function resetScores () {
    scoreReset = true;
    localStorage.removeItem("initials");
    localStorage.removeItem("finalScore");
    var highscoresOl = document.getElementById("ordered-list");
    var listItems = document.getElementsByTagName('li');
    var items = highscoresOl.getElementsByTagName("li");
    if (items.length > 0) {
        for (var i = 0; i < items.length; ++i) {
        items[i].remove();
        }
        highscoresOl.remove();
    } else {
        return;
    }
    resetScoreholders();
}

// fixes issue with arrays becoming undefined
function resetScoreholders() {
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    initialsRecord = JSON.parse(localStorage.getItem("initials")) || [];
}

init();




