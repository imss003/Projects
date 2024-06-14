const boxes = document.querySelectorAll('.colors');
// console.log(box)
boxes.forEach((box) => {
    box.addEventListener('click', (event) => {
        // console.log(event);
        // console.log(event.target);
        if(event.target.id === 'gray'){
            document.body.style.backgroundColor = 'gray';
        }
        if(event.target.id === 'skyblue'){
            document.body.style.backgroundColor = 'skyblue';
        }
        if(event.target.id === 'yellow'){
            document.body.style.backgroundColor = 'yellow';
        }
        if(event.target.id === 'orange'){
            document.body.style.backgroundColor = 'orange';
        }
    })
})