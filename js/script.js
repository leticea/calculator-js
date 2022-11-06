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

        // [checa se a operação já tem um ponto (.)]
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    }

    // [muda os valores da calculadora]
    updateScreen() {

        this.currentOperationText.innerText += this.currentOperation;
    }
};

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {

    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
        
        if (+value >= 0 || value === ".") {

            calc.addDigit(value);

        } else {

            console.log("Op: " + value);
        }                
    });
});