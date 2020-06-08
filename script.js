function add(num1, num2){
    return Number(num1) + Number(num2);
}

function substract(num1, num2){
    return Number(num1) - Number(num2);
}


function multiply(num1, num2){
    return Number(num1) * Number(num2);
}


function divide(num1, num2){
    return Number(num1) / Number(num2);
}

function operate(num1, operator, num2){
    switch(operator){
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return substract(num1,num2);
            break;
        case "/":
            return divide(num1,num2);
            break;
        case "x":
            return multiply(num1,num2);
            break;
    }
}

function evaluate(expressionArray){
    let totalSum = 0;
    for(let i = 1; i < expressionArray.length; i++){
        if(expressionArray[i] === "x" || expressionArray[i] === "/"){
            
            totalSum = operate(expressionArray[i - 1], expressionArray[i], expressionArray[i + 1]);
            expressionArray.splice(i - 1,3,totalSum);
            totalSum = 0;
            i--;
        }
    }
    for(let i = 1; i < expressionArray.length; i++){
        if(expressionArray[i] === "+" || expressionArray[i] === "-"){
            
            totalSum = operate(expressionArray[i - 1], expressionArray[i], expressionArray[i + 1]);
            expressionArray.splice(i - 1,3,totalSum);
            totalSum = 0;
            i--;
        }
    }
    return expressionArray.join(" ");

}



const display = document.querySelector("#display");

const buttons = document.querySelectorAll("button");

const clearButton = document.querySelector("#C");

const equalsButton = document.querySelector("#equals");

equalsButton.addEventListener("click", function(){
    if(display.textContent.length >= 3){
        displayArray = display.textContent.split(" ");        
        display.textContent = evaluate(displayArray);
    }
})

clearButton.addEventListener("click", function(){
    display.textContent = "";
})

for(let i = 0; i < buttons.length; i++){
    if(buttons[i].textContent != "=" && buttons[i].textContent != "C"){
        if(buttons[i].classList.value === "operators"){
            buttons[i].addEventListener("click", function(e){
                if(display.textContent === ""){
                    display.textContent += "0";
                }
                display.textContent += " " + e.srcElement.textContent + " ";
                
            }) 
        }
        else{
            buttons[i].addEventListener("click", function(e){
                display.textContent += e.srcElement.textContent;
            }) 
        }
        
    }
}



