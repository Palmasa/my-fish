class Octopus {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.vx = NEG_SPEED_swimmers
        
        this.y = y
        this.vy = 0.1
        this.ay = 0.1

        this.octopus = new Image ()
        this.octopus.src = '../assets/octopus.png'
        this.octopus.isReady = false

         // Total frames
         this.octopus.horizontalFrames = 4
         this.octopus.verticalFrames = 3
 
         // Estado inicial
         this.octopus.horizontalFrameIndex = 0
         this.octopus.verticalFrameIndex = 0
 
         this.octopus.onload = () => {
             this.octopus.isReady = true
 
             this.octopus.frameWidth = Math.floor(this.octopus.width / this.octopus.horizontalFrames)
             this.octopus.frameHeight = Math.floor(this.octopus.height / this.octopus.verticalFrames)
 
             this.width = this.octopus.frameWidth /2
             this.height = this.octopus.frameHeight /2
 
             // Máximos (Aquí por width y height)
             this.maxYsurface = 80
             this.maxYfloor = 450 - this.height
         }
 
         this.octopus.drawCount = 0
    }

    isReady() {
        return this.octopus.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.octopus,
                // Posicion desde la que cortas
                this.octopus.horizontalFrameIndex * this.octopus.frameWidth,
                this.octopus.verticalFrameIndex * this.octopus.frameHeight,
                // Cuanto recortas
                this.octopus.frameWidth,
                this.octopus.frameHeight,
                // Posición
                this.x,
                this.y,
                // Size
                this.width,
                this.height
            )
            this.animate()
            this.octopus.drawCount++
        }
    }

    move() {
        this.x += this.vx

        this.vy += this.ay
        this.y += this.vy

        if (this.y + this.height >= 500) {
        this.y = 500 - this.height
        this.vy *= -1
        }
        
    }

    animate() {
        if (this.octopus.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.octopus.verticalFrameIndex === 2) {
                this.octopus.verticalFrameIndex = 0
            } else {
                this.octopus.verticalFrameIndex++
            }
            this.octopus.drawCount = 0
        }
    }
}