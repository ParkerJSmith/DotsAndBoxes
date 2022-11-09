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
    console.log("X: " + mouseX + " Y: " + mouseY);
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
}

function resizeCanvas() {
    document.getElementById("canvas").width = Math.min(window.innerWidth, window.innerHeight - window.innerHeight * 0.2);
    document.getElementById("canvas").height = Math.min(window.innerWidth, window.innerHeight - window.innerHeight * 0.2);
    ctx.imageSmoothingEnabled = false;
}