const main = document.getElementById("main-container");
const sectionMessage = document.getElementById("section-message");
const input = document.getElementById("card-number");
const form = document.getElementById("form-card");
const btnReturn = document.getElementById("btnReturn")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkCardNumber(input.value);
});

btnReturn.addEventListener("click", () =>{
    main.className = "container";
    sectionMessage.className = "container hide";
})

function checkCardNumber(number){
    if (number.length){
        let digitsRegEx = /^[0-9]*$/.test(number);
        if (digitsRegEx) 
            if (!isValid(number))
                showMessage(1,`Tu tarjeta ${number.replace(/\d(?=\d{4})/g, "#")} es válida.`);
             else 
                showMessage(0,`Tu tarjeta ${number} no es válida. Inténtalo de nuevo.`);
        else 
            showError("Ingrese solo números");
    } else
        showError("Campo vacío");
}
   
/* Funciones nuevas*/
function isValid(number){
    let arrayNumber = reverseNumber(number);
    let result = totalArray(arrayNumber);
    return result % 10;
}

function reverseNumber(number){
    return Array.from(number, Number).reverse();
}

function totalArray(array){
    let value, result = 0, length = array.length;
    for (let j = 0; j < length; j++){
        value = array[j] ;
        if (j % 2){
            value = array[j] * 2;
            if (value >= 10){
              value = sum(value);  
            }
        }
        result += value;
    }
    return result
}

function sum(value){
    value = value.toString();
    let sum = 0;
    for (k = 0;k < value.length;k++)
        sum += parseInt(value[k]);
    return sum;
}

/* Función vieja*/
/*function isValid(number){
    let length = number.length - 1;
    let value;
    let result = 0;
    let reverseNumber = [];
    for (let i = length; i >= 0; i--)
        reverseNumber.push(parseInt(number.charAt(i)));
    for (let j = 0; j <= length; j++){
        value = reverseNumber[j] ;
        if (j % 2){
            value = reverseNumber[j] * 2;
            if (value >= 10){
                value = value.toString();
                let sum = 0;
                for (k = 0;k < value.length;k++)
                    sum += parseInt(value[k]);
                value = sum;
            }
        }
        result += value;
    }
    return result % 10;
}*/

function showError(message){
    const small = document.querySelector('small');
    input.className = "error-input";
    small.style.visibility = 'visible';
    small.innerText = message;
}

function showMessage(icon, message){
    const pMessage = document.getElementById("message");
    const imgLogo = document.getElementById("logo");
    imgLogo.setAttribute("src", getIcon(icon));   
    pMessage.innerText = message;
    main.className = "container hide";
    sectionMessage.className = "container";   
}

function getIcon(icon){
    if (icon)
        return "icons/valid.png";
    else 
        return "icons/no-valid.png"
}