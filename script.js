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


//This takes in the whole expression at the point of pressing equals and evaluates it based on operator precedence, divide & multiply first then + & -.
function evaluate(expressionArray){
    let totalSum = 0;
    //Looks for the multiply and divide operators.
    for(let i = 1; i < expressionArray.length; i++){
        if(expressionArray[i] === "x" || expressionArray[i] === "/"){
            totalSum = operate(expressionArray[i - 1], expressionArray[i], expressionArray[i + 1]);
            if(totalSum === Infinity){
                totalSum = "ZeroDivisionError"
            }
            expressionArray.splice(i - 1,3,totalSum);
            totalSum = 0;
            i--;
        }
    }

    //Looks for the plus and subtract operators.
    for(let i = 1; i < expressionArray.length; i++){
        if(expressionArray[i] === "+" || expressionArray[i] === "-"){
            totalSum = operate(expressionArray[i - 1], expressionArray[i], expressionArray[i + 1]);
            console.log(totalSum);
            expressionArray.splice(i - 1,3,totalSum);
            totalSum = 0;
            i--;
        }
    }
    recentAnswer = Number(expressionArray.join(" "));
    return expressionArray.join(" ");

}

// This variable is used to check the recent answer was so we can check if the user intends to start a new expression or add more numbers to current expression

let recentAnswer;

//Caching references DOM elements.
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
        // Checks if user pressed an operator or number.
        if(buttons[i].classList.value === "operators"){
            buttons[i].addEventListener("click", function(e){
                if(display.textContent === ""){
                    display.textContent += "0";
                }
                display.textContent += " " + e.srcElement.textContent + " ";
                recentAnswer = "";
                
            }) 
        }
        // Check if the intent is to use a negative number or subtract operator
        else if(buttons[i].id === "subtract"){
            buttons[i].addEventListener("click", function(e){
                displayArray = display.textContent.split(" ");
                let lastElement;

                //get the value of the last real element not including non spaces ""
                //
                if(displayArray[displayArray.length - 1] === ""){
                    lastElement = displayArray.length - 2
                }
                else{
                    lastElement = displayArray.length - 1;
                }

                // if subtract is the first button to be pushed user intended a negative number,
                // if the last button to be pressed was an operator then the intent was also a negative number
                // else intent was subtract operator.
                // resets the recentAnswer variable.
                if(display.textContent === ""){
                    display.textContent += "-";
                }
                else if(isNaN(displayArray[lastElement])){
                    display.textContent += "-";
                }
                else{
                    display.textContent += " " + e.srcElement.textContent + " ";
                    recentAnswer = "";
                }
            })
            
        }
        else{
            buttons[i].addEventListener("click", function(e){
                const displayArray = display.textContent.split(" ");
                console.log(recentAnswer, displayArray);
                if(Number(displayArray[0]) === recentAnswer){
                    display.textContent = e.srcElement.textContent;
                }
                else{
                    display.textContent += e.srcElement.textContent;
                }
                
            }) 
        }
        
    }
}



