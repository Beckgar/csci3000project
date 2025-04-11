window.addEventListener("DOMContentLoaded", domLoaded);

let termList = [36,48,60,72];

function domLoaded(){
    document.getElementById("calculateButton").addEventListener("click",updateCost)
}

function calculateCost(cost, down, APR, term){
    r = APR/12;
    p = (cost-down)
    //p = principal cost, n=term(number of months), r = apr/12 d=down payment
    payment = (p * r) / (1 - (1 + r)^-term)
    return payment;
}

function validateForm(cost,down,APR){

    let valid = true;
    //check for inputs in each field
    if ((cost.length==0) || down.length==0 || APR.length==0){
        alert ("Please make sure all fields are filled in");
        return false;
    }
    //check that each number is greater than 0
    if (parseFloat(cost) <=0 || parseFloat(down) <0 || parseFloat(APR) < 0){
        alert("Please make sure all values are valid. (Cost > 0 and down and apr >=0)")
        return false;
    }

    if (down>cost){
        alert("The down payment can not be greater than the cost.")
        return false;
    }

    return true;

}

function updateCost(){
    
    let html = "";
    let cost = (document.getElementById("cost").value);
    let down = (document.getElementById("down").value);
    let APR = (document.getElementById("APR").value);

    if (validateForm(cost,down,APR)){
    for (let index = 0; index <4; index++){
        let payment = calculateCost(cost,down,APR, termList[index]);
        let addedhtml = (`<p>The monthly payment for a ${termList[index]} term is: ${payment.toFixed(2)}</p>`)
        html+=addedhtml;
    }

    document.getElementById("payments").innerHTML=html;
    }

}
