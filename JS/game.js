class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')

        this.buttonRestart = document.getElementById("buttonRestart")
        this.father = document.getElementById("game")

        this.canvas.width = 800
        this.canvas.height = 500

        this.beging = false

        this.drawInterval = undefined
        this.begInterval = undefined
        this.fps = 1000 / 60

        this.drawCount = 0
        this.drawCountPrey = 0
        this.drawCountSlim = 0
        this.drawCountBuble = 0
        this.drawCountOctopus = 0
        this.drawCountToxic = 0
        this.drawCountWeed = 0
        this.drawCountBoat = 0

        this.collitionsCountPrey = 0
        this.protection = false
        this.ink = false
        this.green = false
        this.crown = false
        

        this.background = new Background(this.ctx)
        this.prey = []
        this.slim = []
        this.bubles = []
        this.seaweeds = []
        this.boat = []
        this.octopus = []
        this.toxics = []
        this.fish = new Fish(this.ctx, 10, this.canvas.height / 2 - 50)

        this.points = 0
        this.startPoints = false

        const theme = new Audio('./assets/music-background.mp3')
        theme.volume = 0.2
        this.backSound = {
            theme: theme
        }

        this.sound = {
            eat: new Audio('./assets/music-blop.mp3'),
            glu: new Audio('./assets/music-rod.mp3'),
            protectionBuble: new Audio('./assets/bumble.mp3'),
            offProtection: new Audio('./assets/Bubbles-4s.mp3'),
            octopusSplash: new Audio('./assets/splash.mp3'),
            dizzyWeed: new Audio('./assets/mareo.mp3'),
            toxicDead: new Audio('./assets/death.mp3'),
            boatComming: new Audio('./assets/Music-boat.mp3')
        }
    }

    untilStart() {
        this.fish.actionControl = false
    }
    
    presStart() {
        this.fish.actionControl = true
        this.fish.vx = SPEED
        this.backSound.theme.play() //=> MUSIC HERE!
        this.startPoints = true
    }

    reSet() {
        this.clear()
        this.draw()
        this.collitionsCountPrey = 0
        this.points = 0
        this.startPoints = false
        this.prey = []
        this.slim = []
        this.bubles = []
        this.seaweeds = []
        this.boat = []
        this.octopus = []
        this.toxics = []
        this.fish = ''
        this.fish = new Fish(this.ctx, 10, this.canvas.height / 2 - 50)
    }

    start() {
        if (!this.drawInterval) {
            this.drawInterval = setInterval(() => {
                this.clear()
                this.move()
                this.draw()
                this.checkCollitions()
                
                this.drawCountPrey ++
                this.drawCountSlim ++
                this.drawCountBuble ++
                this.drawCountOctopus ++
                this.drawCountToxic ++
                this.drawCountWeed ++
                this.drawCountBoat ++

                if (this.drawCountPrey % DRAW_PREY_FRAMES === 0) {
                    this.addPrey()
                    this.drawCountPrey = 0
                }
                if (this.drawCountSlim % DRAW_SLIM_FRAMES === 0) {
                    this.addSlim()
                    this.drawCountSlim = 0
                }
                if (this.drawCountBuble % DRAW_BUBLE_FRAMES === 0) {
                    this.addBuble()
                    this.drawCountBuble = 0
                }
                if (this.drawCountOctopus % DRAW_OCTOPUS_FRAMES === 0) {
                    this.addOctopus()
                    this.drawCountOctopus = 0
                }
                if (this.drawCountToxic % DRAW_TOXIC_FRAMES === 0) {
                    this.addToxic()
                    this.drawCountToxic = 0
                }
                if (this.drawCountWeed % DRAW_WEED_FRAMES === 0) {
                    this.addSeaweed()
                    this.drawCountWeed = 0
                }
                if (this.drawCountBoat % DRAW_WEED_FRAMES === 0) {
                    this.addBoat()
                    this.drawCountBoat = 0
                }
            }, this.fps)
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.prey = this.prey.filter((prey) => prey.x >= -prey.width)
        this.slim = this.slim.filter((sli) => sli.x >= -sli.width)
        this.bubles = this.bubles.filter((buble) => buble.x >= -buble.width)
        this.seaweeds = this.seaweeds.filter((weed) => weed.x >= -weed.width)
        this.boat = this.boat.filter((boat) => boat.x >= -boat.width)
        this.octopus = this.octopus.filter((oct) => oct.x >= -oct.width)
        this.toxics = this.toxics.filter((tox) => tox.x >= -tox.width)
    }


    draw() {
        this.background.draw()

        // Obstacles
        this.prey.forEach((pre) => {
            pre.draw()
        })
        this.slim.forEach((sli) => {
            sli.draw()
        })
        this.bubles.forEach((buble) => {
            buble.draw()
        })
        this.seaweeds.forEach((seaweed) => {
            seaweed.draw()
        })

        this.boat.forEach((boa) => {
            boa.draw()
        })
        this.octopus.forEach((oct) => {
            oct.draw()
        })
        this.toxics.forEach((tox) => {
            tox.draw()
        })

        this.fish.draw()

        // Accesories
        if (this.protection) {
            this.fish.drawBuble()
        }
        if (this.ink) {
            this.fish.drawInk()
        }
        if (this.green) {
            this.fish.drawGreen()
        }
        if (this.crown) {
            this.fish.drawCrown()
        }

        if (this.startPoints) {
            this.points +=1
        }
        // Points
        this.ctx.save()
        // this.ctx.font = 'bold 10px Arial'
        // this.ctx.fillText(`SCORE`, 10, 15)
        this.ctx.font = 'bold 18px Arial'
        this.ctx.fillText(`${this.points}`, 0, 15)
        this.ctx.restore()
    }

    getScore() {
        return `${this.points}`
    }

    move() {
        this.background.seaMove()
        this.fish.move()

        if (this.fish.x === this.fish.maxX) {
            this.background.move()
            this.prey.forEach((pre) => {
                pre.move()
            })
            this.slim.forEach((sli)=>{
                sli.move()
            })
            this.bubles.forEach((buble) => {
                buble.move()
            })
            this.seaweeds.forEach((seaweed) => {
                seaweed.move()
            })
            this.boat.forEach((boa) => {
                boa.move()
            })
            this.octopus.forEach((oct) => {
                oct.move()
            })
            this.toxics.forEach((tox) => {
                tox.move()
            })
        }
    }

    onKeyEvent(event) {
        this.fish.onKeyEvent(event)
    }

    addSeaweed() {
        if (this.fish.x === this.fish.maxX) {
          const seaweed = new Seaweed(
            this.ctx,
            Math.floor(Math.random() * (this.canvas.width * 2 - this.canvas.width + 78) + this.canvas.width + 78),
            Math.floor(Math.random() * (350 - 80) + 80)
          )
          this.seaweeds.push(seaweed)
        }
    }

    addPrey() {
        if (this.fish.x === this.fish.maxX) {
            const predator = new Prey(
              this.ctx,
              Math.floor(Math.random() * (this.canvas.width * 2 - this.canvas.width + 78) + this.canvas.width + 78),
              Math.floor(Math.random() * (350 - 80) + 80)
            )
            this.prey.push(predator)
        }
    }

    addSlim() {
        if (this.fish.x === this.fish.maxX) {
            const slimme = new Slim(
              this.ctx,
              Math.floor(Math.random() * (this.canvas.width * 2 - this.canvas.width + 78) + this.canvas.width + 78),
              Math.floor(Math.random() * (350 - 80) + 80)
            )
            this.slim.push(slimme)
        }
    }

    addBoat() {
        if (this.fish.x === this.fish.maxX) {
            const boa = new Boat(
              this.ctx,
              this.canvas.width * 2,
              20
            )
            this.boat.push(boa)
        }
    }

    addOctopus() {
        if (this.fish.x === this.fish.maxX) {
            const oct = new Octopus(
              this.ctx,
              Math.floor(Math.random() * (this.canvas.width * 2 - this.canvas.width + 78) + this.canvas.width + 78),
              Math.floor(Math.random() * (350 - 80) + 80)
            )
            this.octopus.push(oct)
        }
    }

    addToxic() {
        if (this.fish.x === this.fish.maxX) {
            const toxic = new Toxic(
              this.ctx,
              this.canvas.width,
              480 - 360/4
            )
            this.toxics.push(toxic)
        }
    }

    addBuble() {
        if (this.fish.x === this.fish.maxX) {
            const buble = new Buble(
              this.ctx,
              this.canvas.width + 100,
              this.canvas.height - 50
            )
            this.bubles.push(buble)
        }
    }

    die() {
        this.fish.stopMotion = false
        this.green = false
        this.ink = false
        this.crown = false
        this.protection = false
        this.buttonRestart.style.visibility = "visible"
        father.style.cursor = "auto"
        // clearInterval(this.drawInterval)
        // 
        // this.ctx.save()
        // this.ctx.fillStyle = 'rgba(194, 244, 255, 0.1)'
        // this.ctx.fillRect(this.canvas.width/2 - 150, this.canvas.height/2 - 120, 300, 250)

        // this.ctx.font = '20px Russo One'
        // this.ctx.fillStyle = 'Black'
        // this.ctx.textAlign = 'center'
        // this.ctx.fillText(
        //   'Game over!',
        //   this.canvas.width / 2,
        //   this.canvas.height / 2 - 80,
        // )
        // this.ctx.font = '20px Russo One'
        // this.ctx.fillText(
        //     `Final score ${this.points}`,
        //     this.canvas.width / 2,
        //     this.canvas.height / 2 + 50 -90,
        //   )
        // this.ctx.restore()
    }

    checkCollitions() {
        // Prey collitions
        if (this.prey.some((prey) => this.fish.collidesWith(prey) && prey.x + prey.width*4 > this.ctx.canvas.width/2)) { 
            console.log(this.collitionsCountPrey)
            if (this.collitionsCountPrey === 0 || this.collitionsCountPrey === 1 || this.collitionsCountPrey === 2 || this.collitionsCountPrey === 3 || this.collitionsCountPrey === 4) {
                this.collitionsCountPrey = this.collitionsCountPrey + 1
                this.fish.fat()
                this.sound.eat.play()
                setTimeout(() => {
                this.sound.eat.play()
            }, 400)
            } else if (this.collitionsCountPrey === 5) {
                this.fish.fatDead()
                this.fish.stopMotion = false
                this.fish.collitions = false
                this.green = false
                this.ink = false
                this.crown = false
                this.protection = false
                this.startPoints = false
                this.sound.eat.play()
                setTimeout(() => {
                    this.sound.eat.play()
                    this.prey = []
                }, 1000)
                setTimeout(()=> { 
                    this.die()
                }, 5000)
            }
            this.prey = this.prey.filter((prey) => !this.fish.collidesWith(prey))
        }
        
        // Slim Collition
        if (this.slim.some((sli) => this.fish.collidesWith(sli) && sli.x + sli.width*4 > this.ctx.canvas.width/2)) {
            if (this.collitionsCountPrey >=1) {
                console.log('getting slimmer')
                this.fish.slimmer()
                this.sound.eat.play()
                setTimeout(() => {
                this.sound.eat.play()
                this.collitionsCountPrey = 0
                }, 400)
                this.slim = this.slim.filter((sl) => !this.fish.collidesWith(sl))
            }
            if (this.collitionsCountPrey === 0) {
                this.sound.glu.play()
            } 
        }

        // Protection Buble collition
        if (this.bubles.some((buble) => this.fish.collidesWith(buble))) {
            console.log('protection')
            this.fish.protected()
            this.protection = true
            this.ink = false
            this.crown = false
            this.sound.protectionBuble.play()
            this.sound.offProtection.play()
            setTimeout(()=> {
                this.protection = false
            }, 4500)
        }
        this.bubles = this.bubles.filter((bu) => !this.fish.collidesWith(bu))
        

         // Octopus ink collitions
         if (this.octopus.some((octopu) => this.fish.collidesWith(octopu))) {
            console.log('octopusHIT')
            this.fish.slowOctopus()
            this.sound.octopusSplash.play()
            this.ink = true
            setTimeout(()=> {
                this.background.vx = NEG_SPEED_fixed
                this.boat.vx = NEG_SPEED_fixed
                this.toxics.vx = NEG_SPEED_fixed
                this.ink = false
            }, 3000)
        }

        // Toxic death collition
        if (this.toxics.some((toxic) => this.fish.collidesWith(toxic))) {
            console.log('toxicHIT')
            this.fish.toxicDead()
            this.green = true
            this.sound.toxicDead.play()
            this.ink = false
            this.crown = false
            this.protection = false
            this.fish.stopMotion = false
            this.fish.collitions = false
            this.startPoints = false
            setTimeout(()=> {
                this.die()
            }, 5000)
        }

        // Seaweed dizzy collition
        if (this.seaweeds.some((weed) => this.fish.collidesWith(weed))) {
            console.log('get dizzzy')
            this.crown = true
            this.fish.dizzy()
            this.sound.dizzyWeed.play()
            setTimeout(()=> {
                this.crown = false
            }, 3000)
        }
        this.seaweeds = this.seaweeds.filter((weed) => !this.fish.collidesWith(weed))

        // Boat dead collition
        if (this.boat.some((boa) => this.fish.collidesWith(boa))) {
            console.log('rodHIT')
            this.fish.rodDead()
            this.green = false
            this.ink = false
            this.crown = false
            this.protection = false
            this.fish.stopMotion = false
            this.sound.toxicDead.play()
            this.sound.boatComming.play()
            this.fish.collitions = false
            this.startPoints = false
            setTimeout(()=> {
                this.die()
            }, 4000)
        }
    }
}