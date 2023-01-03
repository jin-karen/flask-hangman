// Set up for hangman game start canvas
const c = document.getElementById("startCanvas");
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

// Draw image onto start canvas
const startLogo = document.getElementById("startLogo");
const slWidth = 400;
const slHeight = 400;
startLogo.addEventListener("load", (e) => {
    ctx.drawImage(startLogo, 0, 0, slWidth, slHeight);
});



// Set up for Singleplayer hangman game canvas
const sc = document.getElementById("singleplayerCanvas");
const sctx = sc.getContext("2d");
// Canvas width and height set in CSS file (remove blurriness)
c.width = c.offsetWidth * dpi;
c.height = c.offsetHeight * dpi;
//Normalize coordinate system to use CSS pixels
ctx.scale(dpi,dpi);

// Center text in singplayer game canvas
const sx = sc.width / 2
const sy = sc.height / 2
// ctx.textAlign = 'center';

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



