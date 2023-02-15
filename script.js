class Calculator {
    constructor(previousArg, currentArg) {
        this.previousArg = previousArg
        this.currentArg = currentArg
    }
    
    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }
    
    appendNumber(num) {
        this.current = num;
    }
    
    updateDisplay() {
        this.currentArg.innerText = this.current;
        if (this.operation != undefined){
            this.previousArg.innerText = `${this.previous} ${this.operation}`
        } else {
            this.previousArg.innerText = ''
        }
    }
    
    chooseOperation(operation) {
        if (this.current === '') return
        if (this.current !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }
    
    compute() {
        let compute;
        const prev = this.previousArg;
        const curr = this.currentArg;
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
