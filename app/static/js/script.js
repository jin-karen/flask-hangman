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
function startBtn() {
    ctx.fillStyle = "#084A59";
    ctx.strokeStyle = "#F3EDE0";
    ctx.lineWidth = 6;
    ctx.beginPath()
    ctx.roundRect(x-(startBtnWidth/2), y-(startBtnHeight/2), startBtnWidth, startBtnHeight, startBtnRadii);
    ctx.fill();
    ctx.stroke();
    ctx.font = "30px monospace";
    ctx.fillStyle = "#F3EDE0";
    ctx.fillText("Start Game", x-(startBtnWidth/2)+20, y+10);
}

// Draw Start Canvas
function startCanvas() {
    canvasGBG(c, ctx);
    startBtn();
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
            // c.classList.toggle('conceal');
            // sc.classList.toggle('conceal');
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

// Guess form for hangman game
const guessBtn = document.getElementById("guessBtn");
const guessText = document.getElementById("guessText");
const guessWarning = document.getElementById("guessWarning");
let currentGuess;
let layer1Guess = [];
let layer2Guess = [];

// Singleplayer hangman game setup after clicking start
function singleplayerSetup() {
    const hs = document.getElementById("hangmanSetup");
    ctx.drawImage(hs, hsX, hsY, hsWidth, hsHeight);
    const blender = document.getElementById("blender");
    ctx.drawImage(blender, x, hsY, hsWidth, hsHeight);
    const display = document.getElementById("display");
    console.log(display.textContent);
    ctx.font = "40px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(display.textContent, x, y+130);
    const guess = document.getElementById("guess");
    guess.classList.toggle('conceal');
    
}


// Event Listener to receive user inputted letter guesses
guessBtn.addEventListener('click', getInputValue);

function getInputValue() {
    currentGuess = (guessText.value).toUpperCase();
    guessText.value = "";
    guessWarning.textContent = "";
    console.log(currentGuess);
    if (layer1Guess.includes(currentGuess) || layer2Guess.includes(currentGuess)) {
        guessWarning.textContent = "You guessed this letter already!";
    } else if (currentGuess.toLowerCase() == currentGuess.toUpperCase()) {
        guessWarning.textContent = "Please enter a valid alphabetical letter!";
    } else if (layer1Guess.length<3) {
        layer1Guess.push(currentGuess);
    } else if (layer1Guess.length==3 && layer2Guess.length<3) {
        layer2Guess.push(currentGuess);
    } else {
        console.log("DEAD");
    }
    console.log(layer1Guess);
    console.log(layer2Guess);
    // Guessed Words Display
    ctx.font = "37px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(layer1Guess.join(" "), x*1.26, y*.69);
    ctx.fillText(layer2Guess.join(" "), x*1.26, y*.80);
}



// // Incorrect Guess Hangman Display
// const hm1 = document.getElementById("hangman1");
// ctx.drawImage(hm1, hsX, hsY, hsWidth, hsHeight);

// const hm2 = document.getElementById("hangman2");
// ctx.drawImage(hm2, hsX, hsY, hsWidth, hsHeight);

// const hm3 = document.getElementById("hangman3");
// ctx.drawImage(hm3, hsX, hsY, hsWidth, hsHeight);

// const hm4 = document.getElementById("hangman4");
// ctx.drawImage(hm4, hsX, hsY, hsWidth, hsHeight);

// const hm5 = document.getElementById("hangman5");
// ctx.drawImage(hm5, hsX, hsY, hsWidth, hsHeight);

// const hm6 = document.getElementById("hangman6");
// ctx.drawImage(hm6, hsX, hsY, hsWidth, hsHeight);




// // two_player_hangman.html Page
// // Set up for Two Player hangman game canvas
// const sc = document.getElementById("twoPlayerCanvas");
// const sctx = sc.getContext("2d");
// // Canvas width and height set in CSS file (remove blurriness)
// c.width = c.offsetWidth * dpi;
// c.height = c.offsetHeight * dpi;
// //Normalize coordinate system to use CSS pixels
// ctx.scale(dpi,dpi);
// // Center text in singplayer game canvas
// const sx = sc.width / 2
// const sy = sc.height / 2
// // ctx.textAlign = 'center';


// // Circle gradient
// const sky_gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 300);
// sky_gradient.addColorStop(0, "#9E99BF");
// sky_gradient.addColorStop(1, "#F2D5DB");
// ctx.fillStyle = sky_gradient;
// ctx.fillRect(0, 0, c.width, c.height);




