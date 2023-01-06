// Singleplayer_Hangman.html Page - Choose Gamemode
// Set up for hangman game start canvas
const c = document.getElementById("startCanvas");
const ctx = c.getContext("2d");
// Canvas width and height set in CSS file
// Set actual size in memory and scaled to amount for extra pixel density (remove blurriness)
const dpi = window.devicePixelRatio;
c.width = c.offsetWidth * dpi;
c.height = c.offsetHeight * dpi;
//Normalize coordinate system to use CSS pixels
ctx.scale(dpi,dpi);

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

// // Draw Start Canvas
// function startCanvas() {
//     canvasGBG(c, ctx);
//     startBtn();
// }

// // Call startCanvas function to load canvas when window has loaded
// window.onload = startCanvas;

// // Event listener to tell if canvas start button is being moused over
// c.addEventListener('mousemove', (e) => {
//     const mousePos = {
//       x: e.clientX - c.offsetLeft,
//       y: e.clientY - c.offsetTop
//     };
//     // if mouse is over canvas start button
//     if ((mousePos.x > (x-startBtnWidth/2)) && 
//         (mousePos.x < (x+startBtnWidth/2)) && 
//         (mousePos.y > (y-startBtnHeight/2)) && 
//         (mousePos.y < (y+startBtnHeight/2))) 
//     {
//         c.style.cursor = "pointer";
//     }
//     // if mouse leaves canvas start button 
//     else{
//         c.style.cursor = "default";
//     }
// });

// // Event listener to tell if canvas start button is clicked
// c.addEventListener('click', (e) => {
//     const mousePos = {
//       x: e.clientX - c.offsetLeft,
//       y: e.clientY - c.offsetTop
//     };
//     if (mousePos.x > (x-(startBtnWidth/2)) && mousePos.x < (x+(startBtnWidth/2))) {
//         if (mousePos.y > (y-(startBtnHeight/2)) && mousePos.y < (y+(startBtnHeight/2))) {
//             c.classList.toggle('conceal');
//             sc.classList.toggle('conceal');
//         }
//     }
// });



// Set up for hangman game singleplayer canvas
const sc = document.getElementById("singleplayerCanvas");
const sctx = sc.getContext("2d");
// Canvas width and height set in CSS file
// Set actual size in memory and scaled to amount for extra pixel density (remove blurriness)
//const dpi = window.devicePixelRatio;
sc.width = sc.offsetWidth * dpi;
sc.height = sc.offsetHeight * dpi;
//Normalize coordinate system to use CSS pixels
sctx.scale(dpi,dpi);

const sx = sc.width / 2
const sy = sc.height / 2

const hs = document.getElementById("hangmanSetup");
const hsWidth = 400;
const hsHeight = 400;
// hs.addEventListener("load", (e) => {
//     sctx.drawImage(hs, 0, 0, hsWidth, hsHeight);
// });
const blender = document.getElementById("blender");
const bWidth = 400;
const bHeight = 400;
// blender.addEventListener("load", (e) => {
//     sctx.drawImage(blender, sx, 0, bWidth, bHeight);
// });
// // Incorrect Guess Hangman Display
// const hm1 = document.getElementById("hangman1");
// const hm1Width = 400;
// const hm1Height = 400;
// hm1.addEventListener("load", (e) => {
//     sctx.drawImage(hm1, 0, 0, hm1Width, hm1Height);
// });
// const hm2 = document.getElementById("hangman2");
// const hm2Width = 400;
// const hm2Height = 400;
// hm2.addEventListener("load", (e) => {
//     sctx.drawImage(hm2, 0, 0, hm2Width, hm2Height);
// });
// const hm3 = document.getElementById("hangman3");
// const hm3Width = 400;
// const hm3Height = 400;
// hm3.addEventListener("load", (e) => {
//     sctx.drawImage(hm3, 0, 0, hm3Width, hm3Height);
// });
// const hm4 = document.getElementById("hangman4");
// const hm4Width = 400;
// const hm4Height = 400;
// hm4.addEventListener("load", (e) => {
//     sctx.drawImage(hm4, 0, 0, hm4Width, hm4Height);
// });
// const hm5 = document.getElementById("hangman5");
// const hm5Width = 400;
// const hm5Height = 400;
// hm5.addEventListener("load", (e) => {
//     sctx.drawImage(hm5, 0, 0, hm5Width, hm5Height);
// });
// const hm6 = document.getElementById("hangman6");
// const hm6Width = 400;
// const hm6Height = 400;
// hm6.addEventListener("load", (e) => {
//     sctx.drawImage(hm6, 0, 0, hm6Width, hm6Height);
// });
// // Guessed Words Display
// sctx.font = "40px monospace";
// sctx.fillStyle = "black";
// sctx.fillText("A B C", sx*1.42, sy*.7);
// sctx.fillText("A B C", sx*1.42, sy*.85);

function singleplayer() {
    hs.addEventListener("load", (e) => {
        sctx.drawImage(hs, 0, 0, hsWidth, hsHeight);
    });
    blender.addEventListener("load", (e) => {
        sctx.drawImage(blender, sx, 0, bWidth, bHeight);
    });
    console.log(1);
}
singleplayer();

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



// // Generate hangman game start page
// // Start page background
// const hangman_gradient = ctx.createLinearGradient(0, 0, 0, c.height);
// hangman_gradient.addColorStop(0, "#084A59");
// hangman_gradient.addColorStop(.5, "#156A7D");
// hangman_gradient.addColorStop(1, "#187D94");
// ctx.fillStyle = hangman_gradient;
// ctx.fillRect(0, 0, c.width, c.height);


// // Start page text
// ctx.font = "60px Sans-Serif";
// ctx.fillStyle = "white";
// ctx.fillText("Hangman Game", x, y*2/3);
// // Start page button
// ctx.fillStyle = "black";
// ctx.fillRect(x-50, y+20, 100, 60);
// ctx.font = "30px Sans-Serif";
// ctx.fillStyle = "white";
// ctx.fillText("start", x, y+60);



// // Circle gradient
// const sky_gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 300);
// sky_gradient.addColorStop(0, "#9E99BF");
// sky_gradient.addColorStop(1, "#F2D5DB");
// ctx.fillStyle = sky_gradient;
// ctx.fillRect(0, 0, c.width, c.height);




// // Gradient background for start canvas
// const sky_gradient = ctx.createLinearGradient(0, 0, 0, c.height);
// sky_gradient.addColorStop(0, "#9E99BF");
// sky_gradient.addColorStop(.8, "#F2D5DB");
// sky_gradient.addColorStop(1, "#82AE81");
// ctx.fillStyle = sky_gradient;
// ctx.fillRect(0, 0, c.width, c.height);




// sctx.fillStyle = "#472F14";
// const gWidth = 200;
// const gHeight = 250;
// const gDepth = 15;
// const sWidth = gWidth*1.5;
// const sDepth = gDepth*2;
// sctx.fillRect(sx-(gWidth/1.8), sy-(slHeight/2)-gDepth, gWidth, gDepth);
// sctx.fillRect(sx-(gWidth/2), sy-(slHeight/2)-gDepth, gDepth, gHeight);
// sctx.fillRect(sx-(gWidth/2)*1.5, sy-(slHeight/2)-gDepth+gHeight, sWidth, sDepth);



