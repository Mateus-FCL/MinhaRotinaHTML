let secretCode = generateSecretCode();
let attempts = [];

function generateSecretCode() {
    let digits = [];
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

function makeGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value;

    if (guess.length !== 4 || !/^\d+$/.test(guess)) {
        alert("Por favor, insira um palpite válido de quatro dígitos.");
        return;
    }

    const result = checkGuess(guess, secretCode);
    attempts.unshift({ guess, result }); 

    updateAttemptsList();
    guessInput.value = ""; 

    if (result.bulls === 4) {
        alert("Parabéns! Você adivinhou a combinação secreta!");
    }
}

function checkGuess(guess, secret) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }

    return { bulls, cows };
}

function updateAttemptsList() {
    const attemptsList = document.getElementById("attempts-list");
    attemptsList.innerHTML = "";

    attempts.forEach(attempt => {
        const listItem = document.createElement("li");
        listItem.textContent = `Palpite: ${attempt.guess} - Bulls: ${attempt.result.bulls}, Cows: ${attempt.result.cows}`;
        attemptsList.appendChild(listItem);
    });
}

function revealSecret() {
    alert(`A combinação secreta é: ${secretCode}`);
}
