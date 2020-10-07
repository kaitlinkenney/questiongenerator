var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses",
    },
  //   {
  //     question: "What is the biggest island in the world?",
  //     choices: ["Greenland", "Antarctica", "Australia", "New Zealand"],
  //     answer: "Greenland",
  //   },
  //   {
  //     question: "Who saved James Potter's life in the Harry Potter series?",
  //     choices: ["Dumbledore", "Ron Weasley", "Snape", "Sirius Black"],
  //     answer: "Snape",
  //   },
  //   {
  //     question: "What is a good topping for beef tacos?",
  //     choices: ["ketchup", "Adobo", "lemon pepper", "mayonnaise"],
  //     answer: "Adobo",
  //   }
  //   {
  //     question: "In Breaking Bad, what subject did Walter White teach?",
  //     choices: ["chemistry", "biology", "history", "French"],
  //     answer: "chemistry",
  //   },
  //   {
  //     question: "Which of the following is an anime film?",
  //     choices: ["Family Guy", "Attack on Titan", "Bob's Burgers", "Vampire Diaries"],
  //     answer: "Attack on Titan",
  //   }
  ];
  
  var questionEl = document.querySelector("#question");
  var optionListEl = document.querySelector("#option-list");
  var questionResultEl = document.querySelector("#question-result");
  var timerEl = document.querySelector("#timer");
  //var highscoresbtn = document.querySelector("#highscoresbtn");
  var highscorediv = document.querySelector(".highscores");


  var questionIndex = 0;
  var correctCount = 0;


  var time = 20;
  var intervalId;

  function endQuiz() {

    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
    var highscoresbtn = document.createElement("button");
      highscoresbtn.textContent = "High Scores";
      highscoresbtn.setAttribute("class", "btn btn-outline-secondary")
      highscoresbtn.setAttribute("id", "highscoresbtn")
      highscorediv.appendChild(highscoresbtn);

    
    highscoresbtn.addEventListener("click", showHighScore);
      clearInterval(intervalId);
      document.body.appendChild(highscoresbtn);

   // setTimeout (showHighScore, 2);
  }


  function showHighScore() {

    var name = prompt("Please enter your name");


    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
      high_scores = [];
    } else {
      high_scores = JSON.parse(high_scores);
    }

    high_scores.push({ name: name, score: correctCount});

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
      return b.score - a.score;
    });

    
        

    var contentUL = document.createElement("ul");

    for (var i=0; i < high_scores.length; i++) {
      var contentLI = document.createElement("li");
      contentLI.textContent =
        "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
      contentUL.appendChild(contentLI);
    }

  document.body.appendChild(contentUL);
  }

  function updateTime() {
    time--;
    timerEl.textContent = "Timer:  " + time;
    if (time <= 0) {
      endQuiz();
    }
  }

  function renderQuestion() {

    if (time == 0) {
      updateTime();
      return;
    }

    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLength = choices.length;

    for (var i = 0; i < choicesLength; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.textContent = choices[i];
      optionListEl.append(questionListItem);
    }
  }

  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      time = 0;
    }
    renderQuestion();
  }

  function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
      var answer = event.target.textContent;
      if (answer === questions[questionIndex].answer) {
        questionResultEl.textContent = "Correct";
        correctCount++;
      } else {
        questionResultEl.textContent = "Incorrect";
        time = time - 2;
        timerEl.textContent = time;
      }
    }
    setTimeout(nextQuestion, 2000);
  }

  renderQuestion();
  optionListEl.addEventListener("click", checkAnswer);