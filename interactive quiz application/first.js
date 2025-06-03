const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Text Machine Learning", correct: false },
      { text: "Hyper Text Marking Language", correct: false },
    ],
  },
  {
    question: "What is the capital of india ?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "Delhi", correct: true },
      { text: "vijayawada", correct: false },
      { text: "Hyderabad", correct: false },
    ],
  },
  {
    question: "Which is the national animal among this?",
    answers: [
      { text: "Tiger", correct: true },
      { text: "Lion", correct: false },
      { text: "Elephant", correct: false },
      { text: "Horse", correct: false },
    ],
  },
  {
    question: "What is the full form of css?",
    answers: [
      { text: "styling sheet", correct: false },
      { text: "cascading styles sheet", correct: true },
      { text: "computer styles sheet", correct: false },
      { text: "cascading styles", correct: false },
    ],
  },
  {
    question: "Who is the cm of telangana?",
    answers: [
      { text: "Revanth reddy", correct: true },
      { text: "Bandi sanjay", correct: false },
      { text: "KCR", correct: false },
      { text: "KTR", correct: false },
    ],
  },
  {
    question: "What is the capital city of telangana?",
    answers: [
      { text: "Hyderabad", correct: true },
      { text: "sangarddy", correct: false },
      { text: "patancheruvu", correct: false },
      { text: "warangal", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => {
      selectAnswer(e);
    });
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Thank you :)`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
