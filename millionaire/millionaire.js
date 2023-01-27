import questions from "./questions.js";
import bankArr from "./bank.js";
console.log(questions);
console.log(bankArr);

const question = document.querySelector(".question");
const answerOptions = document.querySelector(".answerOptions");
const answerA = document.querySelector(".a");
const answerB = document.querySelector(".b");
const answerC = document.querySelector(".c");
const answerD = document.querySelector(".d");
const btnAnswer = document.querySelector(".btnAnswer");
const btnAskQuestion = document.querySelector(".btnAskQuestion");
const bankEl = document.querySelector(".bank");
const yourWinnings = document.querySelector(".yourWinnings");
const fififtyFififty = document.querySelector(".fififtyFififty");

let count = 0;
let key = "";
let numAnswer = "";
btnAnswer.disabled = true;
let useFififtyFififty = false;

// bankEl.textContent = "Ваш банк 0";
// answerOptions.classList.add("isDisabled"); // не понимаю по чему при нажатии кнопки не могу его удалить

const clickOnAnswer = (e) => {
  if (!e.target.classList.contains("answer")) return;
  key = e.target.textContent;
  numAnswer = e.target;
  numAnswer.classList.add("isAnswer");
  btnAnswer.disabled = false;
  answerOptions.classList.add("isDisabled");

  if (!useFififtyFififty) {
    fififtyFififty.disabled = true;
  }
};

function askQuestion() {
  question.textContent = questions[count].question;
  answerA.textContent = questions[count].answers.a;
  answerB.textContent = questions[count].answers.b;
  answerC.textContent = questions[count].answers.c;
  answerD.textContent = questions[count].answers.d;
  btnAskQuestion.disabled = true;
  if (!useFififtyFififty) {
    fififtyFififty.disabled = false;
  }

  if (numAnswer) {
    numAnswer.classList.remove("isAnswer", "isTrue", "isFalse");
  }
  answerOptions.classList.remove("isDisabled");
}

function checkingAnswer() {
  console.log(count, +key, questions[count].answer);
  if (+key === questions[count].answer) {
    numAnswer.classList.add("isTrue");
    console.log("Ответ верный");
    count += 1;
    bankEl.textContent = `Ваш банк ${bankArr[count].sum}`;

    if (count === 14) {
      yourWinnings.textContent = `Вы победили, Ваш выигрыш составляет ${bankArr[14].sum}, Игра окончена!!!`;
      return;
    }
  } else {
    console.log("Ответ не верный");
    numAnswer.classList.add("isFalse");
    bankEl.style.display = "none";
    if (count < 5) {
      yourWinnings.textContent = "К сожалению вы не выиграли нечего";
    } else if (count >= 5 && count < 10) {
      yourWinnings.textContent = `Игра окончена, Ваш выигрыш составляет ${bankArr[5].sum}`;
    } else if (count >= 10 && count < 14) {
      yourWinnings.textContent = `Игра окончена, Ваш выигрыш составляет ${bankArr[10].sum}`;
    }
  }

  btnAskQuestion.disabled = false;
  btnAnswer.disabled = true;
}

function usingFififtyFififty() {
  const answerArr = [
    questions[count].answers.a,
    questions[count].answers.b,
    questions[count].answers.c,
    questions[count].answers.d,
  ];
  const answer = questions[count].answer;

  let idxAnswer = answerArr.indexOf(+answer);
  const idxRandomAnswer = getRandomIntNoDefiniteValues(0, 3, idxAnswer);

  console.log(idxAnswer, idxRandomAnswer);

  if (+answerA.textContent === answerArr[idxAnswer]) {
    answerA.textContent = answerArr[idxAnswer];
  } else if (+answerA.textContent === answerArr[idxRandomAnswer]) {
    answerA.textContent = answerArr[idxRandomAnswer];
  } else {
    answerA.textContent = "-";
  }

  if (+answerB.textContent === answerArr[idxAnswer]) {
    answerB.textContent = answerArr[idxAnswer];
  } else if (+answerB.textContent === answerArr[idxRandomAnswer]) {
    answerB.textContent = answerArr[idxRandomAnswer];
  } else {
    answerB.textContent = "-";
  }

  if (+answerC.textContent === answerArr[idxAnswer]) {
    answerC.textContent = answerArr[idxAnswer];
  } else if (+answerC.textContent === answerArr[idxRandomAnswer]) {
    answerC.textContent = answerArr[idxRandomAnswer];
  } else {
    answerC.textContent = "-";
  }

  if (+answerD.textContent === answerArr[idxAnswer]) {
    answerD.textContent = answerArr[idxAnswer];
  } else if (+answerD.textContent === answerArr[idxRandomAnswer]) {
    answerD.textContent = answerArr[idxRandomAnswer];
  } else {
    answerD.textContent = "-";
  }

  useFififtyFififty = true;
  fififtyFififty.disabled = true;
}

function getRandomInt(min, max) {
  return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
}

function getRandomIntNoDefiniteValues(min, max, value) {
  let fff = getRandomInt(min, max);
  if (fff !== value) {
    return fff;
  } else {
    getRandomIntNoDefiniteValues(min, max, value);
  }
}

// answerOptions.addEventListener("click", clickOnAnswer);
answerOptions.onclick = clickOnAnswer;
btnAskQuestion.onclick = askQuestion;
btnAnswer.onclick = checkingAnswer;
fififtyFififty.onclick = usingFififtyFififty;
