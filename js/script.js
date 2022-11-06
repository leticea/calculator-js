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
    };

    // [adiciona os dígitos na calculadora]
    addDigit(digit) {

        // [checa se a operação já tem um ponto]
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    };

    // [processar todas as operações da calculadora]
    processOperation(operation) {

        // [checa se o valor atual é vazio]
        if (this.currentOperationText.innerText === "" && operation !== "C") {

            if (this.previousOperationText.innerText !== "") {
                
                this.changeOperation(operation);
            }

            return;
        }

        // [pegar o valor antigo e atual]
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {

            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearCurrentOperation();
                break;

            case "C":
                this.processClearOperation();
                break;

            case "=":
                this.processEqualOperator();
                break;

            default:
                return;
        }
    };

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
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    };

    // [muda a operação matemática]
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {

            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // [deleta o último dígito]
    processDelOperator() {

        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // [limpa a operação atual]
    processClearCurrentOperation() {

        this.currentOperationText.innerText = "";
    }

    // [limpa a operação toda]
    processClearOperation() {

        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // [processa o resultado da operação]
    processEqualOperator() {
        
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
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