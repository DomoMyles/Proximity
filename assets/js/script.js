
var response1 = ["Theatre1", "Theatre2", "Theatre3", "Theatre4"]
var answer1 = ["movie1", "movie2", "movie3", "movie4"]

function addElement() {
    for (let i = 0; i < response1.length; i++) {
        const doc = document.createElement('li');
        doc.innerHTML = response1[i];
        doc.classList.add('results');
        const container = document.querySelector('#list');
        console.log(response1.length);
        container.appendChild(doc);
        doc.setAttribute("onClick", i + "theatre")

    }
    const dac = document.getElementById('ul')
    dac.addEventListener('click', function handleClick(event) {
        console.log('element clicked 🎉🎉🎉', event);
    });
    function after_forloop() {
        function addResponse() { console.log("pp") }
    }
}


function addResponse() {
    console.log("yoo")
}
// if (response1.lenght = 1) {
//     for (let e = 0; i < response2.length; e++);
//     const content = document.getElementById("movieTitle")
// }



// //code to be used later
// var newTH = document.createElement('th');
// newTH.innerHTML = 'Hello, World!';
// newTH.onclick = function () {
//     this.parentElement.removeChild(this);
// };

// var table = document.getElementById('content');
// table.appendChild(newTH);

