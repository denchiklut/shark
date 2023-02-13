import { View } from '../../core'
import right from './assets/fish-swim-right.png'
import left from './assets/fish-swim-left.png'
import { canMove } from '../../utils'

const playerLeft = new Image()
playerLeft.src = left

const playerRight = new Image()
playerRight.src = right

export class Player extends View {
	private angle = 0
	private force = 3
	public radius = 50
	public score = 0
	public readonly position = {
		x: this.canvas.width / 2,
		y: this.canvas.height / 2
	}
	public readonly gamePos = { x: 0, y: 0 }
	public readonly velocity = { x: 0, y: 0 }
	private spriteFrame = 0
	private gameFrame = 0
	private frameX = 0
	private frameY = 0
	private spriteWidth = 498
	private spriteHeight = 327

	public draw(context: CanvasRenderingContext2D) {
		let atan = Math.atan(this.angle)
		if (atan > 0) atan *= -1

		context.save()
		context.translate(this.position.x, this.position.y)
		context.rotate(this.angle)
		context.translate(-this.position.x, -this.position.y)
		context.drawImage(
			atan > -1 ? playerRight : playerLeft,
			this.frameX * this.spriteWidth,
			this.frameY * this.spriteHeight,
			this.spriteWidth,
			this.spriteHeight,
			this.position.x - 60,
			this.position.y - 45,
			this.spriteWidth / 4,
			this.spriteHeight / 4
		)
		context.restore()
		context.font = '50px Georgia'
		context.fillStyle = 'black'
		context.fillText(`Score: ${this.score}`, 10, 50)

		this.move()
		this.animate()
	}

	public changeAngle(angle: number) {
		this.angle = angle
	}

	private move() {
		const { canvas, gameField } = this
		const velocityX = this.force * Math.cos(this.angle)
		const velocityY = this.force * Math.sin(this.angle)
		const dx = this.gamePos.x - velocityX
		const dy = this.gamePos.y - velocityY

		if (canMove(dx, gameField.width, canvas.width)) {
			this.gamePos.x -= velocityX
			this.velocity.x = velocityX
		} else {
			this.velocity.x = 0
		}

		if (canMove(dy, gameField.height, canvas.height)) {
			this.gamePos.y -= velocityY
			this.velocity.y = velocityY
		} else {
			this.velocity.y = 0
		}
	}

	private animate() {
		if (this.gameFrame % 16 === 0) {
			this.spriteFrame = this.spriteFrame < 11 ? this.spriteFrame + 1 : 0
			this.frameX = this.spriteFrame % 4
			this.frameY = Math.floor(this.spriteFrame / 4)
		}

		this.gameFrame++
	}
}
