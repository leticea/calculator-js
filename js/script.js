const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {

    constructor(previousOperationText, currentOperationText) {

        // [valores impressos na tela]
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        // [o valor que está sendo digitado]
        this.currentOperation = "";
    }

    // [adiciona os dígitos na calculadora]
    addDigit(digit) {

        // [checa se a operação já tem um ponto]
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    }

    // [processar todas as operações da calculadora]
    processOperation(operation) {

        // [pegar o valor antigo e atual]
        let operationValue;
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        switch(operation) {

            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);

                break;
            default:
                return;
        }
    }

    // [muda os valores da calculadora]
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        console.log(operationValue, operation, current, previous);

        if (operationValue === null) {

            this.currentOperationText.innerText += this.currentOperation;

        } else {
            // [checa se o valor é zero e se for adiciona o valor atual]
            if (previous === 0) {

                operationValue = current;
            }

            //[adiciona o valor atual ao anterior]
            this.previousOperationText.innerText = `${operationValue}`;
        }
    }
};

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {

    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
        
        if (+value >= 0 || value === ".") {

            calc.addDigit(value);

        } else {

            calc.processOperation(value);
        }                
    });
});