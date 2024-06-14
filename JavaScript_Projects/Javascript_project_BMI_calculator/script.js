const form = document.querySelector('form');
console.log(form);
form.addEventListener('submit', (e) =>{ //notice that the event here is submit
    e.preventDefault(); //to prevent the default behaviour of form of submitting info to server, since we dont want the info to go to server rather we want to use it
    let height = document.querySelector('#height').value //to get the value of height input by user
    let weight = document.querySelector('#weight').value //to get the value of weight input by user
    console.log(height, weight);
    let result = ((weight)/((height * height)/10000)).toPrecision(4);
    document.querySelector('.result').innerHTML = "<h2>Result</h2>"
    const node = document.createTextNode(`Your BMI is ${result}`);
    document.querySelector('.result').appendChild(node);
})