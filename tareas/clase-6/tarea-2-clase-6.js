/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
const $botonAgregarFamiliar = document.querySelector('#agregar-familiar');

$botonAgregarFamiliar.onclick = function() {
    agregarFamiliar();
    mostrarBotonCalcular(true);
}

const $botonQuitarFamiliar = document.querySelector('#quitar-familiar');

$botonQuitarFamiliar.onclick = function() {
    quitarFamiliar();
}

const $botonlimpiar = document.querySelector('#limpiar');

$botonlimpiar.onclick = function() {
    borrarTodosIntegrantes();
    mostrarBotonCalcular(false);
    mostrarResultados(false);
}

const $botonCalcular = document.querySelector('#calcular');

$botonCalcular.onclick = function() {
    const SUELDOS_ARRAY = [];
    obtenerSueldos(SUELDOS_ARRAY);
    calcularMayorSueldo(SUELDOS_ARRAY);
    calcularMenorSueldo(SUELDOS_ARRAY);
    calcularPromedios(SUELDOS_ARRAY);
    mostrarResultados(true);
}

let contadorIntegrantes = 0;

function agregarFamiliar() {
    contadorIntegrantes++;
    const $divPadre = document.createElement('div');
    $divPadre.className = 'integrante';
    const $inputFamiliar = document.createElement('input');
    $inputFamiliar.type = 'number';
    $inputFamiliar.className = 'sueldo';
    const $Label = document.createElement('label');
    $Label.textContent = `Salario anual integrante Nº ${contadorIntegrantes}`;
    $divPadre.appendChild($Label);
    $divPadre.appendChild($inputFamiliar);
    document.querySelector('form').appendChild($divPadre);
}

function quitarFamiliar() {
    const $formPadre = document.querySelector('form');
    const $divIntegrante = document.querySelectorAll('.integrante');
    let posicionMax = $divIntegrante.length - 1;
    if ($divIntegrante.length > 0) {
        $formPadre.removeChild($divIntegrante[posicionMax]);
        contadorIntegrantes--;
    } else {
        console.log('no hay nada que eliminar');
    }
}

function mostrarBotonCalcular(trueOrFalse) {
    const $displayCalcular = document.querySelector('#calcular');
    if (trueOrFalse) {
        $displayCalcular.style.display = 'inline'
    } else {
        $displayCalcular.style.display = 'none'
    }
}

function borrarTodosIntegrantes() {
    const $cantidadIntegrantes = document.querySelectorAll('.integrante');
    for (let i = 0; i < $cantidadIntegrantes.length; i++) {
        quitarFamiliar();
    }
}

function obtenerSueldos(SUELDOS_ARRAY) {
    const $sueldosIntegrantes = document.querySelectorAll('.sueldo');
    for (let i = 0; i < $sueldosIntegrantes.length; i++) {
        if ($sueldosIntegrantes[i].value != 0) {
            SUELDOS_ARRAY.push(Number($sueldosIntegrantes[i].value));
        }
    }
}

function calcularMayorSueldo(sueldos) {
    let mayor = sueldos[0];
    for (let i = 0; i < sueldos.length; i++) {
        if (mayor < sueldos[i]) {
            mayor = sueldos[i];
        }
    }
    console.log(`el mayor sueldo es: ${mayor}`);
    textosResultados(mayor,1);
}

function calcularMenorSueldo(sueldos) {
    let menor;
    let temporal = sueldos[0];
    for (let i = 0; i < sueldos.length; i++) {
        if (temporal < sueldos[i]) {
            menor = temporal;
        } else {
            menor = sueldos[i];
            temporal = sueldos[i];
        }
    }
    console.log(`El menor sueldo es: ${menor}`);
    textosResultados(menor,2);
}

function calcularPromedios(sueldos) {
    let promedioAnual;
    let promedioMensual;
    let sumaTotal = 0;
    for (let i = 0; i < sueldos.length; i++) {
        sumaTotal += sueldos[i];
    }
    promedioAnual = (sumaTotal / sueldos.length).toFixed(2);
    promedioMensual = (sumaTotal / 12).toFixed(2);
    console.log(`El promedio anual es: ${promedioAnual}`);
    console.log(`El promedio mensual es: ${promedioMensual}`);
    textosResultados(promedioAnual,3);
    textosResultados(promedioMensual,4);
}

function textosResultados(resultado,texto) {
    if (texto === 1) {
        document.querySelector('#mayor-salario-anual').textContent = `El mayor sueldo es: ${resultado}`;
    }   else if (texto === 2) {
        document.querySelector('#menor-salario-anual').textContent = `El menor sueldo es: ${resultado}`;
    }   else if (texto === 3) {
        document.querySelector('#promedio-anual').textContent = `El promedio anual es: ${resultado}`;
    }   else if (texto === 4) {
        document.querySelector('#promedio-mensual').textContent = `El promedio mensual es: ${resultado}`;
    }
}

function mostrarResultados(trueOrFalse) {
    const $mostrarTextos = document.querySelector('#resultado');
    if (trueOrFalse) {
        $mostrarTextos.style.display = 'inline'
    } else {
        $mostrarTextos.style.display = 'none'
    }
}