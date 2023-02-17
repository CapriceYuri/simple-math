const numberBtn = document.querySelectorAll('.number');
const operationBtn = document.querySelectorAll('.operation');
const allClear = document.querySelector('.allclear');
const del = document.querySelector('.delete');
const equal = document.querySelector('.equal');

const firstArg = document.querySelector('.first-input')
const output = document.querySelector('.third-input')

let firstOperand = '';
let secondOperand = '';
let answerHolder = '';
let operation = undefined;

numberBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (output.innerText !== '') {
            clear()
        }
        if (e.target.innerText === '.' && checkDecimal(firstOperand) && secondOperand === '') {
            return
        } else if (e.target.innerText === '.' && checkDecimal(secondOperand)) {
            return
        }
        if (firstOperand !== '' && operation !== undefined) {
            secondOperand += e.target.innerText;
            firstArg.innerText = `${firstOperand} ${operation} ${secondOperand}`
            console.log(firstOperand)
            console.log(typeof firstOperand)
        } else {
            firstOperand += e.target.innerText;
            firstArg.innerText = `${firstOperand}`;
        }
    })
})

// Only for output/answerHolder, on first/second operand will affect conditionals for 'del' button.
function getDisplayNum(num){
    const floatNum = parseFloat(num).toLocaleString();
    return floatNum
}

// checkDecimal() -  check for extra decimal after the first
// first calculation > first and second operands are string, then becomes typeof(number) which prevent usage of includes() method (only string)
function checkDecimal(num){
 const str = toString(num);
 if (str.includes('.')){
    return false;
 } else {
    true
 }
}


operationBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (answerHolder !== '') {
            output.innerText = ''
            secondOperand = ''
            firstOperand = answerHolder;
            firstArg.innerText = `${firstOperand}`
            operation = e.target.innerText;
        }
        if (firstOperand === '') return
        if (firstArg.innerText.includes('+') || firstArg.innerText.includes('-') || firstArg.innerText.includes('/') || firstArg.innerText.includes('*')) return
        operation = e.target.innerText;
        firstArg.innerText += ` ${operation} `
    })
})


equal.addEventListener('click', () => {
    let computation;
    let prev = parseFloat(firstOperand);
    let curr = parseFloat(secondOperand);
    console.log(prev)
    console.log(curr)
    switch (operation) {
        case '+':
            computation = prev + curr
            break;
        case '-':
            computation = prev - curr
            break;
        case '/':
            computation = prev / curr
            break;
        case '*':
            computation = prev * curr
            break;
        default:
            computation = firstArg.innerText;
    }
    answerHolder = computation;
    console.log(computation)
    console.log(typeof computation)
    output.innerText = getDisplayNum(answerHolder);
})

// clear() remove all values for all inputs and variables
// removal() will remove from right to left. Will "return" when answer is displayed.
allClear.addEventListener('click', clear)
del.addEventListener('click', removal)
function clear() {
    firstOperand = '';
    secondOperand = '';
    answerHolder = '';
    operation = undefined
    firstArg.innerText = '';
    output.innerText = '';
}
function removal() {
    if (output.innerText !== '') return
    if (secondOperand !== '') {
        secondOperand = secondOperand.toString().slice(0, -1);
        firstArg.innerText = firstArg.innerText.toString().slice(0, -1)
    } else if (operation !== undefined && secondOperand === '') {
        operation = undefined;
        firstArg.innerText = firstArg.innerText.toString().slice(0, -1)
    } else if (firstOperand !== '' && operation === undefined && secondOperand === '') {
        firstOperand = firstOperand.toString().slice(0, -1);
        firstArg.innerText = firstArg.innerText.toString().slice(0, -1)
    }
}