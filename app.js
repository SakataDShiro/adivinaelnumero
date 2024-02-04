// Variables
let numeroMaximo = 100
let listaNumerosSorteados = [];
let intentos = 1;
let limiteIntentos = 5;
let booleanoBotones = false;
let numeroSecreto = asignarNumeroSecreto();
//Definir numeroDelUsuario antes



console.log(`Secreto ${numeroSecreto}`);

mensajesIniciales()

function mensajesIniciales(){
    asignarTextoElemento('h1', 'Adivina el número');
    asignarTextoElemento('p', `Escribe un número del 1 al ${numeroMaximo}`);
    
}

function asignarTextoElemento(elemento, texto) {
    //elemento HTML va a ser asignado a un texto definido en el HTML, por ejemplo h1 o p
    let elementoHTML = document.querySelector(elemento);
    //El contenido de HTML va a ser, en este caso, lo que diga texto
    elementoHTML.innerHTML = texto;
    //detiene la ejecución de la función el return y da un valor
    return;
}

function asignarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(`NS ${numeroGenerado}`);
    if (listaNumerosSorteados.includes(numeroGenerado)) {
        console.log("Está en la lista");
        if (numeroMaximo == listaNumerosSorteados.length) {
            console.log("Te acabaste los números");
            asignarTextoElemento("p", "Se han sorteado todos los números, presione Nuevo Juego para reiniciar la lista de números secretos")
            listaNumerosSorteados = [];
            document.getElementById('botonReiniciar').removeAttribute('disabled');
            document.getElementById('botonIntentar').setAttribute('disabled', true);
        }
        else {
            return asignarNumeroSecreto();
        }
            
    }
    else {
        console.log("No está en la lista")
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }

    
}

function verificarIntento() {
    let numeroDelUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(numeroDelUsuario);
    console.log(numeroSecreto);
    
    if (numeroDelUsuario == numeroSecreto) {
        asignarTextoElemento('p', `¡Ganaste! Lo lograste en ${intentos } ${intentos == 1 ? 'intento' : 'intentos'}. El número era ${numeroSecreto}.`);
        document.getElementById('botonReiniciar').removeAttribute('disabled');
        document.getElementById('botonIntentar').setAttribute('disabled', true);
    }
    if (numeroDelUsuario != numeroSecreto) {
        if (numeroDelUsuario > numeroSecreto) {
            asignarTextoElemento('p', `¡Fallaste! Es más pequeño que ${numeroDelUsuario}. Tienes ${limiteIntentos - intentos} ${limiteIntentos - intentos == 1 ? 'intento' : 'intentos'}`); 
        }
        if (numeroDelUsuario < numeroSecreto) {
            asignarTextoElemento('p', `¡Fallaste! Es más grande que ${numeroDelUsuario}. Tienes ${limiteIntentos - intentos} ${limiteIntentos - intentos == 1 ? 'intento' : 'intentos'}`); 
        }
        intentos++;
    if (intentos > limiteIntentos) {
        asignarTextoElemento('p', `¡Perdiste! El número era ${numeroSecreto}`)
        listaNumerosSorteados = [];
            document.getElementById('botonReiniciar').removeAttribute('disabled');
            document.getElementById('botonIntentar').setAttribute('disabled', true);

    }
    }
    limpiarCaja();
    return;
}



function limpiarCaja () {
    //Selecciona ID desde query selector con el #
    /*let valorCaja = document.querySelector('#valorUsuario');
    //value define el valor del querySelector
    valorCaja.value = '';*/
    document.querySelector('#valorUsuario').value = '';
    
}


function reiniciarJuego() {
    mensajesIniciales()
    intentos = 1;
    document.getElementById('botonReiniciar').setAttribute('disabled', true);
    document.getElementById('botonIntentar').removeAttribute('disabled');
    numeroSecreto = asignarNumeroSecreto();
}
