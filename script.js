// variables
let num1 = "";
let operation = "";
let num2 = "";
let point = false;
let newNums = true;

// variables for DOM Objects
let numberButtons = document.querySelectorAll('.number');
let pointButton = document.querySelector('.point');
let operatorButtons = document.querySelectorAll('.operation');
let clearButton = document.querySelector('.clear');
let equalButton = document.querySelector('.equal');
let displayHistory = document.querySelector('.history');
let displayContent = document.querySelector('.current');

// event handlers
equalButton.addEventListener('click', () => {
    if (num2.length != 0)
    {
        if (!checkZeroDivision())
        {
            let result = operate(operation, num1, num2);
            updateDisplayEquals(result);
            num1 = result;
            operation = "";
            num2 = ""; 
        }
        newNums = true;
        enablePoint();
    }

})

clearButton.addEventListener('click', () => {
    num1 = "";
    operation = "";
    num2 = "";
    newNums = true;
    updateDisplay(num1);
    enablePoint();
})

pointButton.addEventListener('click', () => {
    if (point == false)
    {
        disablePoint();
        updateVariables('.');
    }
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateVariables(button.textContent);
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (num1.length != 0)
        {
            if (checkZeroDivision())
            {
                newNums = true;
                return;
            }
            // if we are doing a consecutive operation
            if (operation.length != 0 && num2.length != 0)
            {
                num1 = operate(operation, num1, num2);
                num2 = "";
            }

            operation = button.textContent;

            enablePoint();
            newNums = false;

        }
        updateDisplay(num1);
    })
})


function updateVariables(content)
{
    if (newNums)
    {
        num1 = content;
        operation = "";
        num2 = "";
        newNums = false;
        updateDisplay(num1);
        return;
    }

    if (operation.length == 0)
    {
        if (num1.length < 14)
        {
            num1 += content;
            updateDisplay(num1);
        }
    }
    else
    {
        if (num2.length < 14)
        {
            num2 += content;
            updateDisplay(num2);
        }

    }
}
// update display function
function updateDisplay(num)
{
    let historyContent = truncateNumber(num1) + " " + operation + " " + truncateNumber(num2);
    displayHistory.textContent = historyContent;


    displayContent.textContent = truncateNumber(num);
}

function truncateNumber(num)
{
    if (num.length > 14)
    {
        num = parseFloat(num);
        num = num.toExponential();

        if (String(num).length > 14)
        {
            num = parseFloat(num);
            num = num.toPrecision(10);
        }
        
    }

    return String(num);
}
function updateDisplayEquals(num)
{
    updateDisplay(num);
    displayHistory.textContent += " =";
}

function checkZeroDivision()
{
    if ((parseInt(num2) == 0 || parseFloat(num2) == 0.0) && operation == '/')
    {
        updateDisplay();
        displayContent.textContent = "Division by zero";
        return true;
    }
    return false;
}

function disablePoint()
{
    point = true;
    pointButton.style['opacity'] = '50%';
}

function enablePoint()
{
    point = false;
    pointButton.style['opacity'] = '100%';
}

// operate functions
function operate(operator, num1, num2)
{
    num1 = num1.includes('.') ? parseFloat(num1) : parseInt(num1);
    num2 = num2.includes('.') ? parseFloat(num2) : parseInt(num2);
    console.log(num1);
    console.log(num2);
    let returnVal = null;
    
    switch (operator)
    {
        case '+':
            returnVal = add(num1, num2);
            break;

        case '-':
            returnVal = subtract(num1, num2);
            break;

        case '*':
            returnVal = multiply(num1, num2);
            break;
        
        case '/':
            returnVal = divide(num1, num2);
            break;
    }

    num1 = String(num1);
    num2 = String(num2);
    return String(returnVal);
}

// helper functions to operate
function add(num1, num2){return num1 + num2};
function subtract(num1, num2){return num1 - num2};
function multiply(num1, num2){return num1 * num2};
function divide(num1, num2){return num1 / num2};