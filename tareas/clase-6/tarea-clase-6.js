/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $botonEnviarFamiliares = document.querySelector('#enviar');

$botonEnviarFamiliares.onclick = function() {
    const $cantidadFamiliares = Number(document.querySelector('#grupo-familiar').value);
    if ($cantidadFamiliares > 0) {
        mostrarBotonCalcular(true);
    }
    detectarInputsABorrar();
    crearElementos($cantidadFamiliares);
}

const $botonLimpiarFormulario = document.querySelector('#limpiar');

$botonLimpiarFormulario.onclick = function() {
    limpiarInputs();
    mostrarBotonCalcular(false);
    mostrarResultados(false);
}

const $botonCalcular = document.querySelector('#calcular');

$botonCalcular.onclick = function() {
    obtenerEdades();
    calcularMayorEdad(obtenerEdades());
    calcularMenorEdad(obtenerEdades());
    calcularPromedioEdad(obtenerEdades());
    mostrarResultados(true);
}


function crearElementos(familiares) {

    for (let i = 0; i < familiares; i++) {

        const $div = document.createElement('div');
        $div.className = "familiar";

        const $label = document.createElement('label');
        $label.textContent = `Familiar Nº ${i + 1}  `;

        const $input = document.createElement('input');
        $input.className = "edad";
        $input.setAttribute("type","number");

        document.querySelector('form').appendChild($div);
        $div.appendChild($label);
        $div.appendChild($input);
    }
}

function mostrarBotonCalcular(trueOrFalse) {
    const $displayCalcular = document.querySelector('#calcular');
    if (trueOrFalse) {
        $displayCalcular.style.display = "inline"
    } else {
        $displayCalcular.style.display = "none"
    }
    
}

function limpiarInputs() {
    const $nodoPadre = document.querySelector('form');
    const $familiares = document.querySelectorAll('.familiar');
    for (let i = 0; i < $familiares.length; i++) {
        $nodoPadre.removeChild($familiares[i]);
    }
}

function detectarInputsABorrar() {
    const $familiaresIngresados = document.querySelector('#grupo-familiar').value;
    const $inputABorrar = document.querySelectorAll('.familiar');
    if ($familiaresIngresados != 0) {
        if ($inputABorrar.length != "") {
            limpiarInputs();
        }
    }
}

function obtenerEdades() {
    const $edadesFamiliares = document.querySelectorAll('.edad');
    const ARRAY_EDADES = [];
    for (let i = 0; i < $edadesFamiliares.length; i++) {
        if ($edadesFamiliares[i].value != 0) {
            ARRAY_EDADES.push(Number($edadesFamiliares[i].value));
        } 
        
    }
    return ARRAY_EDADES;
}

function calcularMayorEdad(array) {
    let mayor = array[0];
    for (let i = 0; i < array.length; i++) {
        if (mayor < array[i]) {
            mayor = array[i]
        } 
    }
    textoResultados(mayor,1);
    return console.log(`El mayor es: ${mayor}`);
}

function calcularMenorEdad(array) {
    let primerElemento = array[0];
    let menor = 0;
    for (let i = 0; i < array.length; i++) {
        if (primerElemento < array[i]) {
            menor = primerElemento;
        } else {
            menor = array[i];
            primerElemento = array[i]
        }
    }
    textoResultados(menor,2);
    return console.log(`El menor es: ${menor}`);
}

function calcularPromedioEdad(array) {
    let promedio = 0;
    let sumaTotal = 0;
    for (let i = 0; i < array.length; i++) {
        sumaTotal += array[i];
    }
    promedio = (sumaTotal / array.length).toFixed(2);
    textoResultados(promedio,3);
    return console.log(`El promedio es: ${promedio}`);
}

function textoResultados(resultado,texto) {
    if (texto === 1) {
        document.querySelector('#mayor').textContent = `El mayor es: ${resultado}`;
    }
    if (texto === 2) {
        document.querySelector('#menor').textContent = `El menor es: ${resultado}`
    }
    if (texto === 3) {
        document.querySelector('#promedio').textContent = `El promedio es: ${resultado}`
    }
}

function mostrarResultados(trueOrFalse) {
    $resultados = document.querySelector('#resultado');
    if (trueOrFalse) {
        $resultados.style.display = "inline"
    } else {
        $resultados.style.display = "none"
    }
}