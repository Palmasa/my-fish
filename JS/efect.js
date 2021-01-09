class Efect {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.vx = 0
        this.vy = 0

        this.front = new Image ()
        this.front.src = '../assets/prey.png'

        // Total frames
        this.front.horizontalFrames = 12
        this.front.verticalFrames = 8

        // Estado inicial front
        this.front.horizontalFrameIndex = 9
        this.front.verticalFrameIndex = 0

        this.front.frameWidth = Math.floor(this.front.width / this.front.horizontalFrames)
        this.front.frameHeight = Math.floor(this.front.height / this.front.verticalFrames)

        this.width = this.front.frameWidth
        this.height = this.front.frameHeight

        this.front.drawCount = 0
    }

    draw() {
            this.ctx.drawImage(
                this.front,
                // Posicion desde la que cortas
                this.front.horizontalFrameIndex * this.front.frameWidth,
                this.front.verticalFrameIndex * this.front.frameHeight,
                // Cuanto recortas
                this.front.frameWidth,
                this.front.frameHeight,
                // Posición
                this.x,
                this.y,
                // Size
                this.width,
                this.height
            )
            this.animate()
            this.front.drawCount++
    }

    crazy() {
        return Math.floor(Math.random() * (this.ctx.canvas.width + 20 - (-this.ctx.canvas.width + 20)) + (-this.ctx.canvas.width + 20))
    }

    move() {
        this.x += this.crazy()
        this.y += this.crazy()
    }

    animate() {
        if (this.front.drawCount % MOVEMENT_FRAMES === 0) {
            if (this.front.horizontalFrameIndex === 11) {
                this.front.horizontalFrameIndex = 9
            } else {
                this.front.horizontalFrameIndex++
            }
            this.front.drawCount = 0
        }
    }

    resetAnimation() {
        this.front.horizontalFrameIndex = 9
        this.front.verticalFrameIndex = 1
    }
}