window.addEventListener("resize", resizeCanvas);
let heightSlider = document.getElementById("heightSlider");

let gridHeight = 9;
let gridWidth = 9;

heightSlider.oninput = function() {
    gridHeight = this.value;
    resetGame();
}

let widthSlider = document.getElementById("widthSlider");

widthSlider.oninput = function() {
    gridWidth = this.value;
    resetGame();
}

document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("player-toggle").addEventListener("click", togglePlayers);

let ctx = document.getElementById("canvas").getContext("2d");
resizeCanvas();

let mouseX = 0;
let mouseY = 0;

let hoverX = -1;
let hoverY = -1;
let orientation = 0;
let numOfPlayers = 3;
let currentPlayer = 1;
let gameOver = false;

let player1Lines = [];
let player2Lines = [];
let player3Lines = [];

let placedLines = [];

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

document.getElementById("canvas").addEventListener("click", placeLine);


window.requestAnimationFrame(gameLoop);

function gameLoop() {
    tick();
    render();
    window.requestAnimationFrame(gameLoop);
}

function tick() {
    if (gameOver) {
        console.log("GAME OVER");
    }
    console.log("Current player: " + currentPlayer);
    let canvasSize = document.getElementById("canvas").height;
    let canvasXOffset = document.getElementById("canvas").getBoundingClientRect().left;
    let canvasYOffset = document.getElementById("canvas").getBoundingClientRect().top;
    hoverX = -1;
    hoverY = -1;
    orientation = 0;

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            if (mouseX > canvasXOffset + (canvasSize / gridWidth) * i + ((canvasSize / gridWidth - 10) / 2) && mouseX < canvasXOffset + (canvasSize / gridWidth) * (i + 1) + ((canvasSize / gridWidth - 10) / 2)) {
                if (mouseY > canvasYOffset + (canvasSize / gridHeight) * j + ((canvasSize / gridHeight - 10) / 2) - 20 && mouseY < canvasYOffset + (canvasSize / gridHeight) * j + ((canvasSize / gridHeight - 10) / 2) + 20) {
                    hoverX = i;
                    hoverY = j;
                }
            }
            if (mouseY > canvasYOffset + (canvasSize / gridHeight) * j + ((canvasSize / gridHeight - 10) / 2) && mouseY < canvasYOffset + (canvasSize / gridHeight) * (j + 1) + ((canvasSize / gridHeight - 10) / 2)) {
                if (mouseX > canvasXOffset + (canvasSize / gridWidth) * i + ((canvasSize / gridWidth - 10) / 2) - 20 && mouseX < canvasXOffset + (canvasSize / gridWidth) * i + ((canvasSize / gridWidth - 10) / 2) + 20) {
                    hoverX = i;
                    hoverY = j;
                    orientation = 1;
                }
            }
        }
    }

    if ((hoverX >= gridWidth - 1 && orientation == 0) || (hoverY >= gridHeight - 1 && orientation == 1)) {
        hoverY = -1;
        hoverX = -1;
        orientation = 0;
    }
    if (hoverX > -1 && hoverY > -1) {
        document.getElementById("canvas").style.cursor = "pointer";
    } else {
        document.getElementById("canvas").style.cursor = "initial";
    }
}

