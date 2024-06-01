const form = document.querySelector('form');
console.log(form);
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let height = document.querySelector('#height').value //to get the value of height input by user
    let weight = document.querySelector('#weight').value //to get the value of weight input by user
    console.log(height, weight);
    let result = ((weight)/((height * height)/10000)).toPrecision(4);
    document.querySelector('.result').innerHTML = "<h2>Result</h2>"
    const node = document.createTextNode(`Your BMI is ${result}`);
    document.querySelector('.result').appendChild(node);
})