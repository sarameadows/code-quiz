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
    }
}

// button event listeners
startBtn.addEventListener("click", displayQuiz);
answer1.addEventListener("click", choice1);
answer2.addEventListener("click", choice2);
answer3.addEventListener("click", choice3);
answer4.addEventListener("click", choice4);