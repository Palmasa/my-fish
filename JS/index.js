const game = new Game('game-canvas')
function removeItem(event) {
    const target = event.currentTarget
    target.parentNode.removeChild(target)
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

function accScore() {
    const scores = document.getElementById("scores")
    const newScore = document.createElement('ol')

    newScore.innerHTML = game.getScore()

    scores.appendChild(newScore)
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

window.addEventListener('load', () => {
    game.start()
    game.untilStart()

    const addBtn = document.getElementById('start')
    addBtn.addEventListener('click', sendBack)
    addBtn.onclick = () => {
        game.presStart() 
    }

    if(false) {
        console.log('yuju')
        bringFront()
        // const createBut = document.getElementById('restart')
        // createBut.addEventListener('click', () => {
        //     game.start()
        //     game.presStart()
        //     accScore()
        // })
    }
    

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })
})