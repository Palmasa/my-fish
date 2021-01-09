class Toxic {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.vx = NEG_SPEED_fixed

        this.y = y
        this.vy = 0

        this.width = 360 / 4
        this.height = 360 / 4


        this.toxic = new Image ()
        this.toxic.src = './assets/radioactive.png'
        this.toxic.isReady = false
        this.toxic.onload = () => this.toxic.isReady = true
    }

    isReady() {
        return this.toxic.isReady 
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.toxic,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    move() {
        this.x += this.vx
    }
}