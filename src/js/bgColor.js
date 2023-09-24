function saveBgColor(hexColor) {
    localStorage.setItem('bgColor', hexColor);
}

function changeColor(color) {
    document.body.style.backgroundColor = color;
    saveBgColor(color)
}

function toggleColorPick() {
    let colorPick = document.getElementById('colorPick');
    colorPick.style.display = (colorPick.style.display === "none") ? "block" : "none";
}
