//Not much here yet
window.addEventListener("DOMContentLoaded", domLoaded);

let termList = [36,48,60,72];

function domLoaded(){
    document.getElementById("calculateButton").addEventListener("click",updateCost)
}

function calculateCost(cost, down, APR, term){
    //Need cost of vehicle, term, APR, and down payment
    r = APR/12;
    p = (cost-down)
    //p = principal cost, n=term(number of months), r = apr/12 d=down payment
    payment = (p * r) / (1 - (1 + r)^-term)
    return payment;
}

function updateCost(){
    let html = "";
    let cost = (document.getElementById("cost").value);
    let down = (document.getElementById("down").value);
    let APR = (document.getElementById("APR").value);

    for (let index = 0; index <4; index++){
        let payment = calculateCost(cost,down,APR, termList[index]);
        let addedhtml = (`<p>The monthly payment for a ${termList[index]} term is: ${payment.toFixed(2)}</p>`)
        html+=addedhtml;
    }

    document.getElementById("payments").innerHTML=html;

}
