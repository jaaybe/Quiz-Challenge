var quizQuestions = [
    { q: "Commonly used data types do NOT include:", a: 2, options: ["A. strings", "B. booleans", "C. alerts", "D. numbers"] },
    { q: "The condition in an IF / ELSE statement is enclosed with:", a: 1, options: ["A. quotes", "B. curly brackets", "C. parenthesis", "D. square brackets"] },
    { q: "Arrays in JavaScript can be used to store _______ .", a: 3, options: ["A. numbers and strings", "B. other arrays", "C. booleans", "D. all of the above"] },
    { q: "String values must be enclosed within ______ when being assigned to variables.", a: 2, options: ["A. commas", "B. curly brackets", "C. quotes", "D. parenthesis"] },
    { q: "A very useful tool used during development and debugging for printing content to the debugger is:", a: 3, options: ["A. JavaScript", "B. terminal/bash", "C. for loops", "D. console.log"] },
];

var FinalScore = 0
var currentQuestion = 0;
var timer = 60;
var createTimer

var highScoresPageEl = document.getElementById("highScoresPage");
highScoresPageEl.addEventListener("click", displayHighScore);

document.getElementById("start-quiz").addEventListener("click", function () {
    displayQuestion();
    startTimer();
})

function displayQuestion() {
    document.getElementById('top-content').innerHTML = '';
    document.getElementById('mid-content').innerHTML = '';
    document.getElementById('buttons').innerHTML = '';
    document.getElementById("highScoresPage").hidden = true;
    document.getElementById("nav").style.justifyContent = "space-evenly";
    
    // the first question
    var question = quizQuestions[currentQuestion];
    document.getElementById("mid-content").innerText = question.q;
    document.getElementById("mid-content").className = "questions";

    for (var i = 0; i < question.options.length; i++) {
        var button = document.createElement("button")
        button.className = "buttonLeft"
        button.innerText = question.options[i]
        button.value = i
        button.addEventListener("click", function (event) {
            if (Number(event.target.value) === question.a) {
                console.log("correct answer");
                if (quizQuestions.length - 1 === currentQuestion) {
                    // done with quiz / go to high score 
                    enterNewHighScore()
                } else {
                    currentQuestion++;
                    displayQuestion();
                }

            } else {
                console.log("incorrect answer");
                calculateTimer();
                //timer -= 10;
                if (quizQuestions.length - 1 === currentQuestion) {
                    // done with quiz / go to high score
                    enterNewHighScore();
                } else {
                    // alert they're incorrect 
                    currentQuestion++;
                    displayQuestion();
                }

            }

        })
        document.getElementById("buttons").appendChild(button);
        document.getElementById("buttons").className = "buttonsSectionLeft";
    }
};

function startTimer() {
    document.getElementById("timerHolder").className = "activeTimer";
    createTimer = setInterval(function () {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer == 0) {
            // stop the quiz
            clearInterval(createTimer);
            enterNewHighScore();
        }
    }, 1000);

}

function calculateTimer() {
    if (timer <= 10) {
        timer === 0
    } else {
        timer -= 10
    }
};

// adds a new high score in the array
// call this function once the quiz has finished
function enterNewHighScore() {
    FinalScore = timer;
    clearInterval(createTimer);
    var initials = prompt('Enter your initials: ');
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({
        score: FinalScore,
        initials: initials
    })
    // save the scores back to the localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
    displayHighScore();
}

// run when the quiz is complete
function displayHighScore() {
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    // sorts the scores in order
    for (var i = 0; i < scores.length - 1; i++) {
        var temp = scores[i]; // current score in the array
        // if the next value is greater than the current score
        if (scores[i + 1] > scores[i]) {
            // swap their positions
            scores[i] = scores[i + 1];
            scores[i + 1] = temp;
        }
    }

    //document.getElementById("highScoresPage").hidden = false;
    var midContent = document.getElementById("mid-content");
    var scoresList = document.createElement("ol");


    document.getElementById('top-content').innerHTML = 'HIGH SCORES';
    document.getElementById('top-content').className = "hero";
    document.getElementById('mid-content').innerHTML = '';
    document.getElementById("mid-content").className = "questions";
    document.getElementById('buttons').innerHTML = '';
    document.getElementById("buttons").className = "buttonsSectionCentered";
    document.getElementById("highScoresPage").hidden = true;
    document.getElementById("nav").style.justifyContent = "space-evenly";
    midContent.appendChild(scoresList);


    var startAgainBtn = document.createElement("button");
    var clearHighScoresBtn = document.createElement("button");
    startAgainBtn.innerText = "Start Quiz Again";
    startAgainBtn.className = "buttonCentered";
    clearHighScoresBtn.innerText = "Clear High Scores";
    clearHighScoresBtn.className = "buttonCentered";

    document.getElementById("buttons").appendChild(startAgainBtn);
    document.getElementById("buttons").appendChild(clearHighScoresBtn);

    startAgainBtn.addEventListener("click", function () {
        currentQuestion = 0;
        timer = 60;
        displayQuestion();
        startTimer();
    });

    clearHighScoresBtn.addEventListener("click", function () {
        localStorage.clear();
        document.getElementById('mid-content').innerHTML = '';
    });

    scores.sort((a, b) => {
        return b.score - a.score
    });

    for (var i = 0; i < 5; i++) {
        var scoreEntry = document.createElement("li");
        scoreEntry.innerText = scores[i].initials + " " + scores[i].score;
        scoresList.appendChild(scoreEntry);
    }

};
