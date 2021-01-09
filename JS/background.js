class Background {
    constructor(ctx) {
        this.ctx = ctx
        // SEA positions, size and speed
        this.x = 0
        this.y = 0
        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height
        this.vx = NEG_SPEED_fixed

        this.imgSea = new Image()
        this.imgSea.src = './assets/bg-fx-6.png'
        this.imgSea.isReady = false
        this.imgSea.onload = () => this.imgSea.isReady = true

        // FLOOR positions, size and speed
        this.floorX = 0
        this.floorY = 460
        this.floorWidth = this.ctx.canvas.width
        this.floorHeight = this.ctx.canvas.height - 450
        this.vy = 0.1

        this.imgFloor = new Image()
        this.imgFloor.src = './assets/floor.png'
        this.imgFloor.isReady = false
        this.imgFloor.onload = () => this.imgFloor.isReady = true
    
    }

    isReady() {
        return this.imgSea.isReady && this.imgFloor.isReady
    }

    draw() {
        if (this.isReady()) {
            // SEA
            this.ctx.drawImage(
                this.imgSea,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.ctx.drawImage(
              this.imgSea,
              this.x + this.width,
              this.y,
              this.width,
              this.height
            )

            // FLOOR
            this.ctx.drawImage(
                this.imgFloor,
                this.floorX,
                this.floorY,
                this.floorWidth,
                this.floorHeight
            )
            this.ctx.drawImage(
              this.imgFloor,
              this.floorX + this.floorWidth,
              this.floorY,
              this.floorWidth,
              this.floorHeight
            )
        }
    }

    seaMove() {
        this.y += this.vy
        if (this.y >= 0) {
          this.vy = - 0.1
        } else if (this.y <= -10) {
          this.vy = 0.1
        }
    }

    move() {
        this.x += this.vx
        this.floorX += this.vx

        if (this.x + this.width <= 0) {
            this.x = 0
            this.floorX = 0
        }
    }
}