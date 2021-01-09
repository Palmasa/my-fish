const KEY_UP = 38
const KEY_SPACE = 32//13
const KEY_DOWN = 40

const MOVEMENT_FRAMES = 10

const SPEED = 7
const NEG_SPEED_swimmers = -9
const NEG_SPEED_fixed = -7

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}

let uno = 60
let dos = 120
let dos5 = 150
let tres = 180
let tres5 = 210
let cuatro = 240
let cuatro5 = 270
let cinco = 300
let seis = 360
let siete = 420
let ocho = 480
let nueve = 540
let diez = 600
let once = 660
let doce = 720
let trece = 780
let catorce = 840
let quince = 900
let dieciseis = 960

// let prey = [uno, dos, cinco]
// let slim = [tres, cuatro, siete]
// let buble = [ocho, catorce]
// let octopus = [seis, nueve]
// let toxic = [ocho, diez]
// let weed = [siete, seis, ocho]
// let boat = [quince, once, siete, doce]

let prey = [uno]
let slim = [tres, cuatro, siete]
let buble = [ocho, catorce]
let octopus = [dos]
let toxic = [dos]
let weed = [siete, seis, ocho]
let boat = [quince, once, siete, doce]

const DRAW_PREY_FRAMES = getRandomElement(prey)
const DRAW_SLIM_FRAMES = getRandomElement(slim)
const DRAW_BUBLE_FRAMES = getRandomElement(buble)
const DRAW_OCTOPUS_FRAMES = getRandomElement(octopus)
const DRAW_TOXIC_FRAMES = getRandomElement(toxic)
const DRAW_WEED_FRAMES = getRandomElement(weed)
const DRAW_BOAT_FRAMES = getRandomElement(boat)

/*
15. 900
16. 960
17. 1020
18. 1080
19. 1140
20. 1200
21. 1260
22. 1320 

function reloadGame() {
    const father = document.getElementById("game")
    const son = document.getElementById("game-canvas")
    
    father.removeChild(son)
    const newCanvas = document.createElement('ol')
    newCanvas.setAttribute("id", "game-canvas")

    father.appendChild(newCanvas)
}

function sendBack() {
    const list = document.getElementById("swapper");
    list.appendChild(list.firstElementChild)

    const but = document.getElementById('start')
    but.innerHTML = 'Play again!'
}

function bringFront() {
    const list = document.getElementById("swapper");
    list.appendChild(list.firstElementChild)

    const butt = document.getElementById('start')
    butt.innerHTML = 'Play!'
}

function setDeadButton() {
    // creación del botón
    const mySpace = document.getElementById("buttons")
    const myRestart = document.createElement('button')

    myRestart.innerHTML = 'Restart'
    myRestart.setAttribute('class', 'yuju')
    myRestart.setAttribute('id', 'restart')

    mySpace.appendChild(myRestart)
}

window.addEventListener('load', () => {
    unShow(playAgainBut)
    game.start()
    game.untilStart()

    const addBtn = document.getElementById('start')
    addBtn.addEventListener('click', removeItem)
    addBtn.onclick = () => {
        game.presStart() 
    }
    playAgainBut.addEventListener('click', ()=> {
        removeItem
        location.reload()
    })

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })
})

*/
