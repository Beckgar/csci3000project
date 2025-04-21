window.addEventListener("DOMContentLoaded", domLoaded);

let termList = [36,48,60,72];

function domLoaded(){
    document.getElementById("calculateButton").addEventListener("click",updateCost)
    if (sessionStorage.getItem("html") == null){
    }
    else{
        document.getElementById("payments").innerHTML=sessionStorage.getItem("html");
    }
}

function calculateCost(cost, down, APR, term){
    r = APR;
    p = (cost-down)
    n=12; //number of payments a year (12 because montly)
    t=term;
    //p = principal cost, n=term(number of months), r = apr/12 d=down payment
    payment = Math.abs(p * r / (1 - (1 + r/n)^(-n*t)));
    return payment;
}

function validateForm(cost,down,APR){

    let valid = true;
    //check for inputs in each field
    if ((cost.length==0) || down.length==0 || APR.length==0){
        alert ("Please make sure all fields are filled in");
        return false;
    }

    //makes sure all values were number
    if (isNaN(cost)||isNaN(down)||isNaN(APR)){
        alert("Please make sure all the values are numbers.")
        return false;
    }

    //check that each number is greater than 0
    if (cost <=0 || down <0 || APR < 0){
        alert("Please make sure all values are valid. (Cost > 0 and down and apr >=0)")
        return false;
    }

    //down payment can not be more than the vehicle cost
    if (down>cost){
        alert("The down payment can not be greater than the cost.")
        return false;
    }

    return true;

}

function updateCost(){
    
    let html = "";
    let cost = parseFloat((document.getElementById("cost").value));
    let down = parseFloat((document.getElementById("down").value));
    let APR = parseFloat((document.getElementById("APR").value));

    if (validateForm(cost,down,APR)){
    for (let index = 0; index <4; index++){
        let payment = calculateCost(cost,down,APR, termList[index]);
        let addedhtml = (`<p>The monthly payment for a ${termList[index]} term is: ${payment.toFixed(2)}</p>`)
        html+=addedhtml;
    }

    document.getElementById("payments").innerHTML=html;
    sessionStorage.setItem("html",html);
    }

}
