const input = document.getElementById(`xNum`);
const result = document.getElementById(`yNum`);
const isBtn = document.querySelector(`.btn`);

function btnClicked() {
    const x = input.value;
    fetch(`http://localhost:5050/fibonacci/${x}`)
        .then(Response => Response.json())
        .then(data => {
            result.innerText = data.result;
        })
}

isBtn.addEventListener(`click`, btnClicked);