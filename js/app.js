/**
 * Constantes de los elementos de HTML
 */
const main = document.getElementById("main-container");
const sectionMessage = document.getElementById("section-message");
const input = document.getElementById("card-number");
const form = document.getElementById("form-card");
const btnReturn = document.getElementById("btn-return")

/**
 * Evento del formulario
 */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkCardNumber(input.value);
});

/**
 * Evento del botón de retornar
 */
btnReturn.addEventListener("click", () =>{
    returnPrincipal();
})

/**
 * Método para revisar el número de la tarjeta.
 * @param {*} number Es el número de la tarjeta. 
 */
function checkCardNumber(number){
    removeError();
    let digitsRegEx = /^[0-9]*$/.test(number);
    if (number.length) 
        if (digitsRegEx)
            if (number.length >= 15)
                if (number.length <= 16)
                    if (!isValid(number))
                        showMessage(1,`Tu tarjeta ${number.replace(/\d(?=\d{4})/g, "#")} es válida.`);
                    else 
                        showMessage(0,`Tu tarjeta ${number} no es válida. Inténtalo de nuevo.`);
                else 
                    showError("Longitud máxim es de 15 números");
            else 
                showError("Longitud mínima es de 15 números");    
        else 
            showError("Ingrese solo números");
    else
        showError("Por favor, ingrese el número de tarjeta");
    
}

/**
 * Método para validar el número de la tarjeta.
 * @param {*} number Es el número de la tarjeta.
 * @return {*} El resultado por el mod de 10.
 */
function isValid(number){
    let arrayNumber = reverseNumber(number);
    let result = getTotalArray(arrayNumber);
    return result % 10;
}

/**
 * Método para crear un arreglo invirtiendo el orden de los elementos.
 * @param {*} number Es el número de la tarjeta.
 * @return {*} Un arreglo con el orden invertido de sus elementos.
 */
function reverseNumber(number){
    return Array.from(number, Number).reverse();
}

/**
 * Método para obtener la suma total de sus elementos usando el logaritmo de Luhn.
 * @param {*} array Es el arreglo a evaluar. 
 * @returns {*} Es el resultado de la suma.
 */
function getTotalArray(array){
    let value, result = 0, length = array.length;
    for (let j = 0; j < length; j++){
        value = array[j] ;
        if (j % 2){
            value = array[j] * 2;
            if (value >= 10){
              value = getSum(value);  
            }
        }
        result += value;
    }
    return result
}

/**
 * Método para obtener la suma de sus elementos.
 * @param {*} value Es el número ha evaluar.
 * @returns El resultado de la suma de sus elementos. 
 */
function getSum(value){
    value = value.toString();
    let sum = 0;
    for (k = 0;k < value.length;k++)
        sum += parseInt(value[k]);
    return sum;
}

/**
 * Método para mostrar un error en el input.
 * @param {*} message Es el mensaje a mostrar.
 */
function showError(message) {
    const small = document.querySelector('small');
    input.className = "error-input";
    small.style.visibility = 'visible';
    small.innerText = message;
}

function removeError() {
    const small = document.querySelector('small');
    input.classList.remove("error-input");
    small.style.visibility = 'hidden';
}


/**
 * Método para mostrar el mensaje en el contenedor de mensaje
 * @param {*} type Es el tipo del mensaje
 * @param {*} message Es el mensaje a mostrar
 */
function showMessage(type, message){
    const pMessage = document.getElementById("message");
    const imgLogo = document.getElementById("logo");
    imgLogo.setAttribute("src", getIcon(type));   
    pMessage.innerText = message;
    main.className = "container hide";
    sectionMessage.className = "container";
    btnReturn.innerHTML = getMessageButton(type);   
}

/**
 * Método para obtener la ruta de icono.
 * @param {*} icon Es el tipo de icono que quiere mostrar.
 * @returns La ruta del icon 
 */
function getIcon(icon){
    if (icon)
        return "icons/valid.png";
    else 
        return "icons/no-valid.png"
}

/**
 * Método para obtener el mensaje a mostrar en el botón
 * @param {*} type Es el tipo de mensaje a mostrar en el botón
 * @returns El mensaje a mostar en el botón
 */
function getMessageButton(type) {
    if (type)
        return "REGRESAR";
    else 
        return "INTENTAR DE NUEVO";
}

/**
 * Método para retornar a la página principal.
 */
function returnPrincipal(){
    main.className = "container";
    sectionMessage.className = "container hide";
    input.value = "";
}