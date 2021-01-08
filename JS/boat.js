class Boat {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.vx = NEG_SPEED_fixed

        this.y = y
        this.vy = 0

        this.width = 613 / 4
        this.height = 1167 / 4


        this.rod = new Image ()
        this.rod.src = '../assets/03.png'
        this.rod.isReady = false
        this.rod.onload = () => this.rod.isReady = true
    }

    isReady() {
        return this.rod.isReady 
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.rod,
                this.x,
                this.y,
                this.width,
                this.height
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