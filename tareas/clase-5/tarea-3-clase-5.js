//TAREA: En otro archivo distinto,
// Por cada clase de r/argentina programa existente, vamos a pedir:
// horas, minutos y segundos de cada video. Ej. Si un video dura
// 2 horas, 38 minutos y 20 segundos, vamos a rellenar 3 campos de texto con
// cada dato.
// al apretar el botón "Calcular tiempo total", debe mostrar en un
// <strong> pre-creado el tiempo total de los videos.
const $botonCrearInput = document.querySelector(`#agregar`);
$botonCrearInput.onclick = function() {
    crearInputTiempo('horas');
    crearInputTiempo('minutos');
    crearInputTiempo('segundos');
}

const $botonLimpiar = document.querySelector(`#limpiar`);
$botonLimpiar.onclick = function() {
    limpiarElementos();
    borrarResultadosAnteriores();
}

let segundos = 0;

const $botonCalcular = document.querySelector('#calcular');
$botonCalcular.onclick = function() {
    borrarResultadosAnteriores();
    obtenerSegundos();
    calcularMinutosASegundos();
    calcularHorasASegundos();
    mostrarResultados();
}

function crearInputTiempo(tiempo) {
    const $nodoPadre = document.querySelector('body');
    const $divHoras = document.createElement('div')
    const $labelHoras = document.createElement("label");
    const $inputHoras = document.createElement("input");

    $nodoPadre.appendChild($divHoras);
    $divHoras.appendChild($labelHoras);
    $divHoras.appendChild($inputHoras);

    $labelHoras.textContent = `${tiempo[0].toUpperCase()+tiempo.substring(1)}: `;
    $inputHoras.type = 'number';
    $inputHoras.className = `${tiempo}`;
}

function limpiarElementos() {
    const $nodoPadre = document.querySelector("body");
    let $textoResultado = document.querySelector("#resultado");
    const $elementosEliminados = document.querySelectorAll("div");

    for (let i = 0; i < $elementosEliminados.length; i++) {
        $nodoPadre.removeChild($elementosEliminados[i]);
    }
    $textoResultado.innerText = "";
}

function calcularHorasASegundos() {
    let totalHoras = 0;
    let $hora = document.querySelectorAll('.horas');

    for (let i = 0; i < $hora.length; i++) {
        totalHoras += Number($hora[i].value);
    }
    segundos += totalHoras * 3600
   
}

function calcularMinutosASegundos() {
    let totalMinutos = 0;
    const $minutos = document.querySelectorAll('.minutos');

    for (let i = 0; i < $minutos.length; i++) {
        totalMinutos += Number($minutos[i].value);
    }
    segundos += totalMinutos * 60;
    
}

function obtenerSegundos() {
    const $segundos = document.querySelectorAll('.segundos');

    for(let i = 0; i < $segundos.length; i++) {
        segundos += Number($segundos[i].value);
    }

}

function calcularTiempoTotal(segundos) {

    if (segundos !== 0) {

        let hora = (segundos / 3600).toFixed(0);
        let minuto = ((segundos / 60) % 60).toFixed(0);
        let segundo = segundos % 60;

        return `${hora} horas ${minuto} minutos ${segundo} segundos`;
    }
}

function mostrarResultados() {
    let resultado = calcularTiempoTotal(segundos);
    const $textoResultado = document.querySelector('#resultado');
    $textoResultado.textContent = resultado;
}

function borrarResultadosAnteriores() {
    segundos = 0;
}
