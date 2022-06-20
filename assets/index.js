//grabs all the items
const root = document.querySelector(`.root`);
const input = document.getElementById(`xNum`);
const result = document.getElementById(`yNum`);
const inputSection = document.querySelector(`.input-and-alert`);
const isBtn = document.querySelector(`.btn`);
const spinner = document.createElement(`div`);
spinner.classList.add(`spinner-border`);

//function that will run on every isBtn click
const handleClick = async () => {
    reset(); //resets values
    const x = input.value;
    root.append(spinner);
    try {
        res = await fetch(`http://localhost:5050/fibonacci/${x}`);
        if(!res.ok) 
            throw new Error(await res.text());
        data = await res.json();
        result.innerText = data.result;
    } catch (err) {
        if (x == 42) {
            result.innerText = err.message;
            result.classList.add(`red-result`);
        } else
            createAlert();
    }
    root.removeChild(spinner);
}

//function to create and append alert for number bigger than 50
const createAlert = () => {
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

input.addEventListener(`click`, function() {
    isBtn.disabled = false;
});
isBtn.addEventListener(`click`, handleClick);