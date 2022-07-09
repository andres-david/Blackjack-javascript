
const miModulo = (() => {
    'use strict'

    let deck         = [];

    const tipos      = ['C','D','H','S'],
          especiales = ['A','J', 'K', 'Q'];

    let puntosJugadores = [];

    //Referencias del HTMl
    const btnPedir            = document.querySelector('#btnPedir'),
          btnDetener          = document.querySelector('#btnDetener'),
          btnNuevo            = document.querySelector('#btnNuevo'),
          sumaPuntos          = document.querySelectorAll('small'),
          divCartasJugadores  = document.querySelectorAll('.divCartas');
          

    //Esta funcion inicializa el juego

    const iniciarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        sumaPuntos.forEach((element) => element.innerText = 0);

        divCartasJugadores.forEach( element => element.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Esta funcion crea una nueva baraja
    const crearDeck = () => {

        deck = [];

        for (let i =2; i<= 10; i++){

            for (let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for ( let tipo of tipos){

            for (let esp of especiales){
                deck.push(esp + tipo)
            }
        }
        return _.shuffle( deck );
    };

    //Esta función me permite tomar una carta

    const pedirCarta = () => {

        if ( deck.length === 0) {

            throw 'no hay cartas en el deck';

        }
        return deck.pop();
        
    }

    //Esta funcion sirve para tener el valor de la carta
    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length-1);

        return (isNaN(valor)) ? 
                (valor === 'A') ? 11 : 10
                : parseInt(valor);

    }

    //Turno: 0 = primer jugador y el último será la computadora

    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        sumaPuntos[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.className = 'carta';
        imgCarta.src = `assets/cartas/${ carta }.png`;
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputador] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputador === puntosMinimos){
                alert('Nadie gana');
            }

            else if ( puntosMinimos > 21 ){
                alert ('La casa gana');
            }
        
            else if ( puntosComputador > 21){
                alert('Has ganado');
            }
            else{
                alert('La casa gana');
            }
            
        }, 500);
    }

    // Turno de la computadora

    const turnoComputador = ( puntosMinimos ) => {

        let puntosComputador = 0;

        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while( (puntosComputador <  puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta         = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21){
            console.log('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputador( puntosJugador);
        }
        else if (puntosJugador === 21){
            console.log('21, Genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputador( puntosJugador);

        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputador(puntosJugadores[0]);

    });

    // btnNuevo.addEventListener('click', () => {

    //     iniciarJuego();

    // });

    return {
        nuevoJuego: iniciarJuego
    };

})();
































