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


let secret = [9, 1, 5, 2];
let guess = [1, 1, 1, 1]
let matches = match(secret, guess);
console.log(`white: ${matches[0]}`);
console.log(`black: ${matches[1]}`);
console.log(`empty: ${matches[2]}`);