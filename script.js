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



const display = document.querySelector("#display");

const buttons = document.querySelectorAll("button");

const clearButton = document.querySelector("#CE");

const equalsButton = document.querySelector("#equals");

equalsButton.addEventListener("click", function(){
    if(display.textContent.length >= 3){
        displayArray = display.textContent.split("");
        display.textContent = operate(displayArray[0], displayArray[1], displayArray[2])
    }
})

clearButton.addEventListener("click", function(){
    displayArray = display.textContent.split("");
    displayArray.pop();
    display.textContent = displayArray.join("");
})

for(let i = 0; i < buttons.length; i++){
    if(buttons[i].textContent != "=" && buttons[i].textContent != "CE"){
        buttons[i].addEventListener("click", function(e){
            display.textContent += e.srcElement.textContent;
        }) 
    }
}



