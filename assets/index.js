const input = document.getElementById(`xNum`);
const result = document.getElementById(`yNum`);
const isBtn = document.querySelector(`.btn`);

const getFibonacciNum = (x) => {
    const arr = [1, 1];
    while (x > arr.length)
        arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
    return arr[x - 1];
}

const  btnClicked = () => {
    const x = input.value;
    if (x == null || x < 1)
        return;
    result.innerText = getFibonacciNum(x);
}

isBtn.addEventListener(`click`, btnClicked);