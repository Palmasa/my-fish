class Slim {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.vx = NEG_SPEED_swimmers
        this.vy = - 0.5

        this.slim = new Image ()
        this.slim.src = './assets/prey.png'
        this.slim.isReady = false

        // Total frames
        this.slim.horizontalFrames = 12
        this.slim.verticalFrames = 8

        // Estado inicial
        this.slim.horizontalFrameIndex = 6
        this.slim.verticalFrameIndex = 5

        this.slim.onload = () => {
            this.slim.isReady = true

            this.slim.frameWidth = Math.floor(this.slim.width / this.slim.horizontalFrames)
            this.slim.frameHeight = Math.floor(this.slim.height / this.slim.verticalFrames)

            this.width = this.slim.frameWidth * 1.2
            this.height = this.slim.frameHeight * 1.2

            // Máximos (Aquí por width y height)
            this.maxYsurface = 80
            this.maxYfloor = 450 - this.height
        }

        this.slim.drawCount = 0
    }

    isReady() {
        return this.slim.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.slim,
                // Posicion desde la que cortas
                this.slim.horizontalFrameIndex * this.slim.frameWidth,
                this.slim.verticalFrameIndex * this.slim.frameHeight,
                // Cuanto recortas
                this.slim.frameWidth,
                this.slim.frameHeight,
                // Posición
                this.x,
                this.y,
                // Size
                this.width,
                this.height
            )
            this.animate()
            this.slim.drawCount++
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
        if (this.slim.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.slim.horizontalFrameIndex === 8) {
                this.slim.horizontalFrameIndex = 6
            } else {
                this.slim.horizontalFrameIndex++
            }
            this.slim.drawCount = 0
        }
    }

    resetAnimation() {
        this.slim.horizontalFrameIndex = 6
        this.slim.verticalFrameIndex = 5
    }
}