let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let reset = document.querySelector('#reset');
let buttons = document.querySelector('.buttons')
console.log(start, stop);
function randomNum(){
    let num = Math.floor(Math.random() * 255) + 1;
    return num;
}
let c = 0;
let startProcess;
start.addEventListener('click', (e) => {
    
    startProcess = setInterval(() => {
        let n1 = randomNum();
        let n2 = randomNum();
        let n3 = randomNum();
        let body = document.querySelector('body');
        body.style.backgroundColor = `rgb(${n1}, ${n2}, ${n3})`;
    }, 1000);
    c = 1;
})
stop.addEventListener('click', (e) => {
    if(c == 1){
        console.log('went in');
        clearInterval(startProcess);
        c = 0;
    }
})
reset.addEventListener('click', (e) => { 
    let body = document.querySelector('body');
    body.style.backgroundColor = 'white';
})