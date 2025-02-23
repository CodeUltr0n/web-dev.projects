let gameseq = [];
let userseq = [];
let highestScore = 0; // Track the highest score
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = []; // Reset user sequence for the new level
    level++;
    h2.innerText = `Level ${level}`;

    // Choose a random button
    let randomidx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randomidx];
    let randbtn = document.querySelector(`.${randcolor}`);

    gameseq.push(randcolor); // Add new color to the game sequence
    console.log("Game sequence:", gameseq);

    gameflash(randbtn); // Flash the new button
}

function checkans() {
    let idx = userseq.length - 1; // Current step in the sequence

    if (userseq[idx] === gameseq[idx]) {
        // Correct input
        if (userseq.length === gameseq.length) {
            // User completed the sequence
            if (level > highestScore) {
                highestScore = level; // Update the highest score
            }
            setTimeout(levelup, 1000); // Level up after a delay
        }
    } else {
        // Wrong input
        h2.innerHTML = `"Game Over! Your score was <b> ${level} </b><br> Highest Score: <b>${highestScore}</b> <br> Press any key to start..."`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function (params) {
            document.querySelector("body").style.backgroundColor ="white";
        },150);
        resetGame(); // Reset the game
    }
}

function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor); // Add user's input to the sequence

    checkans(); // Check if the input is correct
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}