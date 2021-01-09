const game = new Game('game-canvas')
function removeItem(event) {
    const target = event.currentTarget
    target.parentNode.removeChild(target)
}

let roundsCounter = 0

function accScore() {
    const scores = document.getElementById("scores")
    const newScore = document.createElement('p')
    newScore.innerHTML = `${converterRounds()} round : ${game.getScore()} pts`
    scores.appendChild(newScore)
}


function converterRounds() {
    if (roundsCounter === 1) {
        return "First"
    } else if (roundsCounter === 2) {
        return "Second"
    } else if (roundsCounter === 3) {
        return "Third"
    } else if (roundsCounter === 4) {
        return "Fourth"
    } else if (roundsCounter === 5) {
        return "Fith"
    } else if (roundsCounter === 6) {
        return "Sixth"
    } else if (roundsCounter === 7) {
        return "Seventh"
    } else if (roundsCounter === 8) {
        return "Eight"
    } else if (roundsCounter === 9) {
        return "Ninth"
    } else if (roundsCounter === 10) {
        return "Tenth"
    } else {
        return roundsCounter
    }
}

let playAgainBut = document.getElementById("buttonRestart")
let unShow = (element) => element.style.visibility = "hidden"
let hide = (element) => element.style.cursor = "none"
const father = document.getElementById("game")
const son = document.getElementById("game-canvas")



window.addEventListener('load', () => {
    unShow(playAgainBut)
    game.start()
    game.untilStart()

    const addBtn = document.getElementById('start')
    addBtn.addEventListener('click', removeItem)
    addBtn.onclick = () => {
        game.presStart()
        father.style.cursor = "none"
    }

    playAgainBut.addEventListener('click', ()=> {
        father.style.cursor = "none"
        roundsCounter = roundsCounter + 1
        unShow(playAgainBut)
        accScore()
        game.reSet()
        game.presStart()
        //location.reload()
    })
    
    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })
})
