const questions = [
    {
        question : "Javascript is an _______ language?",
        answers: [
            { text: "Object-oriented" , correct: true},
            { text: "Procedural" , correct: false},
            { text: "Object-based" , correct: false},
            { text: "None of the above" , correct: false},
        ]
        
    },
    {
        question : "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            { text: "var" , correct: false},
            { text: "let" , correct: false},
            { text: "const" , correct: false},
            { text: "All of the above" , correct: true},
        ]
    },
    {
        question : "What is JavaScript?",
        answers: [
            { text: "None" , correct: false},
            { text: "JavaScript is a compiled language used to make the website interactive" , correct: false},
            { text: "JavaScript is an assembly language used to make the website interactive" , correct: false},
            { text: "JavaScript is a scripting language used to make the website interactive" , correct: true},
        ]
    },
    {
        question : "What is the basic difference between JavaScript and Java?",
        answers: [
            { text: "Functions are considered as fields" , correct: false},
            { text: "Functions are values, and there is no hard distinction between methods and fields" , correct: true},
            { text: "Variables are specific" , correct: false},
            { text: "There is no difference" , correct: false},
        ]
    },
    {
        question : "Which programming language is used to add functionality to the webpage",
        answers: [
            { text: "HTML" , correct: false},
            { text: "CSS" , correct: false},
            { text: "Javascript" , correct: true},
            { text: "java" , correct: false},
        ]
    },
    {
        question : "Which programming language is dynamically typed language ",
        answers: [
            { text: "Javascipt" , correct: true},
            { text: "c++" , correct: false},
            { text: "Java" , correct: false},
            { text: "Python" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("corrext");
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML =  `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();