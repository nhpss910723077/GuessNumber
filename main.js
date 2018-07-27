var inputGuess = document.querySelector(".input-guess");
var btnSubmit = document.querySelector(".btn-submit");
var previousGuess = document.querySelector(".previous-guess");
var labError = document.querySelector(".lab-error");
var victory = document.querySelector(".victory");
var btnRestart = document.querySelector(".btn-restart");

var count = 1;
var answer = [];

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function prompt() {
    var aNumber = 0;
    var bNumber = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (answer[i] == inputGuess.value.slice(j, j + 1)) {
                if (i == j) {
                    aNumber++;
                } else {
                    bNumber++;
                }
            }
        }
    }
    return aNumber + "A" + bNumber + "B";
}

function createAnswer() {
    for (var i = 0; i < 4; i++) {
        answer[i] = random(0, 10);
    }
    while (answer[0] === answer[1]) {
        answer[1] = random(0, 10);
    }
    while (answer[0] === answer[2] || answer[1] === answer[2]) {
        answer[2] = random(0, 10);
    }
    while (answer[0] === answer[3] || answer[1] === answer[3] || answer[2] === answer[3]) {
        answer[3] = random(0, 10);
    }
}

function submit() {  
    var formText = document.createElement("p");
    formGuess.appendChild(formText);    
    formText.textContent = "第" + count + "次猜:" + inputGuess.value + " 提示:" + prompt();
    inputGuess.value = "";
    inputGuess.focus();
    count++;
}

function checkAnswer() {
    if (isNaN(inputGuess.value)) {
        labError.textContent = "請輸入正確的數字";
    } else if (!(inputGuess.value.length == 4)) {
        labError.textContent = "請輸入四個數字";
    } else if (inputGuess.value.slice(0, 1) == inputGuess.value.slice(1, 2) ||
        inputGuess.value.slice(0, 1) == inputGuess.value.slice(2, 3) ||
        inputGuess.value.slice(0, 1) == inputGuess.value.slice(3, 4) ||
        inputGuess.value.slice(1, 2) == inputGuess.value.slice(2, 3) ||
        inputGuess.value.slice(1, 2) == inputGuess.value.slice(3, 4) ||
        inputGuess.value.slice(2, 3) == inputGuess.value.slice(3, 4)) {
        labError.textContent = "請勿輸入重複數字";
    } else if (prompt().slice(0,1)==4) {
        victory.style.display = "block";        
    } else {
        labError.textContent = "";
        submit();
    }
}

var formGuess = document.createElement("div");
previousGuess.appendChild(formGuess);

inputGuess.focus();
createAnswer();

btnSubmit.addEventListener('click', checkAnswer);
