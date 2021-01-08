class Seaweed {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.vx = NEG_SPEED_fixed + 1
        this.vy = - 0.5

        this.weed = new Image ()
        this.weed.src = '../assets/seaWeed-1.png'
        this.weed.isReady = false

        // Total frames
        this.weed.horizontalFrames = 5
        this.weed.verticalFrames = 8

        // Estado inicial
        this.weed.horizontalFrameIndex = 3
        this.weed.verticalFrameIndex = 0

        this.weed.onload = () => {
            this.weed.isReady = true

            this.weed.frameWidth = Math.floor(this.weed.width / this.weed.horizontalFrames)
            this.weed.frameHeight = Math.floor(this.weed.height / this.weed.verticalFrames)

            this.width = this.weed.frameWidth
            this.height = this.weed.frameHeight

            // Máximos (Aquí por width y height)
            this.maxYsurface = 80
            this.maxYfloor = 450 - this.height
        }

        this.weed.drawCount = 0
    }

    isReady() {
        return this.weed.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.weed,
                // Posicion desde la que cortas
                this.weed.horizontalFrameIndex * this.weed.frameWidth,
                this.weed.verticalFrameIndex * this.weed.frameHeight,
                // Cuanto recortas
                this.weed.frameWidth,
                this.weed.frameHeight,
                // Posición
                this.x,
                this.y,
                // Size
                this.width,
                this.height
            )
            this.animate()
            this.weed.drawCount++
        }
    }

    move() {
        this.x += this.vx
        // ToDo: continue fixed movement sea
        if (this.y <= 80) {
            this.resetAnimation()
            this.y = 80
        }
    }

    animate() {
        if (this.weed.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.weed.verticalFrameIndex === 7) {
                this.weed.verticalFrameIndex = 0
            } else {
                this.weed.verticalFrameIndex++
            }
            this.weed.drawCount = 0
        }
    }

    resetAnimation() {
        this.weed.horizontalFrameIndex = 3
        this.weed.verticalFrameIndex = 0
    }
}