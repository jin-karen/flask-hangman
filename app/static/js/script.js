// Set up for hangman game canvas
const c = document.getElementById("hangmanCanvas");
const ctx = c.getContext("2d");

// Canvas width and height set in CSS file
// Set actual size in memory and scaled to amount for extra pixel density (remove blurriness)
const dpi = window.devicePixelRatio;
c.width = c.offsetWidth * dpi;
c.height = c.offsetHeight * dpi;
//Normalize coordinate system to use CSS pixels
ctx.scale(dpi,dpi);

// Center text in canvas
const x = c.width / 2
const y = c.height / 2
ctx.textAlign = 'center';

// Generate hangman game start page
// Start page background
const hangman_gradient = ctx.createLinearGradient(0, 0, 0, c.height);
hangman_gradient.addColorStop(0, "#084A59");
hangman_gradient.addColorStop(.5, "#156A7D");
hangman_gradient.addColorStop(1, "#187D94");
ctx.fillStyle = hangman_gradient;
ctx.fillRect(0, 0, c.width, c.height);
// Start page text
ctx.font = "60px Sans-Serif";
ctx.fillStyle = "white";
ctx.fillText("Hangman Game", x, y*2/3);