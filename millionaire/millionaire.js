import questions from "./questions.js";
console.log(questions);

const question = document.querySelector(".question");
const answerOptions = document.querySelector(".answerOptions");
const answerA = document.querySelector(".a");
const answerB = document.querySelector(".b");
const answerC = document.querySelector(".c");
const answerD = document.querySelector(".d");
const btnAnswer = document.querySelector(".btnAnswer");
const btnAskQuestion = document.querySelector(".btnAskQuestion");

let count = 0;
let key = "";

const clickOnAnswer = (e) => {
  if (!e.target.classList.contains("answer")) return;
  key = e.target.textContent;
  console.dir(key);
};

function askQuestion() {
  question.textContent = questions[count].question;
  answerA.textContent = questions[count].answers.a;
  answerB.textContent = questions[count].answers.b;
  answerC.textContent = questions[count].answers.c;
  answerD.textContent = questions[count].answers.d;
}

function checkingAnswer() {
  console.log(count, +key, questions[count].answer);
  if (+key === questions[count].answer) {
    console.log("+");
  }
  count += 1;
}

// answerOptions.addEventListener("click", clickOnAnswer);
answerOptions.onclick = clickOnAnswer;
btnAskQuestion.onclick = askQuestion;
btnAnswer.onclick = checkingAnswer;
