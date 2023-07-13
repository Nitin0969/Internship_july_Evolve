const questions = [
    {
        question:"Who invented C++?",
        answers : [
            {text:"Dennis Ritchie",correct : false},
            {text:"Bjarne Stroustrup",correct : true},
            {text:"Ken Thompson",correct : false},
            {text:"Brian Kernighan",correct : false},
        ]
    },
    {
        question:"What is C++?",
        answers : [
            {text:"C++ is a functional programming language",correct : false},
            {text:"C++ supports both procedural and oops",correct : true},
            {text:"C++ is a procedural programming language",correct : false},
            {text:"C++ is an object oriented programming language",correct : false},
        ]
    },
    {
        question:"Which of the following approach is used by C++?",
        answers : [
            {text:"Left-right",correct : false},
            {text:"Top-down",correct : false},
            {text:"Bottom-up",correct : true},
            {text:"Right-left",correct : false},
        ]
    }
    , {
        question:"Which of the following user-defined header file extension used in c++?",
        answers : [
            {text:"hg",correct : false},
            {text:"cpp",correct : false},
            {text:"h",correct : true},
            {text:"hf",correct : false},
        ]
    }

];
const QuestionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz(){
    currentquestionindex = 0;
    score = 0;
    answerButtons.innerHTML = "Next";
    showquestion();
}
function showquestion(){
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    QuestionElement.innerHTML = questionno + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click",selectanswer);
    });
}
function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectanswer(e){
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct ==="true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display = "block";
}
function showscore(){
    resetstate();
    QuestionElement.innerHTML = `you scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Next";
    nextButton = "block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showquestion();
    }
    else{
        showscore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentquestionindex < questions.length){
        handlenextbutton();
    }
    else{
        startquiz();
        }

});
startquiz();