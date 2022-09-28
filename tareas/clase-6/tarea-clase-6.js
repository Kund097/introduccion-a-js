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
    borrarResultadosAnteriores();
    obtenerEdades();
    textoResultados('mayor',calcularMayorEdad(edadesObtenidas));
    textoResultados('menor',calcularMenorEdad(edadesObtenidas));
    textoResultados('promedio',calcularPromedioEdad(edadesObtenidas));
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

function mostrarBotonCalcular(verdaderoOFalso) {
    const $displayCalcular = document.querySelector('#calcular');
    if (verdaderoOFalso) {
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

let edadesObtenidas = [];
function obtenerEdades() {
    const $edadesFamiliares = document.querySelectorAll('.edad');
    for (let i = 0; i < $edadesFamiliares.length; i++) {
        if ($edadesFamiliares[i].value != 0) {
            edadesObtenidas.push(Number($edadesFamiliares[i].value));
        } 
        
    }
    return edadesObtenidas;
}

function calcularMayorEdad(edades) {
    let mayor = edades[0];
    for (let i = 0; i < edades.length; i++) {
        if (edades[i] > 0) {
            if (mayor < edades[i]) {
                mayor = edades[i]
            } 
        }
    }

    return mayor
}

function calcularMenorEdad(edades) {
    let primerElemento = edades[0];
    let menor = 0;
    for (let i = 0; i < edades.length; i++) {
        if (edades[i] > 0) {
            if (primerElemento < edades[i]) {
                menor = primerElemento;
            } else {
                menor = edades[i];
                primerElemento = edades[i]
            }
        }
    }

    return  menor;
}

function calcularPromedioEdad(edades) {
    let promedio = 0;
    let sumaTotal = 0;
    let elementoEliminado = [];
    for (let i = 0; i < edades.length; i++) {
        if (edades[i] === 0) {
            elementoEliminado = edades.splice(i,1);
        }
        sumaTotal += edades[i];
    }
    promedio = (sumaTotal / edades.length).toFixed(2);

    return promedio;
}

function textoResultados(valor,resultado) {
    document.querySelector(`#${valor}`).textContent = `El ${valor} es: ${resultado}`;
}

function mostrarResultados(verdaderoOFalso) {
    $resultados = document.querySelector('#resultado');
    if (verdaderoOFalso) {
        $resultados.style.display = "inline"
    } else {
        $resultados.style.display = "none"
    }
}

function borrarResultadosAnteriores() {
    edadesObtenidas = [];
}
