const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    }
}

function mouseMove(e) {
    const mousePos = getMousePos(e);
    const color = localStorage.getItem("color") || "black";
    const radius = localStorage.getItem("radius") || "10";
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = radius;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
}

function selectColor() {
    const btnColor = document.querySelectorAll(".color");

    btnColor.forEach(color => {
        color.addEventListener("click", (e) => {
            localStorage.setItem("color", e.target.id);
        })
    });
}
selectColor();

function selectStroke() {
    const radius = document.querySelectorAll(".radius");

    radius.forEach(radiusWidth => {
        radiusWidth.addEventListener("click", (e) => {
            let radiusWidthChoice = "10";
            switch (e.target.id) {
                case "radius1":
                    radiusWidthChoice = "5";
                    break;
                case "radius2":
                    radiusWidthChoice = "10";
                    break;
                case "radius3":
                    radiusWidthChoice = "20";
                    break;
                default:
                    radiusWidthChoice = "10";
                    break;
            }
            localStorage.setItem("radius", radiusWidthChoice);
        })
    });
}
selectStroke();

canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const mousePos = getMousePos(e);
    const color = localStorage.getItem("color") || "black";
    const radius = localStorage.getItem("radius") || "10";
    ctx.strokeStyle = color;
    ctx.lineWidth = radius;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.moveTo(mousePos.x, mousePos.y);
    ctx.stroke();

    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", () => {
        canvas.removeEventListener("mousemove", mouseMove);
        
    })
});

canvas.addEventListener("mousemove", (e) => {
    const mousePos = getMousePos(e);
    if (mousePos.x <= 0.5 || mousePos.x >= canvas.width - 1 || mousePos.y <= 0.5 || mousePos.y >= canvas.height - 1){
        canvas.removeEventListener("mousemove", mouseMove);
    }
});

reset.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
