class Fish {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx

        this.x = x
        this.vx = 0

        this.y = y
        this.vy = 0

        this.sprite = new Image ()
        this.sprite.src = '../assets/spritesFish-9.png'
        this.sprite.isReady = false

        this.sprite.drawCount = 0

        this.increase = 1.34
        this.stopMotion = true

        // Total frames
        this.sprite.horizontalFrames = 3
        this.sprite.verticalFrames = 2

        // Estado inicial
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.width = width
        this.height = height

        this.sprite.onload = () => {
        
            this.sprite.isReady = true

            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)

            this.width = this.sprite.frameWidth / 2
            this.height = this.sprite.frameHeight / 2

            // Máximos (Aquí por width y height)
            this.maxX = this.ctx.canvas.width / 2 - this.width 
            this.maxYsurface = 80
            this.maxYfloor = 460 - (this.height - 15)

            this.rectWidth = 91.5 - this.width * 0.37
            this.rectHeight = 75.5 - this.height * 0.42
            this.rectX = this.x + this.width * 0.25 // El cuerpo son 3/4 (75%) del pez en tolal
            this.rectY = this.y + this.height * 0.50 / 2 // cuatro sextos

            //
            this.correctionInkX = 40
            this.correctionInkY = 5
            this.correctionCrownX = 0
        }

        this.movements = {
            up: false,
            down: false,
            space: false
        }

        // Complements obstacles
        this.bubble = new Image ()
        this.bubble.src = '../assets/protection-buble.png'
        this.bubble.isReady = false
        this.bubble.onload = () => this.bubble.isReadyBubble = true

        this.ink = new Image ()
        this.ink.src = '../assets/03TINTA.png'
        this.ink.isReady = false
        this.ink.onload = () => this.bubble.isReadyBubble = true

        this.green = new Image ()
        this.green.src = '../assets/01puffverde.png'
        this.green.isReady = false
        this.green.onload = () => this.bubble.isReadyBubble = true

        // Crown
        this.crown = new Image ()
        this.crown.src = '../assets/dizzy-crown.png'
        this.crown.drawCount = 0
        // Total frames crown
        this.crown.horizontalFrames = 2
        this.crown.verticalFrames = 1
        // Estado inicial crown
        this.crown.horizontalFrameIndex = 0
        this.crown.verticalFrameIndex = 0
        this.crown.frameWidth = Math.floor(this.crown.width / this.crown.horizontalFrames)
        this.crown.frameHeight = Math.floor(this.crown.height / this.crown.verticalFrames)
        this.widthCrown = this.crown.frameWidth / 2.4
        this.heightCrown = this.crown.frameHeight / 2.4

        // Obstacles init
        this.collitions = true
        this.actionControl = true
        this.goOctopusSlow = false
        this.goDizzy = false
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if (this.isReady()) {
            // Rectangle
            this.ctx.save()
            this.ctx.fillStyle = 'rgba(225,225,225,0.1)'
            this.ctx.fillRect(
            this.rectX,
            this.rectY,
            this.rectWidth,
            this.rectHeight
            )
            this.ctx.restore()
            
            // Fish
            this.ctx.drawImage(
                this.sprite,
                // Posicion desde la que cortas
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                // Cuanto recortas
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                // Posición
                this.x,
                this.y,
                // Size
                this.width,
                this.height
            )
            this.animate()
            this.sprite.drawCount++
        }
    }

    drawBuble() {
            this.ctx.save()
            this.ctx.globalAlpha = 0.4
            this.ctx.drawImage(
                this.bubble,
                this.x - 8,
                this.y - 15,
                this.width + 18,
                this.width + 18
            )
            this.ctx.restore()
    }

    drawInk() {
        this.ctx.save()
        this.ctx.drawImage(
            this.ink,
            this.x + this.correctionInkX,
            this.y + this.correctionInkY,
            this.width / 2 + 20,
            this.width / 2 + 20
        )
        this.ctx.restore()
    }

    drawGreen() { 
        this.ctx.save()
        this.ctx.globalAlpha = 0.5
        this.ctx.drawImage(
            this.green,
            this.x - 60,
            this.y - 60,
            this.width + 120,
            this.width + 110
        )
        this.ctx.restore()
    }

    drawCrown() {
        this.ctx.drawImage(
            this.crown,
            // Posicion desde la que cortas
            this.crown.horizontalFrameIndex * this.crown.frameWidth,
            this.crown.verticalFrameIndex * this.crown.frameHeight,
            // Cuanto recortas
            this.crown.frameWidth,
            this.crown.frameHeight,
            // Posición
            this.x + this.correctionCrownX,
            this.y - 30,
            // Size
            this.widthCrown,
            this.heightCrown
        )
         this.animateCrown()
         this.crown.drawCount++
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown'
        switch (event.keyCode) {
            case KEY_UP:
                this.movements.up = status
                break;
            case KEY_DOWN:
                this.movements.down = status
                break;
            case KEY_SPACE:
                this.movements.start = status
        }
    }

    move() {
        // Key movements
        if (this.movements.down && this.actionControl) {
            this.vy = SPEED
        } else if (this.movements.up && this.actionControl) {
            this.vy = - SPEED
        } // Freno
            else { 
                // this.vy = 0 
            }
        
        if (this.goDizzy) {
            if (this.movements.down) {
                this.vy = -SPEED
            } else if (this.movements.up) {
                this.vy = SPEED
            }
        }

        if (this.goOctopusSlow) {
            if (this.movements.down) {
                this.vy = SPEED / 4
            } else if (this.movements.up) {
                this.vy = -SPEED / 4
            }
        }
        // Fixed movements
        // if (this.movements.start) {
        //     this.vx = SPEED
        //     
        // }

        this.x += this.vx
        this.y += this.vy
        this.rectX += this.vx
        this.rectY += this.vy

        // Limits
        if (this.y >= this.maxYfloor) {
            this.y = this.maxYfloor
            this.rectY = this.maxYfloor + this.height * 0.50 / 2
            this.vy = 0
        } else if (this.y <= this.maxYsurface) {
            this.y = this.maxYsurface
            this.rectY = this.maxYsurface + this.height * 0.50 / 2
            this.vy = 0
        }
        if (this.x >= this.maxX) {
            this.x = this.maxX
            this.rectX = this.maxX + this.width * 0.25
            this.vx = 0
        }
    }

    fat() {
        this.sprite.horizontalFrameIndex = 2
        this.sprite.verticalFrameIndex = 0
        // Lo que hace que no avance
        this.x = this.maxX - 1
        this.vy = 0
        this.y = this.y
        this.actionControl = false
        // this.rectX = this.maxX - 1 + this.width * 0.25

        setTimeout(()=> {
            this.collitions = false
            this.sprite.horizontalFrameIndex = 2
            this.sprite.verticalFrameIndex = 0
        }, 200)

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2
            this.sprite.verticalFrameIndex = 0
        }, 400)

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2//0
            this.sprite.verticalFrameIndex = 1//0
        }, 600)
        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2
            this.sprite.verticalFrameIndex = 0
        }, 800)
        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2//0
            this.sprite.verticalFrameIndex = 1//0
        }, 600)

        setTimeout(()=> {
            this.resetAnimation()

            this.width *= this.increase
            this.height *= this.increase

            this.rectWidth *= this.increase
            this.rectHeight *= this.increase

            this.rectX = this.x + this.width * 0.25
            this.rectY = this.y + this.height * 0.50 / 2

            this.maxYfloor = 460 - (this.height - 15 * this.increase)
            this.maxX = this.ctx.canvas.width / 2 - this.width

            this.correctionInkX += 20
            this.correctionInkY += 5
            this.correctionCrownX = 10//((this.width * this.increase) - this.width)/2
            this.widthCrown *= this.increase
            this.heightCrown *= this.increase
        }, 1000)

        setTimeout(()=> {
            this.actionControl = true
            this.vx = SPEED // al inicio es con el keydown del espacio, hay que ractivarlo
            this.move()
        }, 1300)

        setTimeout(()=>{
            this.collitions = true
        }, 1500)
    }

    slimmer() {
        this.sprite.horizontalFrameIndex = 2
        this.sprite.verticalFrameIndex = 0
        // Lo que hace que no avance
        this.x = this.maxX - 1
        this.vy = 0
        this.y = this.y
        this.actionControl = false
        // this.rectX = this.maxX - 1 + this.width * 0.25

        setTimeout(()=> {
            this.collitions = false
            this.sprite.horizontalFrameIndex = 2
            this.sprite.verticalFrameIndex = 0
        }, 200)

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2
            this.sprite.verticalFrameIndex = 0
        }, 400)

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2//0
            this.sprite.verticalFrameIndex = 1//0
        }, 600)
        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2
            this.sprite.verticalFrameIndex = 0
        }, 800)
        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 2//0
            this.sprite.verticalFrameIndex = 1//0
        }, 600)

        setTimeout(()=> {
            this.resetAnimation()

            this.width = this.sprite.frameWidth / 2
            this.height = this.sprite.frameHeight / 2

            this.rectWidth = 91.5 - this.width * 0.37
            this.rectHeight = 75.5 - this.height * 0.42
            this.rectX = this.x + this.width * 0.25 // El cuerpo son 3/4 (75%) del pez en tolal
            this.rectY = this.y + this.height * 0.50 / 2 // cuatro sextos

            this.maxX = this.ctx.canvas.width / 2 - this.width 
            this.maxYsurface = 80
            this.maxYfloor = 460 - (this.height - 15)
            this.x = this.maxX - 1

            //
            this.correctionCrownX = 0
            this.widthCrown = this.crown.frameWidth / 2.4
            this.heightCrown = this.crown.frameHeight / 2.4
            this.correctionInkX = 40
            this.correctionInkY = 5
        }, 1000)

        setTimeout(()=> {
            this.actionControl = true
            this.vx = SPEED
            this.move()
        }, 1200)

        setTimeout(()=>{
            this.collitions = true
        }, 1500)
    }

    fatDead() {
        this.stopMotion = false
        this.sprite.horizontalFrameIndex = 2
        this.sprite.verticalFrameIndex = 0
        this.collitions = false
        this.actionControl = false
        this.vy = 0
        this.y = this.y
        this.x = this.ctx.canvas.width / 2 - this.width - 1
        this.rectX = this.x + this.width * 0.25
        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 0
            this.sprite.verticalFrameIndex = 1
        }, 1000)

        setTimeout(()=> {
            this.width -= this.width/8
            this.height -= this.height/8
        }, 200)

        setTimeout(()=> {
            this.width += this.width/8
            this.height += this.height/8
        }, 300)

        setTimeout(()=> {
            this.width -= this.width/8
            this.height -= this.height/8
        }, 400)
        setTimeout(()=> {
            this.width += this.width/8
            this.height += this.height/8
        }, 500)
        setTimeout(()=> {
            this.width -= this.width/8
            this.height -= this.height/8
        }, 600)
        setTimeout(()=> {
            this.width += this.width/8
            this.height += this.height/8
        }, 700)

        setTimeout(()=> {
            this.width -= this.width/8
            this.height -= this.height/8
        }, 800)
        setTimeout(()=> {
            this.width += this.width/8
            this.height += this.height/8
        }, 900)
        setTimeout(()=> {
            this.width -= this.width/8
            this.height -= this.height/8
        }, 1000)

        setTimeout(()=> {
            this.vy += 2
            this.maxYfloor = this.ctx.canvas.height + this.rectHeight * 3
        }, 2000)
    }

    protected() {
        setTimeout(()=> {
            this.collitions = false
        }, 100)
        setTimeout(()=> {
            this.collitions = true
        }, 4500)
    }

    slowOctopus() {
        this.actionControl = false
        this.goOctopusSlow = true
        //this.vy = 0
        this.y = this.y
        setTimeout(()=> {
            this.actionControl = true
            this.goOctopusSlow = false
            this.move()
        }, 5000)
    }

    dizzy() {
        this.actionControl = false
        this.goDizzy = true
        setTimeout(()=> {
            this.actionControl = true
            this.goDizzy = false
            this.move()
        }, 5000)
    }

    toxicDead() {
        this.stopMotion = false
        this.collitions = false
        this.actionControl = false
        this.vy = 0
        this.y = this.y
        this.sprite.horizontalFrameIndex = 1
        this.sprite.verticalFrameIndex = 1
        
        this.x = this.ctx.canvas.width / 2 - this.width - 1
        this.rectX = this.x + this.width * 0.25

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 1
            this.sprite.verticalFrameIndex = 1
            this.vy += 1
            this.maxYfloor = this.ctx.canvas.height + this.rectHeight * 3
        }, 1500) 

    }

    rodDead() {
        this.stopMotion = false
        this.collitions = false
        this.actionControl = false
        this.vy = 0
        this.y = this.y
        this.sprite.horizontalFrameIndex = 1
        this.sprite.verticalFrameIndex = 1

        
        this.x = this.ctx.canvas.width / 2 - this.width - 1
        this.rectX = this.x + this.width * 0.25

        setTimeout(()=> {
            this.sprite.horizontalFrameIndex = 1
            this.sprite.verticalFrameIndex = 1
            this.vy += - 2
            this.maxYfloor = 60
        }, 1500) 

    }

    animate() {
        if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.sprite.horizontalFrameIndex === 1) {
                this.sprite.horizontalFrameIndex = 0
            } else if (this.stopMotion) {
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    resetAnimation() {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
    }

    animateCrown() {
        if (this.crown.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.crown.horizontalFrameIndex === 1) {
                this.crown.horizontalFrameIndex = 0
            } else {
                this.crown.horizontalFrameIndex++
            }
        }
    }

    collidesWith(element) {
        return this.collitions && this.rectX < element.x + element.width &&
        this.rectX + this.rectWidth > element.x &&
        this.rectY < element.y + element.height &&
        this.rectY + this.rectHeight > element.y
    }
}