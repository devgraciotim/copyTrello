let color = localStorage.getItem('bgColor');
document.body.style.backgroundColor = color;


document.addEventListener('click', function (event) {
    const colorPick = document.getElementById('colorPick');
    event.target !== colorPick && event.target !== document.querySelector('button') ? colorPick.style.display = 'none' : false
});