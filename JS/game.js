class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')

        this.buttonRestart = document.getElementById("buttonRestart")

        this.canvas.width = 800
        this.canvas.height = 500

        this.drawInterval = undefined
        this.begInterval = undefined
        this.fps = 1000 / 60

        this.beging = false

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
        this.fats = new Image ()
        this.fats.src = '../assets/fats.png'

        const theme = new Audio('../assets/music-background.mp3')
        theme.volume = 0.3
        this.backSound = {
            theme: theme
        }

        this.sound = {
            eat: new Audio('../assets/music-blop.mp3'),
            glu: new Audio('../assets/music-rod.mp3'),
            protectionBuble: new Audio('../assets/bumble.mp3'),
            octopusSplash: new Audio('../assets/splash.mp3'),
            dizzyWeed: new Audio('../assets/mareo.mp3'),
            toxicDead: new Audio('../assets/death.mp3'),

        }
    }

    untilStart() {
        this.fish.actionControl = false
    }
    
    presStart() {
        this.fish.actionControl = true
        this.fish.vx = SPEED
        this.backSound.theme.play() //=> MUSIC HERE!
    }

    reSet() {
        this.clear()
        this.draw()
        this.points = 0
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

    rePaint() {
        
    }

    start() {
        if (!this.drawInterval) {
            this.drawInterval = setInterval(() => {
                this.clear()
                this.move()
                this.draw()
                this.checkCollitions()
                this.checkObstaclesCollisions()
                
                this.drawCountPrey ++
                this.drawCountSlim ++
                this.drawCountBuble ++
                this.drawCountOctopus ++
                this.drawCountToxic ++
                this.drawCountWeed ++
                //this.drawCountBoat ++

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
                    //this.addBoat()
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
        this.fish.draw()

        this.prey.forEach((pre)=>{
            pre.draw()
        })
        this.slim.forEach((sli)=>{
            sli.draw()
        })
        this.bubles.forEach((buble) => {
            buble.draw()
        })

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

        // Points
        this.ctx.save()
        this.ctx.font = 'bold 10px Arial'
        this.ctx.fillText(`SCORE`, 10, 15)
        this.ctx.font = 'bold 18px Arial'
        this.ctx.fillText(`${this.points}`, 50, 15)
        this.ctx.restore()

        // Fats
        this.ctx.save()
        this.ctx.drawImage(
            this.fats,
            this.canvas.width - 1000 / 5.2 + 1,
            -2,
            1000/ 5.2,
            166 / 5.2
        )
        this.ctx.restore()
    }

    getScore() {
        return `${this.points}`
    }

    getHI() {

    }

    move() {
        this.background.seaMove()
        this.fish.move()

        if (this.fish.x === this.fish.maxX) {
            this.points += 1
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
                //boa.seaMove()
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
            Math.floor(Math.random() * (this.canvas.width*2 - this.canvas.width + 78) + this.canvas.width + 78),
            Math.floor(Math.random() * (350 - 80) + 80)
          )
          this.seaweeds.push(seaweed)
        }
    }

    addPrey() {
        if (this.fish.x === this.fish.maxX) {
            const pre = new Prey(
              this.ctx,
              Math.floor(Math.random() * (this.canvas.width*2 - this.canvas.width + 78) + this.canvas.width + 78),
              Math.floor(Math.random() * (350 - 80) + 80)
            )
            this.prey.push(pre)
        }
    }

    addSlim() {
        if (this.fish.x === this.fish.maxX) {
            const sli = new Slim(
              this.ctx,
              Math.floor(Math.random() * (this.canvas.width*2 - this.canvas.width + 78) + this.canvas.width + 78),
              Math.floor(Math.random() * (350 - 80) + 80)
            )
            this.slim.push(sli)
        }
    }

    addBoat() {
        if (this.fish.x === this.fish.maxX) {
            const boa = new Boat(
              this.ctx,
              this.canvas.width + 613 / 4,
              -15
            )
            this.boat.push(boa)
        }
    }

    addOctopus() {
        if (this.fish.x === this.fish.maxX) {
            const oct = new Octopus(
              this.ctx,
              Math.floor(Math.random() * (this.canvas.width*2 - this.canvas.width + 78) + this.canvas.width + 78),
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
        this.green = false
        this.ink = false
        this.crown = false
        //clearInterval(this.drawInterval)
        this.buttonRestart.style.visibility = "visible"
        this.ctx.save()
        this.ctx.fillStyle = 'rgba(194, 244, 255, 0.1)'
        this.ctx.fillRect(this.canvas.width/2 - 150, this.canvas.height/2 - 120, 300, 250)
    
        this.ctx.font = '20px Russo One'
        this.ctx.fillStyle = 'Black'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
          'Game over!',
          this.canvas.width / 2,
          this.canvas.height / 2 - 80,
        )
        this.ctx.font = '20px Russo One'
        this.ctx.fillText(
            `Final score ${this.points}`,
            this.canvas.width / 2,
            this.canvas.height / 2 + 50 -90,
          )
        this.ctx.restore()
    }

    checkCollitions() {
        // Prey collitions
        if (this.prey.some((prey) => this.fish.collidesWith(prey) /*&& prey.x + prey.width*2 > this.ctx.canvas.width/2*/)) { 
            this.collitionsCountPrey = this.collitionsCountPrey + 1
            console.log(this.collitionsCountPrey)

            this.fish.fat()

            this.sound.eat.play()
            setTimeout(() => {
                this.sound.eat.play()
            }, 400)
            
        }
        this.prey = this.prey.filter((prey) => !this.fish.collidesWith(prey))
        if (this.collitionsCountPrey >= 5) {
            this.ink = false
            this.crown = false
            this.fish.fatDead()
        }

        // slim
        if (this.slim.some((sli) => this.fish.collidesWith(sli) /*&& sli.x + sli.width*2 > this.ctx.canvas.width/2*/)) {
            if (this.collitionsCountPrey >=1) {
                this.collitionsCountPrey = 0
                console.log('getting slimmer')
                this.fish.slimmer()
                this.sound.eat.play()
                setTimeout(() => {
                this.sound.eat.play()
                }, 400)
                this.slim = this.slim.filter((sli) => !this.fish.collidesWith(sli))
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
            setTimeout(()=> {
                this.protection = false
            }, 5000)
        }
        this.bubles = this.bubles.filter((buble) => !this.fish.collidesWith(buble))

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
            }, 5000)
        }

        // Toxic death collition
        if (this.toxics.some((toxic) => this.fish.collidesWith(toxic))) {
            console.log('toxicHIT')
            this.fish.toxicDead()
            this.green = true
            this.sound.toxicDead.play()
            
            setTimeout(()=> { // METER ESTO SIEMPRE QUE SE MUERA DEL TODO
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
            }, 4000)
        }
        this.seaweeds = this.seaweeds.filter((weed) => !this.fish.collidesWith(weed))

        // Boat
        if (this.boat.some((boa) => this.fish.collidesWith(boa))) {
            console.log('boatHIT')
            this.fish.toxicDead()
            this.green = true
        }
    }

    checkObstaclesCollisions() {
        // // prey with slim
        // this.slim.forEach((sli) => {
            
        // })
        //     if (this.prey.some((pre) => sli.collidesWith(pre))) {
        //         this.prey = this.prey.filter((prey) => !this.prey.collidesWith(prey))
        //         console.log('collision before screen')
        //     }

        // //slim with prey
        // this.prey.forEach((pre) => {
        //     if (this.prey.some((pre) => sli.collidesWith(pre))) {
        //         this.prey = this.prey.filter((prey) => !this.prey.collidesWith(prey))
        //         console.log('collision before screen')
        //     }
        // })
        
    }
}