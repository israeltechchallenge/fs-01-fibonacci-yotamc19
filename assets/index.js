//grabs all the items
const main = document.querySelector(`.main-container`);
const input = document.getElementById(`xNum`);
const result = document.getElementById(`yNum`);
const inputSection = document.querySelector(`.input-and-alert`);
const isBtn = document.querySelector(`.btn`);
const saveCalc = document.getElementById(`saveCalc`);
const spinner1 = document.createElement(`div`);
const spinner2 = document.createElement(`div`);
spinner1.classList.add(`spinner-border`);
spinner2.classList.add(`spinner-border`);
const resultsHeader = document.querySelector(`.results-header`);
const list = document.createElement(`div`);
const resultsList = document.querySelector(`.results-list`);

//function to get entire list of results on page load
const getFibonacciResults = async () => {
    resultsHeader.append(spinner2);
    const res = await fetch(`http://localhost:5050/getFibonacciResults`);
    const data = await res.json();
    data.results.forEach(item => addRow(item));
    resultsList.append(list);
    resultsHeader.removeChild(spinner2);
}

//function to add a specific row instead of getting the whole list every click on the button
const addRow = (data) => {
    const row = document.createElement(`div`);
    row.classList.add(`result-row`);
    row.innerHTML = `The Fibonacci Of <b>${data.number}</b> is <b>${data.result}</b>. Calculated at: ${new Date(data.createdDate)}`;
    list.append(row);
}

//function that will run on every isBtn click
const handleClick = async () => {
    reset();
    const x = input.value;
    if (x > 50) appendAlert(); //no call for calculation
    else {
        if (saveCalc.checked) serverCalc(x);
        else localCalc(x);
    }
}

//function that runs a server through calc
const serverCalc = async (x) => {
    main.append(spinner1);
    resultsHeader.append(spinner2);
    try {
        res = await fetch(`http://localhost:5050/fibonacci/${x}`);
        if (!res.ok)
            throw new Error(await res.text());
        data = await res.json();
        result.innerText = data.result;
        addRow(data);
    } catch (err) {
        result.innerText = err.message;
        result.classList.add(`red-result`);
    }
    main.removeChild(spinner1);
    resultsHeader.removeChild(spinner2);
}

//function that runs a local calc
const localCalc = (x) => {
    if (x > 50)
        appendAlert();
    else
        result.innerText = fibonacciSeq[x - 1];
}

//function that creates a fibonacci seq on page load to grab elements from its array with local calculations
const createFibonacciSeq = () => {
    const arr = [1, 1];
    for (let i = 1; i < 49; i++)
        arr.push(arr[i - 1] + arr[i]);
    return arr;
}

//function to create and append alert for number bigger than 50
const appendAlert = () => {
    input.classList.add(`red-input`);
    const alert = document.createElement(`div`);
    alert.innerText = `Can't be larger than 50`;
    alert.classList.add(`red-alert`);
    alert.style.top = `${input.offsetHeight + 5}px`
    inputSection.append(alert);
}

//function that resets all values
const reset = () => {
    result.innerText = ``;
    input.classList.remove(`red-input`);
    result.classList.remove(`red-result`);
    if (inputSection.childElementCount > 1)
        inputSection.removeChild(inputSection.lastChild);
}

getFibonacciResults();
const fibonacciSeq = createFibonacciSeq();
input.addEventListener(`click`, function () {
    isBtn.disabled = false;
}); isBtn.addEventListener(`click`, handleClick);