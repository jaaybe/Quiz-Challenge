var quizQuestions = [
    { q: "test question 1", a: 0, options: ["A. Washington DC", "B. Los Angeles", "C. San Fran", "D. Seattle"] },
    { q: "test question 2", a: 0, options: ["A. Washington DC", "B. Los Angeles", "C. San Fran", "D. Seattle"] },
    { q: "test question 3", a: 0, options: ["A. Washington DC", "B. Los Angeles", "C. San Fran", "D. Seattle"] },
    { q: "test question 4", a: 0, options: ["A. Washington DC", "B. Los Angeles", "C. San Fran", "D. Seattle"] },
    { q: "test question 5", a: 0, options: ["A. Washington DC", "B. Los Angeles", "C. San Fran", "D. Seattle"] },
];

var currentQuestion = 0;
var timer = 60;
document.getElementById("start-quiz").addEventListener("click", function () {
    displayQuestion();
    startTimer();
})

function displayQuestion() {
    document.getElementById('top-content').innerHTML = '';
    document.getElementById('mid-content').innerHTML = '';
    document.getElementById('buttons').innerHTML = '';
    // the first question
    var question = quizQuestions[currentQuestion];
    document.getElementById("mid-content").innerText = question.q;

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
                timer -= 10;
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
    }
};

function startTimer() {
    var createTimer = setInterval(function () {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer == 0) {
            // stop the quiz
            clearInterval(createTimer);
            enterNewHighScore();
        }
    }, 1000);
}

// adds a new high score in the array
// call this function once the quiz has finished
function enterNewHighScore() {
    var initials = prompt('Enter your initials: ');
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({
        score: timer,
        initials: initials
    })
    // save the scores back to the localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
    displayHighScore();
}
// ran when the quiz is complete
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
    document.getElementById('top-content').innerHTML = '';
    document.getElementById('mid-content').innerHTML = '';
    document.getElementById('buttons').innerHTML = '';

    var startAgainBtn = document.createElement("button");
    var clearHighScoresBtn = document.createElement("button");
    startAgainBtn.innerText = "Start Quiz Again";
    startAgainBtn.className = "buttonCentered";
    clearHighScoresBtn.innerText = "Clear All High Scores";
    clearHighScoresBtn.className = "buttonCentered";

    document.getElementById("buttons").appendChild(startAgainBtn);
    document.getElementById("buttons").appendChild(clearHighScoresBtn);

    startAgainBtn.addEventListener("click", function () {
        currentQuestion = 0;
        timer = 60;
        displayQuestion();
        startTimer();
    });

    clearHighScoresBtn.addEventListener("click", function() {
        localStorage.clear();
        document.getElementById('mid-content').innerHTML = '';
    });

    for (var i = 0; i < scores.length; i++) {
        console.log(scores)
        document.getElementById("mid-content").innerText += scores[i].initials + " " + scores[i].score;
    }
}












