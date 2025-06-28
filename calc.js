var formulario= document.getElementById("formu");
var sexo=document.getElementById("sexo")
var peso =document.getElementById("peso");
var altura=document.getElementById("altura");
var cuello=document.getElementById("cuello");
var cintura=document.getElementById("cintura");
var cadera=document.getElementById("cadera");
var edad=document.getElementById("edad");
var boton=document.getElementById("envio")
var mensaje=document.getElementById("msg")
let pgc_output = document.getElementById("pgc_result");
let imc_output = document.getElementById("imc_result");
let tmb_output = document.getElementById("tmb_result");

if(parseFloat(peso.value)<30){
    alert("Are u a skeleton?")
}
if(edad<18){
    alert("You are so young")
}

sexo.addEventListener("change", function() {
    if (sexo.value === "hombre") {
        imagenSexo.src = "men.svg";
        boton.style.backgroundColor="rgb(14, 149, 233)";
        cadera.value=0;
    } else {
        imagenSexo.src = "woman.svg";
        boton.style.backgroundColor="pink";

    }
});

document.querySelector(".formu").addEventListener("submit", function(event) {
    event.preventDefault(); 
    let resultadoPGC = pgc(sexo.value, cintura.value, cuello.value, altura.value, cadera.value);
    let resultadoIMC = imc(peso.value, altura.value);
    let resultadoTMB = tmb(sexo.value, peso.value,altura.value, edad.value);

    pgc_output.textContent ="Tu porcentaje de grasa corporal es"+" "+ resultadoPGC.toFixed(2);
    imc_output.textContent ="Tu indice de masa corporal es"+" "+ resultadoIMC.toFixed(2);
    tmb_output.textContent ="Tu Tasa metabolica basal es "+" "+resultadoTMB.toFixed(2);
    mensaje.style.visibility="visible";

    console.log("Formulario enviado sin recarga");
});


function pgc(sexo, cintura, cuello, altura, cadera) {
    let pgcresult;

    if (sexo == "hombre") {
        pgcresult = 495/(1.0324 - 0.19077 * Math.log10(parseFloat(cintura) - parseFloat(cuello))+ 0.15456 * Math.log10(parseFloat(altura))) - 450;
    } else {
        pgcresult = 495 / (1.29579 - 0.35004 * Math.log10(parseFloat(cintura) + parseFloat(cadera) - parseFloat(cuello))+0.22100* Math.log10(parseFloat(altura)))- 450;
    }

    return pgcresult;
}

function imc(peso, altura){
    let altura_metros = parseFloat(altura) / 100;
    let valimc = parseFloat(peso) / (altura_metros * altura_metros);
    return valimc;
}

function tmb(sexo, peso, altura, edad){
    let tmbresult;
    if (sexo.toLowerCase() === "hombre") {
        tmbresult = 10 * parseFloat(peso) + 6.25 * parseFloat(altura) - 5 * parseInt(edad) + 5;
    } else {
        tmbresult = 10 * parseFloat(peso) + 6.25 * parseFloat(altura) - 5 * parseInt(edad) - 161;
    }
    return tmbresult;
}
