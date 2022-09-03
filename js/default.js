const add = (num1, num2) => {
    return parseFloat(num1) + parseFloat(num2);
}

const sub = (num1, num2) => {
    return num1 - num2;
}

const mul = (num1, num2) => {
    return num1 * num2;
}

const div = (num1, num2) => {
    if (num2 == 0) {
        return notDivisibleByZeroError;
    }
    return (num1 / num2).toFixed(3);
}

const operate = (operator, num1, num2) => {
    let resultValue;
    switch (operator) {
        case "+":
            resultValue = add(num1, num2);
        break;

        case "-":
            resultValue = sub(num1, num2);
        break;

        case "*":
            resultValue = mul(num1, num2);
        break;

        case "/":
            resultValue = div(num1, num2);
        break;

        default:
            resultValue = error;
        break;
    }
    return resultValue;
}

let calcString = null, operator = null;
let display = document.getElementById("display");
let result = document.getElementById("result");
let error = "Invalid Function";
let notDivisibleByZeroError = "Can't divide by 0";
let decimalDiv = document.querySelector("#decimal");

document.querySelectorAll(".digit").forEach((digit) => {
    digit.addEventListener('click', (e) => {
        display.textContent += e.target.textContent;
    })
})

decimalDiv.addEventListener("click", (e) => {
    if (!e.target.getAttribute("disabled")) {
        display.textContent += e.target.textContent;
        e.target.setAttribute("disabled", "true");
    }
})

document.querySelector("#clear").addEventListener('click', (e) => {
    display.textContent = "";
    result.textContent = "";
    calcString = null;
    operator =  null;
})

document.getElementById("backspace").addEventListener('click', (e) => {
    display.textContent = display.textContent.slice(0,display.textContent.length - 1);
})

document.querySelectorAll(".operator").forEach((op) => {
    op.addEventListener('click', (e) => {
        decimalDiv.removeAttribute("disabled");
        calcString = display.textContent.trim();
        let calcStringSplit = calcString.split(/[+\-*\/]/g);
        if (calcStringSplit.length === 1) {
            operator = e.target.textContent.trim();
            result.textContent = "";
            display.textContent += e.target.textContent;
        } else {
            let answer = operate(operator, calcStringSplit[0], calcStringSplit[1]);
            operator = e.target.textContent;
            result.textContent = answer;
            display.textContent =  answer + e.target.textContent;
            if(answer === error || answer === notDivisibleByZeroError) {
                result.textContent = "";
            }
        }
        
    })
})

document.getElementById("equal").addEventListener('click', (e) => {
    calcString = display.textContent.trim();
    let calcStringSplit = calcString.split(/[+\-*\/]/g);
    operator = calcString.replace(/[0-9\.]/g, "").trim();
    let answer = operate(operator ,calcStringSplit[0], calcStringSplit[1]) ;
    result.textContent = answer;
    display.textContent =  answer;
    if(answer === error || answer === notDivisibleByZeroError) {
        result.textContent = "";
    }
})