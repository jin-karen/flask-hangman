// Singleplayer_Hangman.html Page - Choose Gamemode
// Set up for hangman game singleplayer canvas
const c = document.getElementById("singleplayerCanvas");
const ctx = c.getContext("2d");
// Canvas width and height set in CSS file
// Set actual size in memory and scaled to amount for extra pixel density (remove blurriness)
const dpi = window.devicePixelRatio;
c.width = c.offsetWidth * dpi;
c.height = c.offsetHeight * dpi;
//Normalize coordinate system to use CSS pixels
ctx.scale(dpi,dpi);

// Vertical and Horizontal Canvas Center
const x = c.width / 2
const y = c.height / 2

// Start button 
const startBtnWidth = 200;
const startBtnHeight = 100;
const startBtnRadii = 10;

// Create Gradient Canvas Background 
function canvasGBG(canvas, context) {
    const gradientBG = context.createLinearGradient(0, 0, 0, canvas.height);
    gradientBG.addColorStop(0, "#F3EDE0");
    gradientBG.addColorStop(.3, "#F3EDE0");
    gradientBG.addColorStop(1, "#84B8D9");
    context.fillStyle = gradientBG;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Create Canvas Start Button 
function startBtn(context) {
    context.fillStyle = "#084A59";
    context.strokeStyle = "#F3EDE0";
    context.lineWidth = 6;
    context.beginPath()
    context.roundRect(x-(startBtnWidth/2), y-(startBtnHeight/2), startBtnWidth, startBtnHeight, startBtnRadii);
    context.fill();
    context.stroke();
    context.font = "30px monospace";
    context.fillStyle = "#F3EDE0";
    context.fillText("Start Game", x-(startBtnWidth/2)+20, y+10);
}

// Draw Start Canvas
function startCanvas() {
    canvasGBG(c, ctx);
    startBtn(ctx);
}

// Call startCanvas function to load canvas when window has loaded
window.onload = startCanvas;

// Function for event listener to change cursor into pointer when hovering over start button 
function startPointer(e) {
    const mousePos = {
        x: e.clientX - c.offsetLeft,
        y: e.clientY - c.offsetTop
    };
    // if mouse is over canvas start button
    if ((mousePos.x > (x-startBtnWidth/2)) && 
        (mousePos.x < (x+startBtnWidth/2)) && 
        (mousePos.y > (y-startBtnHeight/2)) && 
        (mousePos.y < (y+startBtnHeight/2))) 
    {
        c.style.cursor = "pointer";
    }
    // if mouse leaves canvas start button 
    else{
        c.style.cursor = "default";
    }
}

// Event listener to tell if canvas start button is being moused over
c.addEventListener('mousemove', startPointer);

// Event listener to tell if canvas start button is clicked
c.addEventListener('click', (e) => {
    const mousePos = {
      x: e.clientX - c.offsetLeft,
      y: e.clientY - c.offsetTop
    };
    if (mousePos.x > (x-(startBtnWidth/2)) && mousePos.x < (x+(startBtnWidth/2))) {
        if (mousePos.y > (y-(startBtnHeight/2)) && mousePos.y < (y+(startBtnHeight/2))) {
            c.removeEventListener('mousemove', startPointer);
            c.style.cursor = "default";
            canvasGBG(c, ctx);
            singleplayerSetup();
        }
    }
{once : true}});

// Hangman image setup: width, height, x, y
const hsWidth = 350;
const hsHeight = 350;
const hsX = x-hsWidth+60;
const hsY = 20;

// Setup for hangman gameplay: word display, guess form, result, end buttons, guesses
const display = document.getElementById("display");
const displayArray = display.textContent.split(" ");
const guess = document.getElementById("guess");
const guessBtn = document.getElementById("guessBtn");
const guessText = document.getElementById("guessText");
const guessWarning = document.getElementById("guessWarning");
const guessForm = document.getElementById("guessForm");
const result = document.getElementById("result");
const endBtns = document.getElementById("endBtns");
let currentGuess;
let guessedWords = []; // all letter guesses
let layer1Guess = []; // first three incorrect guesses
let layer2Guess = []; // last three incorrect guesses


// Singleplayer hangman game setup after clicking start
function singleplayerSetup() {
    const hs = document.getElementById("hangmanSetup");
    ctx.drawImage(hs, hsX, hsY, hsWidth, hsHeight);
    const blender = document.getElementById("blender");
    ctx.drawImage(blender, x, hsY, hsWidth, hsHeight);
    ctx.font = "40px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(display.textContent, x, y+130);
    guess.classList.toggle('conceal');
    
}

// Event Listener to receive user inputted letter guesses from enter btn
guessBtn.addEventListener('click', getInputValue);

// Event Listener to receive user inputted letter guesses from pressing enter
guessForm.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        getInputValue();
    }
});

