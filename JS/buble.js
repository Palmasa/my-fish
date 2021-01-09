class Buble {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.vx = NEG_SPEED_swimmers
        
        this.y = y
        this.vy = (Math.random() * (-2 - -0.5)) + -0.5

        this.width = 512 / 20
        this.height = 512 / 20


        this.buble = new Image ()
        this.buble.src = './assets/protection-buble.png'
        this.buble.isReady = false
        this.buble.onload = () => this.buble.isReady = true
    }

    isReady() {
        return this.buble.isReady 
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.buble,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    move() {
        this.x += this.vx
        this.y += this.vy
    }
}