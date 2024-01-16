const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;

const dropdowns = document.querySelectorAll(".dropdown select");

let btn  = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

for(let select of dropdowns){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name==="from"&&currCode==="USD"){
            newOptions.selected = "selected";
        }
        else if(select.name==="to"&&currCode==="INR"){
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    // let amount = document.querySelector(".amount input");
    // let amtVal = amount.value;
    // if(amount.value ===""|| amount.value<0){
    //     amtVal = 1;
    //     amount.value = "1";
    // }
    
    // const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response = await fetch(url);
    // let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    // let finalAmount = amount.value*rate;

    // msg.innerText = `${amount.value}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
    // console.log(finalAmount);
    updateExchangeRate();
});


const updateExchangeRate= async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amount.value ===""|| amount.value<0){
        amtVal = 1;
        amount.value = "1";
    }
    
    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amount.value*rate;

    msg.innerText = `${amount.value}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
    console.log(finalAmount);
}