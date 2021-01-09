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
let diecisiete = 1020
let dieciocho = 1080
let diecinueve = 1140
let veinte = 1200
let veintiuno = 1260
let veintidos = 1320 

let prey = [uno, dos, uno, uno, dos, cinco]
let slim = [tres, cuatro, tres5, siete]
let buble = [ocho, catorce, cinco, quince, trece, seis, veinte]
let octopus = [quince, veintidos]
let toxic = [siete, catorce, cinco]
let weed = [veinte, seis, diez]
let boat = [veintidos, diecisiete]

const DRAW_PREY_FRAMES = getRandomElement(prey)
const DRAW_SLIM_FRAMES = getRandomElement(slim)
const DRAW_BUBLE_FRAMES = getRandomElement(buble)
const DRAW_OCTOPUS_FRAMES = getRandomElement(octopus)
const DRAW_TOXIC_FRAMES = getRandomElement(toxic)
const DRAW_WEED_FRAMES = getRandomElement(weed)
const DRAW_BOAT_FRAMES = getRandomElement(boat)

