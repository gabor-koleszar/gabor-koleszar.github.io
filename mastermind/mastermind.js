const startGame = document.querySelector(".js-start-game");
const startBtn = document.querySelector(".js-start-game-btn")
const resultContainer = document.querySelector(".js-result-container");
const resultOutput = document.querySelector(".js-result");
const winnOutput = document.querySelector(".js-winn");
const guessSection = document.querySelector(".js-guess");
const guessForm = document.querySelector(".js-guess-form");
const num1Input = document.querySelector("[name=num1]");
const num2Input = document.querySelector("[name=num2]");
const num3Input = document.querySelector("[name=num3]");
const num4Input = document.querySelector("[name=num4]");
let guessArr = [];
let secretArr = [];
let rounds = 0;

function generateSecretCode() {
    for (let i = 0; i < 4; i++) {
        secretArr.push(Math.trunc(Math.random() * 10));
    }
}

function identicalMatch(secret, guess) {
    let sCopy = secret.slice();
    let gCopy = guess.slice();
    let match = 0;
    let minus = 0;
    for (let i in guess) {
        if (guess[i] === secret[i]) {
            match++;
            sCopy.splice(i - minus, 1);
            gCopy.splice(i - minus, 1);
            minus++;
        }
    }

    return [match, sCopy, gCopy];
}

function halfMatch(secret, guess) {
    let guessCopy = guess.slice();
    let match = 0;
    for (let j in secret) {
        if (guessCopy.includes(secret[j])) {
            guessCopy.splice(guessCopy.indexOf(secret[j]), 1);
            match++;
        }
    }
    
    return match;
}

function notMatch(totalMatch, partialMatch) {
    return 4 - (totalMatch + partialMatch);
}

function match(secret, guess) {
    let totalMatch = identicalMatch(secret, guess);
    let partialMatch = halfMatch(totalMatch[1], totalMatch[2]);
    let reminder = notMatch(totalMatch[0], partialMatch);

    return [totalMatch[0], partialMatch, reminder];
}

function drawSquares(whiteSquares, blackSquares, emptySquares) {
    let html = '';

    if (whiteSquares > 0) {
        for (let i = 1; i <= whiteSquares; i++) {
            html += `<div class="square white-square"></div>`;
        }
    }

    if (blackSquares > 0) {
        for (let i = 1; i <= blackSquares; i++) {
            html += `<div class="square black-square"></div>`;
        }
    }

    if (emptySquares > 0) {
        for (let i = 1; i <= emptySquares; i++) {
            html += `<div class="square empty-square"></div>`;
        }
    }

    return html;
}

function showResult(whiteSquares, blackSquares, emptySquares) {
    if (resultContainer.classList.contains("result-container-hidden")) {
        resultContainer.classList.remove("result-container-hidden");
        resultContainer.classList.add("result-container-show");
    }

    const squares = drawSquares(whiteSquares, blackSquares, emptySquares);
    
    html = `
        <div class="square-container">
            <div class="rounds">${rounds}</div>
            ${squares}
        </div>
    `;

    resultOutput.innerHTML = html;
}

function renderGameResult(whiteSquares) {
    let gameResult = "";

    if (whiteSquares === 4) {
        gameResult = "Nyertél"
    } else {
        gameResult = "Vesztettél";
    }

    winnOutput.innerHTML = `
        <p>${gameResult}</p>
    `;
}

function evaluateInput(event) {
    event.preventDefault();
    rounds++;
    // reset guess values
    guessArr = [];
    // get guess values
    guessArr.push(parseInt(num1Input.value));
    guessArr.push(parseInt(num2Input.value));
    guessArr.push(parseInt(num3Input.value));
    guessArr.push(parseInt(num4Input.value));
    
    const matchArr = match(secretArr, guessArr);

    let whiteSquares = matchArr[0];
    let blackSquares = matchArr[1];
    let emptySquares = matchArr[2];

    if (whiteSquares === 4 || rounds >= 10) {
        startBtn.disabled = true;
        startBtn.classList.add("btn-disabled");
        renderGameResult(whiteSquares);
    }

    showResult(whiteSquares, blackSquares, emptySquares);

}

function newGame(event) {
    event.preventDefault();
    if (guessSection.classList.contains("guess-hidden")) {
        guessSection.classList.remove("guess-hidden");
        guessSection.classList.add("guess-show");
    }

    if (startBtn.disabled === true) {
        startBtn.disabled = false;
        startBtn.classList.remove("btn-disabled");
    }

    secretArr = [];
    guessArr = [];
    num1Input.value = 0;
    num2Input.value = 0;
    num3Input.value = 0;
    num4Input.value = 0;
    winnOutput.innerHTML = '';
    rounds = 0;

    if (resultContainer.classList.contains("result-container-show")) {
        resultContainer.classList.remove("result-container-show");
        resultContainer.classList.add("result-container-hidden");
    }

    generateSecretCode();
}

startGame.addEventListener("click", newGame);
guessForm.addEventListener("submit", evaluateInput);


































// function match(guess, secret){
//     let sCopy = secret.slice();
//     let gCopy = guess.slice();
//     let len = gCopy.length;
//     let identicalMatch = 0;
//     let includesMatch = 0;
//     for(let i = 0; i < len; i++){
//         if(gCopy[i] === sCopy[i]){
//             identicalMatch++;
//             sCopy.splice(i, 1);
//             gCopy.splice(i, 1);
//         }
//     }

//     includesMatch = partialMatch(gCopy, sCopy);

//     return [identicalMatch, includesMatch];
// }

// function partialMatch(guess, secret){
//     let sCopy = secret.slice();
//     let gCopy = guess.slice();
//     let match = 0;
//     for(let i in gCopy){
//         if(sCopy.includes(gCopy[i]) && gCopy[i] !== sCopy[i]){
//             match++;
//             let index = sCopy.indexOf(gCopy[i]);
//             sCopy.splice(index, 1);
//         }
//     }
//     return match;
// }

// function notMatch(whiteSquares, blackSquares) {
//     return 4 - (whiteSquares + blackSquares);
// }