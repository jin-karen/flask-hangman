// Singleplayer_.html Page - Choose Gamemode
// Set up for hangman game start canvas
const c = document.getElementById("singleplayerCanvas");
const ctx = c.getContext("2d");
// Set actual size in memory and scaled to amount for extra pixel density (remove blurriness)
const dpi = window.devicePixelRatio;
// Canvas width and height set in CSS file
c.width = c.offsetWidth * dpi;
c.height = c.offsetHeight * dpi;
//Normalize coordinate system to use CSS pixels
ctx.scale(dpi,dpi);

const x = c.width / 2
const y = c.height / 2



// Draw Hangman Setup Image onto Canvas
ctx.fillStyle = "#F4F4F4";
ctx.fillRect(0, 0, c.width, c.height);
const hangman_gradient = ctx.createLinearGradient(0, 0, 0, c.height);
hangman_gradient.addColorStop(0, "#F3EDE0");
hangman_gradient.addColorStop(.3, "#F3EDE0");
//hangman_gradient.addColorStop(.5, "");
//hangman_gradient.addColorStop(.7, "#418AB8#BFE5EF#82AE81#82AE81");
hangman_gradient.addColorStop(1, "#84B8D9");
ctx.fillStyle = hangman_gradient;
ctx.fillRect(0, 0, c.width, c.height);
const hs = document.getElementById("hangmanSetup");
const hsWidth = 400;
const hsHeight = 400;
hs.addEventListener("load", (e) => {
    ctx.drawImage(hs, 0, 0, hsWidth, hsHeight);
});
const blender = document.getElementById("blender");
const bWidth = 400;
const bHeight = 400;
blender.addEventListener("load", (e) => {
    ctx.drawImage(blender, x, 0, bWidth, bHeight);
});
// Incorrect Guess Hangman Display
const hm1 = document.getElementById("hangman1");
const hm1Width = 400;
const hm1Height = 400;
hm1.addEventListener("load", (e) => {
    ctx.drawImage(hm1, 0, 0, hm1Width, hm1Height);
});
const hm2 = document.getElementById("hangman2");
const hm2Width = 400;
const hm2Height = 400;
hm2.addEventListener("load", (e) => {
    ctx.drawImage(hm2, 0, 0, hm2Width, hm2Height);
});
const hm3 = document.getElementById("hangman3");
const hm3Width = 400;
const hm3Height = 400;
hm3.addEventListener("load", (e) => {
    ctx.drawImage(hm3, 0, 0, hm3Width, hm3Height);
});
const hm4 = document.getElementById("hangman4");
const hm4Width = 400;
const hm4Height = 400;
hm4.addEventListener("load", (e) => {
    ctx.drawImage(hm4, 0, 0, hm4Width, hm4Height);
});
const hm5 = document.getElementById("hangman5");
const hm5Width = 400;
const hm5Height = 400;
hm5.addEventListener("load", (e) => {
    ctx.drawImage(hm5, 0, 0, hm5Width, hm5Height);
});
const hm6 = document.getElementById("hangman6");
const hm6Width = 400;
const hm6Height = 400;
hm6.addEventListener("load", (e) => {
    ctx.drawImage(hm6, 0, 0, hm6Width, hm6Height);
});
// Guessed Words Display
ctx.font = "40px monospace";
ctx.fillStyle = "black";
ctx.fillText("A B C", x*1.42, y*.7);
ctx.fillText("A B C", x*1.42, y*.85);



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



