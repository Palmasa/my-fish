class Prey {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.vx = NEG_SPEED_swimmers
        this.vy = - 0.5

        this.prey = new Image ()
        this.prey.src = '../assets/prey.png'
        this.prey.isReady = false

        // Total frames
        this.prey.horizontalFrames = 12
        this.prey.verticalFrames = 8

        // Estado inicial
        this.prey.horizontalFrameIndex = 9
        this.prey.verticalFrameIndex = 1

        this.prey.onload = () => {
            this.prey.isReady = true

            this.prey.frameWidth = Math.floor(this.prey.width / this.prey.horizontalFrames)
            this.prey.frameHeight = Math.floor(this.prey.height / this.prey.verticalFrames)

            this.width = this.prey.frameWidth * 1.2
            this.height = this.prey.frameHeight * 1.2

            // Máximos (Aquí por width y height)
            this.maxYsurface = 80
            this.maxYfloor = 450 - this.height
        }

        this.prey.drawCount = 0
    }

    isReady() {
        return this.prey.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.prey,
                // Posicion desde la que cortas
                this.prey.horizontalFrameIndex * this.prey.frameWidth,
                this.prey.verticalFrameIndex * this.prey.frameHeight,
                // Cuanto recortas
                this.prey.frameWidth,
                this.prey.frameHeight,
                // Posición
                this.x,
                this.y,
                // Size
                this.width,
                this.height
            )
            this.animate()
            this.prey.drawCount++
        }
    }

    move() {
        this.x += this.vx
        if (this.y <= 80) {
            this.resetAnimation()
            this.y = 80
        }
    }

    animate() {
        if (this.prey.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.prey.horizontalFrameIndex === 11) {
                this.prey.horizontalFrameIndex = 9
            } else {
                this.prey.horizontalFrameIndex++
            }
            this.prey.drawCount = 0
        }
    }

    resetAnimation() {
        this.prey.horizontalFrameIndex = 9
        this.prey.verticalFrameIndex = 1
    }
}

