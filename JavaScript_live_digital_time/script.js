let time = document.querySelector('.Clock');
setInterval(() => {
    let date = new Date();
    time.innerHTML = date.toLocaleTimeString();
}, 1000)