function render() {
    let canvasSize = document.getElementById("canvas").height;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    if (hoverX != -1 && hoverY != -1 && orientation == 0) {
        ctx.fillRect((canvasSize / gridWidth) * hoverX + ((canvasSize / gridWidth - 10) / 2) + 5, (canvasSize / gridHeight) * hoverY + ((canvasSize / gridHeight - 10) / 2) + 2, canvasSize / gridWidth, 6);
    }
    if (hoverX != -1 && hoverY != -1 && orientation == 1) {
        ctx.fillRect((canvasSize / gridWidth) * hoverX + ((canvasSize / gridWidth - 10) / 2) + 2, (canvasSize / gridHeight) * hoverY + ((canvasSize / gridHeight - 10) / 2) + 5, 6, canvasSize / gridHeight);
    }

    ctx.fillStyle = "#FF0000";
    for (let i = 0; i < player1Lines.length; i++) {
        if (player1Lines[i].orient == 0) {
            ctx.fillRect((canvasSize / gridWidth) * player1Lines[i].x + ((canvasSize / gridWidth - 10) / 2) + 5, (canvasSize / gridHeight) * player1Lines[i].y + ((canvasSize / gridHeight - 10) / 2) + 2, canvasSize / gridWidth, 6);
        }
        if (player1Lines[i].orient == 1) {
            ctx.fillRect((canvasSize / gridWidth) * player1Lines[i].x + ((canvasSize / gridWidth - 10) / 2) + 2, (canvasSize / gridHeight) * player1Lines[i].y + ((canvasSize / gridHeight - 10) / 2) + 5, 6, canvasSize / gridHeight);
        }
    }

    ctx.fillStyle = "#0000FF";
    for (let i = 0; i < player2Lines.length; i++) {
        if (player2Lines[i].orient == 0) {
            ctx.fillRect((canvasSize / gridWidth) * player2Lines[i].x + ((canvasSize / gridWidth - 10) / 2) + 5, (canvasSize / gridHeight) * player2Lines[i].y + ((canvasSize / gridHeight - 10) / 2) + 2, canvasSize / gridWidth, 6);
        }
        if (player2Lines[i].orient == 1) {
            ctx.fillRect((canvasSize / gridWidth) * player2Lines[i].x + ((canvasSize / gridWidth - 10) / 2) + 2, (canvasSize / gridHeight) * player2Lines[i].y + ((canvasSize / gridHeight - 10) / 2) + 5, 6, canvasSize / gridHeight);
        }
    }

    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < player3Lines.length; i++) {
        if (player3Lines[i].orient == 0) {
            ctx.fillRect((canvasSize / gridWidth) * player3Lines[i].x + ((canvasSize / gridWidth - 10) / 2) + 5, (canvasSize / gridHeight) * player3Lines[i].y + ((canvasSize / gridHeight - 10) / 2) + 2, canvasSize / gridWidth, 6);
        }
        if (player3Lines[i].orient == 1) {
            ctx.fillRect((canvasSize / gridWidth) * player3Lines[i].x + ((canvasSize / gridWidth - 10) / 2) + 2, (canvasSize / gridHeight) * player3Lines[i].y + ((canvasSize / gridHeight - 10) / 2) + 5, 6, canvasSize / gridHeight);
        }
    }

    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            ctx.fillRect((canvasSize / gridWidth) * i + ((canvasSize / gridWidth - 10) / 2), (canvasSize / gridHeight) * j + ((canvasSize / gridHeight - 10) / 2), 10, 10);
        }
    }
}

function resizeCanvas() {
    document.getElementById("canvas").width = Math.min(window.innerWidth, window.innerHeight - window.innerHeight * 0.2);
    document.getElementById("canvas").height = Math.min(window.innerWidth, window.innerHeight - window.innerHeight * 0.2);
    ctx.imageSmoothingEnabled = false;
}

function resetGame() {
    mouseX = 0;
    mouseY = 0;

    hoverX = -1;
    hoverY = -1;
    orientation = 0;

    player1Lines = [];
    player2Lines = [];
    player3Lines = [];

    placedLines = [];
}

function togglePlayers() {
    if (numOfPlayers == 2) {
        numOfPlayers = 3;
    } else {
        numOfPlayers = 2;
    }
    resetGame();
}

function placeLine() {
    for (let i = 0; i < placedLines.length; i++) {
	if (hoverX == placedLines[i].x && hoverY == placedLines[i].y && orientation == placedLines[i].orient) {
	    return;
	}
    }
    if ((hoverX != -1 && hoverY != -1) && currentPlayer == 1) {
        player1Lines.push({x: hoverX, y: hoverY, orient: orientation});
        currentPlayer++;
        placedLines.push({x: hoverX, y: hoverY, orient: orientation});
    }
    else if ((hoverX != -1 && hoverY != -1) && currentPlayer == 2) {
        player2Lines.push({x: hoverX, y: hoverY, orient: orientation});
        currentPlayer++;
        placedLines.push({x: hoverX, y: hoverY, orient: orientation});
    }
    else if ((hoverX != -1 && hoverY != -1) && currentPlayer == 3) {
        player3Lines.push({x: hoverX, y: hoverY, orient: orientation});
        currentPlayer++;
        placedLines.push({x: hoverX, y: hoverY, orient: orientation});
    }
    if (currentPlayer > numOfPlayers) {
        currentPlayer = 1;
    }

    if (placedLines.length == ((gridWidth - 1) * gridHeight) + ((gridHeight - 1) * gridWidth)) {
        gameOver = true;
    }
}
