const game = new Game('game-canvas')
function removeItem(event) {
    const target = event.currentTarget
    target.parentNode.removeChild(target)
}

function accScore() {
    const scores = document.getElementById("scores")
    const newScore = document.createElement('ol')

    newScore.innerHTML = game.getScore()

    scores.appendChild(newScore)
}

let playAgainBut = document.getElementById("buttonRestart")
let unShow = (element) => element.style.visibility = "hidden"
let hide = (element) => element.style.display = "none"


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
        accScore()
        unShow(playAgainBut)
        //location.reload()
    })
        // const createBut = document.getElementById('restart')
        // createBut.addEventListener('click', () => {
        //     game.start()
        //     game.presStart()
        //     accScore()
        // })
    
    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })
})