window.addEventListener("resize", resizeCanvas);
let heightSlider = document.getElementById("heightSlider");

let gridHeight = 9;
let gridWidth = 9;

heightSlider.oninput = function() {
    gridHeight = this.value;
}

let widthSlider = document.getElementById("widthSlider");

widthSlider.oninput = function() {
    gridWidth = this.value;
}

let ctx = document.getElementById("canvas").getContext("2d");
resizeCanvas();

let mouseX = 0;
let mouseY = 0;

let hoverX = -1;
let hoverY = -1;
let orientation = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

window.requestAnimationFrame(gameLoop);

function gameLoop() {
    tick();
    render();
    window.requestAnimationFrame(gameLoop);
}

function tick() {
    let canvasSize = document.getElementById("canvas").height;
    let canvasXOffset = document.getElementById("canvas").getBoundingClientRect().left;
    let canvasYOffset = document.getElementById("canvas").getBoundingClientRect().top;
    hoverX = -1;
    hoverY = -1;
    orientation = 0;
    for (let i = 0; i < gridWidth - 1; i++) {
        let yRange = (mouseY - canvasYOffset + (canvasSize / gridHeight) * i + ((canvasSize / gridHeight - 10) / 2)) / (canvasYOffset + (canvasSize / gridHeight) * (i + 1) + ((canvasSize / gridHeight - 10) / 2));
        console.log(yRange);
        if (mouseX > canvasXOffset + (canvasSize / gridWidth) * i + ((canvasSize / gridWidth - 10) / 2) && mouseX < canvasXOffset + (canvasSize / gridWidth) * (i + 1) + ((canvasSize / gridWidth - 10) / 2)) {
            hoverX = i;
        }
    }
    for (let i = 0; i < gridHeight - 1; i++) {
        if (mouseY > canvasYOffset + (canvasSize / gridHeight) * i + ((canvasSize / gridHeight - 10) / 2) && mouseY < canvasYOffset + (canvasSize / gridHeight) * (i + 1) + ((canvasSize / gridHeight - 10) / 2)) {
            hoverY = i;
        }
    }
    console.log("X: " + hoverX + " Y: " + hoverY);
}

function render() {
    let canvasSize = document.getElementById("canvas").height;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            ctx.fillRect((canvasSize / gridWidth) * i + ((canvasSize / gridWidth - 10) / 2), (canvasSize / gridHeight) * j + ((canvasSize / gridHeight - 10) / 2), 10, 10);
        }
    }
    if (hoverX != -1 && hoverY != -1 && orientation == 0) {
        ctx.fillRect((canvasSize / gridWidth) * hoverX + ((canvasSize / gridWidth - 10) / 2) + 5, (canvasSize / gridHeight) * hoverY + ((canvasSize / gridHeight - 10) / 2) + 2, canvasSize / gridWidth, 6);
    }
    if (hoverX != -1 && hoverY != -1 && orientation == 1) {
        ctx.fillRect((canvasSize / gridWidth) * hoverX + ((canvasSize / gridWidth - 10) / 2) + 2, (canvasSize / gridHeight) * hoverY + ((canvasSize / gridHeight - 10) / 2) + 5, 6, canvasSize / gridWidth);
    }
}

function resizeCanvas() {
    document.getElementById("canvas").width = Math.min(window.innerWidth, window.innerHeight - window.innerHeight * 0.2);
    document.getElementById("canvas").height = Math.min(window.innerWidth, window.innerHeight - window.innerHeight * 0.2);
    ctx.imageSmoothingEnabled = false;
}
