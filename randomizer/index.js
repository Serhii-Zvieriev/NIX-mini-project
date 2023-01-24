const inputMin = document.querySelector("#min");
const inputMax = document.querySelector("#max");
const inputCol = document.querySelector("#col");
const btn = document.querySelector(".btn");
const checkbox = document.querySelector("#unique");
const result = document.querySelector(".result");

btn.addEventListener("click", collectionOutput);

function collectionOutput() {
  if (inputMin.value === "" || inputMax.value === "" || inputCol.value === "") {
    alert("Заполните все поля");
    return;
  }

  if (+inputMin.value > +inputMax.value) {
    alert("Некорректные данные, минимальное значение больше максимального");
    return;
  }

  if (inputMax.value - inputMin.value < inputCol.value) {
    alert("Некорректные данные, количество значений превышает диапазон");
    return;
  }

  if (inputCol.value <= 0) {
    alert(
      "Некорректные данные, количество значений не может быть меньше или равно 0"
    );
    return;
  }

  result.textContent = "";

  checkbox.checked
    ? (result.textContent = getUniqueCollection(
        inputMin.value,
        inputMax.value,
        inputCol.value
      ))
    : (result.textContent = getCollection(
        inputMin.value,
        inputMax.value,
        inputCol.value
      ));
}

// function errorChecking() {}

function getRandomInt(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function getCollection(min, max, col) {
  const arr = [];
  for (i = 0; i < col; i += 1) {
    arr.push(getRandomInt(min, max));
  }
  return arr;
}

function getUniqueCollection(min, max, col) {
  const set = new Set();

  while (set.size < col) {
    set.add(getRandomInt(min, max));
  }
  return [...set];
}
