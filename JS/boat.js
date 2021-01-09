class Boat {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.vx = NEG_SPEED_fixed

        this.y = y
        this.vy = 0

        this.width = 97 / 3
        this.height = 709 / 3

        this.boat = new Image ()
        this.boat.src = './assets/maRod.png'
        this.boat.isReady = false
        this.boat.onload = () => this.boat.isReady = true

        this.rod = new Image()
        this.rod.src = './assets/maBoat.png'
        this.boat.isReady = false
        this.rod.onload = () => this.rod.isReady = true
    }

    isReady() {
        return this.boat.isReady && this.rod.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.boat,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.ctx.drawImage(
                this.rod,
                this.x - 81,
                this.y - 18,
                249 / 3,
                254 / 3
            )
        }
    }

    seaMove() {
        this.y += this.vy
        if (this.y >= 10) {
          this.vy = -2
        } else if (this.y <= -30) {
          this.vy = 2
        }
    }

    move() {
        this.x += this.vx
    }
}