// Receives user inputted value and ensures its an alphabetical letter not yet guessed
// Calls checkInput function if a valid new letter
function getInputValue() {
    currentGuess = guessText.value;
    guessText.value = "";
    guessWarning.textContent = "";
    if (guessedWords.includes(currentGuess)) {
        guessWarning.textContent = "You guessed this letter already!";
    } else if (currentGuess.toLowerCase() == currentGuess.toUpperCase()) {
        guessWarning.textContent = "Please enter a valid alphabetical letter!";
    } else {
        guessedWords.push(currentGuess);
        checkInput();
    }
}

// Checks to see if user inputted letter is in the word
// Either displays letters within word or calls incorrectGuess function
// Calls winGame function with true argument if all letters are correctly guessed
function checkInput() {
    const word = document.getElementById("word");
    let minOne = false;
    for (let i = 0; i < word.textContent.length; i++) {
        if (word.textContent[i] == currentGuess) {
            displayArray[i] = currentGuess;
            minOne = true;
        } 
    }
    if (!minOne) {
        incorrectGuess();
    } else {
        display.textContent = displayArray.join(" ");
        ctx.font = "40px monospace";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(display.textContent, x, y+130);
        if (!displayArray.includes("_")) {
            winGame(true);
        }
    }
};

// Updates hangman and letter display if guess is not in the word
// Calls winGame function with false argument when 6 letters are incorrectly guessed
function incorrectGuess() {
    // Incorrect hangman display
    switch (true) {
        case (layer1Guess.length == 0):
            layer1Guess.push(currentGuess);
            const hm1 = document.getElementById("hangman1");     
            ctx.drawImage(hm1, hsX, hsY, hsWidth, hsHeight);
            break;
        case (layer1Guess.length == 1):
            layer1Guess.push(currentGuess);
            const hm2 = document.getElementById("hangman2");
            ctx.drawImage(hm2, hsX, hsY, hsWidth, hsHeight);
            break;
        case (layer1Guess.length == 2):
            layer1Guess.push(currentGuess);
            const hm3 = document.getElementById("hangman3");
            ctx.drawImage(hm3, hsX, hsY, hsWidth, hsHeight);
            break;
        case (layer1Guess.length == 3 && layer2Guess.length == 0):
            layer2Guess.push(currentGuess);
            const hm4 = document.getElementById("hangman4");
            ctx.drawImage(hm4, hsX, hsY, hsWidth, hsHeight);
            break;
        case (layer1Guess.length == 3 && layer2Guess.length == 1):
            layer2Guess.push(currentGuess);
            const hm5 = document.getElementById("hangman5");
            ctx.drawImage(hm5, hsX, hsY, hsWidth, hsHeight);
            break;
        case (layer1Guess.length == 3 && layer2Guess.length == 2):
            layer2Guess.push(currentGuess);
            const hm6 = document.getElementById("hangman6");
            ctx.drawImage(hm6, hsX, hsY, hsWidth, hsHeight);
            winGame(false);
            break;
        default:
            console.log("Error");
            break;
    }
    // Incorrect Guessed Words Display
    ctx.font = "37px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(layer1Guess.join(" "), x*1.26, y*.69);
    ctx.fillText(layer2Guess.join(" "), x*1.26, y*.80);
}

// Function to reveal win or loss result
// Calls postGame function to send game information to database
function winGame(outcome) {
    guess.classList.toggle('conceal');
    result.classList.toggle('conceal');
    endBtns.classList.toggle('conceal');
    if (outcome == true) {
        result.textContent = "CONGRATULATIONS YOU WIN!";
    } else if (outcome == false) {
        result.textContent = "YOU LOSE! THE WORD WAS: " + word.textContent.toUpperCase() + "!";
    }
    let game = {
        word: word.textContent,
        opponent: "computer",
        game_won: outcome,
        incorrect_guesses: layer1Guess.length + layer2Guess.length,
    };
    postGame('http://localhost:5000/post_results', game)
        .then((verdict) => {
            console.log(verdict);
        });
}

// API Post Request to post game information and results to database
async function postGame(url='', data={}) {
    const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
    });
    let verdict = await response.json();
    return verdict;
}

  