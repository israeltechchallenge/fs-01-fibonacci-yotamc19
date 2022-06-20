var x = document.getElementById(`xNum`);
var y = document.getElementById(`yNum`);

const getFibonacciNum = (x) => {
    const arr = [1, 1];
    while (x > arr.length)
        arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
    return arr[x - 1];
}

x.innerText = 8;
y.innerText = getFibonacciNum(x.innerText);