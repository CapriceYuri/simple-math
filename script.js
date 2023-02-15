class Calculator {
    constructor(previousArg, currentArg) {
        this.previousArg = previousArg
        this.currentArg = currentArg
        this.clear()
    }

    clear() {
        this.current = ' ';
        this.previous = ' ';
        this.operation = undefined;
    }
    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(num) {
        if (num === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + num.toString();
    }
    getDisplayNum(num) {
        const stringNum = num.toString();
        const integerNum = parseFloat(stringNum.split('.')[0])
        const deciNum = (stringNum.split('.')[1])
        let integerDisplay;
        if (isNaN(integerNum)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerNum.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (deciNum != null) {
            return `${integerDisplay}.${deciNum}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentArg.innerText = this.getDisplayNum(this.current);
        if (this.operation != undefined) {
            this.previousArg.innerText = `${this.getDisplayNum(this.previous)} ${this.operation}`
        } else {
            this.previousArg.innerText = ''
        }
    }

    chooseOperation(operation) {
        if (this.current === '') return
        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let compute;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                compute = prev + curr
                break;
            case '-':
                compute = prev - curr
                break;
            case '/':
                compute = prev / curr
                break;
            case '*':
                compute = prev * curr
                break;
            default:
                return
        }
        this.current = compute;
        this.previous = ''
        this.operation = undefined
    }
}

const numberBtn = document.querySelectorAll('.number');
const operationBtn = document.querySelectorAll('.operation');
const allClear = document.querySelector('.allclear');
const del = document.querySelector('.delete');
const equal = document.querySelector('.equal');

const currentArg = document.querySelector('.current-input')
const previousArg = document.querySelector('.previous-input')

const calculator = new Calculator(previousArg, currentArg);

numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equal.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
allClear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
del.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})