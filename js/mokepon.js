const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
sectionReiniciar.style.display = 'none'
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMessage = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesdelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

let mokepones = []
let ataqueJugador
//como esta variable está fuera, todas las funciones de abajo pueden entrar a esta variable
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonFuego.addEventListener('click', ataqueFuego)

    botonAgua.addEventListener('click', ataqueAgua)

    botonTierra.addEventListener('click', ataqueTierra) //Hay que crear las funciones, y luego llamar a la variable global
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

mokepones.push(hipodoge, capipepo, ratigueya)

//Manipular el DOM para popular en HTML; video 50
//absorver la información para popular en HTML

function seleccionarMascotaJugador() { //arriba también se insertó como función pero en parámetro
    
    sectionSeleccionarMascota.style.display = 'none'

    sectionSeleccionarAtaque.style.display = 'flex'//Aquí es donde designamos que se va a aparecer y desaparecer una vez seleccionadas los inputs del usuario

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Tienes que elegir una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, 3)

    if (mascotaAleatoria == 1) {
        //primer enemigo Hipodoge
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatoria == 2) {
        //la mascota es Capipepo
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        //ratigueya -- no hay más posibilidades por ahora
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }

}

function ataqueFuego() {
    ataqueJugador = 'FUEGO' //hasta este punto no hace nada, excepto guardar información. Con un alert hay que indicar cuál fue el que se eligió
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }
    combat()
}

function combat() {

    if (ataqueEnemigo == ataqueJugador) {
        createMessage("EMPATE")
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        createMessage("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        createMessage("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        createMessage("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        createMessage("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    //revisar las vidas
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        //ganamos
        createFinalMessage("GANASTE!!😄")
    } else if (vidasJugador == 0) {
        //PERDIMOS
        createFinalMessage("Perdiste 😬")
    }
}

function createMessage(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMessage.innerHTML = resultado
    ataquesDelJugador.innerHTML = ataqueJugador
    ataquesdelEnemigo.innerHTML = ataqueEnemigo

    sectionMessage.appendChild(nuevoAtaqueDelJugador)
    sectionMessage.appendChild(nuevoAtaqueDelEnemigo)
}

function createFinalMessage(resultadoFinal) {

    sectionMessage.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = 'block' //muestra el boton de reiniciar de nuevo

}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego) //para escuchar a cualquier elemento que cargue al navegador


/*El hashtag # es el selector de Id <section id="seleccionar-mascota">*/