const questions = [
    {
        question: "Name the animal who cannot jump?",
        answers: [
            {text: "Dog", correct: false},
            {text: "Elephant", correct: true},
            {text: "Tiger", correct: false},
            {text: "Cat", correct: false},
        ]
    },
    {
        question: "Which month is the longest?",
        answers: [
            {text: "February", correct: false},
            {text: "March", correct: false},
            {text: "July", correct: false},
            {text: "January", correct: true},
        ]
    },
    {
        question: "How many minutes are in 1.5 hours?",
        answers: [
            {text: "90 mins", correct: true},
            {text: "60 mins", correct: false},
            {text: "100 mins", correct: false},
            {text: "120 mins", correct: false},
        ]
    },
    {
        question: "How many days are in a week?",
        answers: [
            {text: "9", correct: false},
            {text: "4", correct: false},
            {text: "7", correct: true},
            {text: "10", correct: false},
        ]
    },
    {
        question: "How many legs do a spider usually have?",
        answers: [
            {text: "6", correct: false},
            {text: "8", correct: true},
            {text: "10", correct: false},
            {text: "12", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
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
    reset();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function reset() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
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
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    reset();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
})

startQuiz();