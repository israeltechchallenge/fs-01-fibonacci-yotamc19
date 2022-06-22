const input = document.getElementById(`xNum`);
const result = document.getElementById(`yNum`);
const isBtn = document.querySelector(`.btn`);

const btnClick = () => {
    const x = input.value;
    fetch(`http://localhost:5050/fibonacci/${x}`)
        .then(Response => Response.json())
        .then(data => {
            result.innerText = data.result;
        })
        .catch(err => {
            result.innerText = ``;
        })
}

isBtn.addEventListener(`click`, btnClick);