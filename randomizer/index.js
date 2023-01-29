const inputMin = document.querySelector("#min");
const inputMax = document.querySelector("#max");
const inputCol = document.querySelector("#col");
const btn = document.querySelector(".btn");
const checkbox = document.querySelector("#unique");
const result = document.querySelector(".result");

btn.addEventListener("click", collectionOutput);

function collectionOutput() {
  let arrNum = null;
  result.textContent = "";

  if (errorChecking(inputMin, inputMax, inputCol)) {
    return;
  }
  checkbox.checked
    ? (arrNum = getUniqueCollection(
        inputMin.value,
        inputMax.value,
        inputCol.value
      ))
    : (arrNum = getCollection(inputMin.value, inputMax.value, inputCol.value));

  if (arrNum.length > 100) {
    // я сделал чтобы выдавало предупреждение про количество нужных чисел
    //и после чего уменьшало количество значений до 100 и выводило их
    //как по мне так user experience будет на высоком уровне
    alert("количество значений не может привышать 100");
    result.textContent = arrNum.slice(0, 99).join(", ");
  } else {
    result.textContent = arrNum.join(", ");
  }
}

function errorChecking(inputMin, inputMax, inputCol) {
  if (inputMin.value === "" || inputMax.value === "" || inputCol.value === "") {
    alert("Заполните все поля");
    return true;
  }

  if (+inputMin.value > +inputMax.value) {
    alert("Некорректные данные, минимальное значение больше максимального");
    return true;
  }

  if (inputMax.value - inputMin.value < inputCol.value) {
    alert("Некорректные данные, количество значений превышает диапазон");
    return true;
  }

  if (inputCol.value <= 0) {
    alert(
      "Некорректные данные, количество значений не может быть меньше или равно 0"
    );
    return true;
  }
}

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
