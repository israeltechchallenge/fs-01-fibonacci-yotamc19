const input = document.getElementById(`xNum`);
const result = document.getElementById(`yNum`);
const isBtn = document.querySelector(`.btn`);
const arr = [1, 1];

const getFibonacciNum = (x) => {
    if (x <= arr.length)
        return arr[x - 1];
    arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
    return getFibonacciNum(x);
}

const btnClicked = () => {
    const x = input.value;
    if (x == null || x < 1) {
        result.innerText = ``;
        return;
    }
    result.innerText = getFibonacciNum(x);
}

isBtn.addEventListener(`click`, btnClicked);