// quiz questions
const questions = [
    {
        title: "Commonly used data types DO NOT include: ",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within __________.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        title: "Arrays in javascript can be used to store __________.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within __________ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];

// header elements
const viewHighScores = document.getElementById("view-high-scores");
const time = document.getElementById("time");

// basic quiz elements
var score = 0;
var questionIndex = 0;

// start div elements
const startDiv = document.getElementById("start");
const startBtn = document.getElementById("start-button");

// quiz question elements
const quizDiv = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const answer1 = document.getElementById("answer-1");
const answer2 = document.getElementById("answer-2");
const answer3 = document.getElementById("answer-3");
const answer4 = document.getElementById("answer-4");
const answerCheck = document.getElementById("answer-check")

// individual score display elements
const individualScoreDiv = document.getElementById('individual-score');
const finalScoreDisplay = document.getElementById('final-score');
const initialsInfo = document.getElementById('initials');
const submitInitialsBtn = document.getElementById('submit-initials');

// high score display elements
const highScoreDiv = document.getElementById('high-score');
const highScoreListDiv = document.getElementById('high-scores-list');
const backBtn = document.getElementById('back');
const clearBtn = document.getElementById('clear');

// hide start screen and display quiz questions
function displayQuiz() {
    startDiv.style.display = "none";
    quizDiv.style.display = "";
    displayQuestion();
}

// display the question and answer choices
function displayQuestion() {
    questionTitle.textContent = questions[questionIndex].title;
    answer1.textContent = questions[questionIndex].choices[0];
    answer2.textContent = questions[questionIndex].choices[1];
    answer3.textContent = questions[questionIndex].choices[2];
    answer4.textContent = questions[questionIndex].choices[3];
}

// functions to check answer depending on selection
function choice1() {checkAnswer(0);};
function choice2() {checkAnswer(1);};
function choice3() {checkAnswer(2);};
function choice4() {checkAnswer(3);};

// check the answer choice with true answer, update score, and index to next question
function checkAnswer(answer) {
    console.log(score);
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        score = score + 5;
        console.log(score);
        answerCheck.style.display = "block";
        answerCheck.textContent = "Correct!";
    } else {
        answerCheck.style.display = "block";
        answerCheck.textContent = "Wrong!"
    }

    // set index to ask next question
    questionIndex++;
    if (questionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
};

// when quiz is over display the individual score div to see and save score
function endQuiz() {
    quizDiv.style.display = "none";
    finalScoreDisplay.textContent = score;
    individualScoreDiv.style.display = "block";
};

// save initials and score to local storage
function saveHighScore(event) {
    event.preventDefault();

    // get locally saved high scores and set up an array to add them to
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArr;

    // if there are no high scores set to blank array to add to, if there are, parse through the item to create scoresArr
    if (savedHighScores === null) {
        scoresArr = [];
    } else {
        scoresArr = JSON.parse(savedHighScores);
    }

    // add user score to the scores array
    var userScore = {
        initials: initialsInfo.value,
        score: finalScoreDisplay.textContent
    }
    scoresArr.push(userScore);

    // stringify the scores array and send to local storage
    var highScoresString = JSON.stringify(scoresArr);
    window.localStorage.setItem("high scores", highScoresString);

    displayHighScores();
};

// display the high scores from local storage
function displayHighScores() {
    // navigate to high score page
    individualScoreDiv.style.display = "none";
    startDiv.style.display = "none";
    quizDiv.style.display = "none";
    highScoreDiv.style.display = "block";

    // get high scores from local storage
    var savedHighScores = localStorage.getItem("high scores");

    // if there are no high scores notify user and return
    if (!savedHighScores) {
        highScoreListDiv.innerHTML = "No high scores";
        return;
    }

    // parse high scores item
    var highScores = JSON.parse(savedHighScores);

    // go through each high score from local storage, create list item and append to high score list div
    for(let i = 0; i < highScores.length; i++) {
        var loadHighScore = document.createElement("p");
        loadHighScore.classList.add("list-group-item");
        loadHighScore.classList.add("list-group-item-info");
        loadHighScore.innerHTML = `${i + 1}. ${highScores[i].initials}: ${highScores[i].score}`;
        highScoreListDiv.appendChild(loadHighScore);
    }

};

// button event listeners to start quiz and answer questions
startBtn.addEventListener("click", displayQuiz);
answer1.addEventListener("click", choice1);
answer2.addEventListener("click", choice2);
answer3.addEventListener("click", choice3);
answer4.addEventListener("click", choice4);

// route to saveHighScore to save score in local storage
submitInitialsBtn.addEventListener("click", function(event){
    saveHighScore(event);
});

// load high scores without going through quiz
viewHighScores.addEventListener("click", function() {
    displayHighScores();
});

// clear high scores in local storage
clearBtn.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    highScoreListDiv.innerHTML = "High scores cleared";
});

// take user back to beginning of quiz
backBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreDiv.style.display = "none";
});