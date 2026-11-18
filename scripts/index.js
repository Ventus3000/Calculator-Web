const numbers_container = document.querySelector(".numbers_container");
const result_container = document.querySelector(".result_container");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const assignment = document.querySelector(".assignment");
const del = document.querySelector(".del");
const back_space = document.querySelector(".back_space");
const dot = document.querySelector(".dot");
let first_number, second_number, operator, result, address=-1;
start();
numbers.forEach(number => number.addEventListener("click", click_number));
operators.forEach(operator => operator.addEventListener("click", click_operator));
assignment.addEventListener("click", result_calculation);
del.addEventListener("click", start);
back_space.addEventListener("click", back);
dot.addEventListener("click", add_dot);
function start(){
    first_number = "";
    second_number = "";
    operator = "";
    result = "";
    refresh_screen();
}
function refresh_screen(){
    numbers_container.value = first_number + operator + second_number;
    result_container.value = result;
}
function click_number(){
    if(operator == ""){
        first_number += this.innerText;
    }else{
        second_number += this.innerText;
    }
    refresh_screen();
}
function click_operator(){
    if(result != ""){
        first_number = result;
        second_number = "";
        operator = this.innerText;
        result = "";
    }else{
        if(first_number != "" && first_number != "+" && first_number != "-"){
            if(second_number == ""){
                operator = this.innerText;
            }  
        }else if(first_number == "" || first_number == "+" || first_number == "-"){
            if(this.innerText == "+" || this.innerText == "-"){
                if(first_number == "+" || first_number == "-"){
                    back();
                }
                first_number += this.innerText;
            }
        } 
    }
    refresh_screen();
}
function result_calculation(){
    if(operator != ""){
        switch(operator){
            case "+":
                result = Number(first_number) + Number(second_number);
                break;
            case "-":
                result = Number(first_number) - Number(second_number);
                break;
            case "x":
                result = Number(first_number) * Number(second_number);
                break;
            case "÷":
                result = Number(first_number) / Number(second_number);
                break;
            default:
                return;
        }
    }
    mem();
    refresh_screen();
}
function back(){
    if(result !=""){
        result = "";
    }else{
        if(second_number != ""){
            second_number = second_number.slice(0, -1);
        }else{
            if(operator != ""){
                operator = "";
            }else{
                first_number = first_number.slice(0, -1);
            }
        }
    }
    refresh_screen();
}
function add_dot(){
    if(first_number != "" && operator == "" && !(first_number.includes("."))){
        first_number += this.innerText;
    }
    if(second_number != "" && operator != "" && !(second_number.includes("."))){
        second_number += this.innerText;
    }
    refresh_screen();
}
function mem(){
    if(address<=7){
        address++;
    }else{
        address=0;
    } 
    document.getElementById(address).value = first_number+operator+second_number+"="+result;
}