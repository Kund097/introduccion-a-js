//TAREA: En otro archivo distinto,
// Crear una lista de <ol> y <li> que contengan sólo números.
// Convertir esos números a un array y:
// 1. calcular el promedio y mostrarlo en un <em> pre-creado con el texto "El promedio es..."
// 2. obtener el número más pequeño y mostrarlo en un <em> pre-creado con el texto "El número más pequeño es..."
// 3. obtener el número más grande y mostrarlo en un <em> pre-creado con el texto "El número más grande es..."
// 4. obtener el número que más se repite y mostrarlo en un <em> pre-creado con el texto "El número más frecuente es..."


const $botonCalcular = document.querySelector('#calcular');

$botonCalcular.onclick = function() {
    obtenerArray();
    mostrarTextoResultados('promedio',calcularPromedio(numerosObtenidos));
    mostrarTextoResultados('menor',calcularMenor(numerosObtenidos));
    mostrarTextoResultados('mayor',calcularMayor(numerosObtenidos));
    mostrarTextoResultados('frecuente',calcularMasFrecuente(numerosObtenidos));
}


let numerosObtenidos = [];
function obtenerArray() {
    const $numeros = document.querySelectorAll('.numero');
    for (let i = 0; i < $numeros.length; i++) {
        numerosObtenidos.push(Number($numeros[i].textContent));
    }
    return numerosObtenidos;
}

function calcularPromedio(numeros) {
    let resultadoPromedio;
    let sumaTotalArray = 0;
    for (let i = 0; i < numeros.length; i++) {
        sumaTotalArray += numeros[i];
    }
    resultadoPromedio = (sumaTotalArray / numeros.length).toFixed(2);
    return resultadoPromedio;
}

function calcularMenor(numeros) {
    let auxiliar =numeros[0];
    let menor;
    for (let i = 0; i < numeros.length; i++) {
        if(auxiliar < numeros[i]) {
            menor = auxiliar;
        } else {
            auxiliar = numeros[i];
            menor = numeros[i];
        }
    }
    return menor;
}

function calcularMayor(numeros) {
    let mayor = numeros[0];
    for (let i = 0; i < numeros.length; i++) {
        if(mayor < numeros[i]) {
            mayor = numeros[i];
        } 
    }
    return mayor;
}

function calcularMasFrecuente(numeros) {
    let contadorRepetidos = 0;
    let primerElemento = numeros[0];
    let posicionRepetido;
    let masFrecuente = 0;
    for (let i = 0; i < numeros.length; i++) {
        if (primerElemento === numeros[0]) {
            contadorRepetidos++
            posicionRepetido = i;
        }
    }
    let masRepetido = 0;
    let posicionMasrepetido = 0;
    if (masRepetido < contadorRepetidos) {
        masRepetido = contadorRepetidos
        posicionMasrepetido = posicionRepetido;
    }

    masFrecuente = numeros[posicionMasrepetido];
    return masFrecuente;
}
function mostrarTextoResultados(posicion,resultado) {
    document.querySelector(`#${posicion}`).textContent = `El ${posicion} es: ${resultado}`
}