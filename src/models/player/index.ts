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
	public readonly position = {
		x: this.canvas.width / 2,
		y: this.canvas.height / 2
	}
	public gamePos = { x: 0, y: 0 }
	private frameX = 0
	private frameY = 0
	private spriteWidth = 498
	private spriteHeight = 327

	public draw = (context: CanvasRenderingContext2D) => {
		const { canvas, gameField } = this
		const velocityX = this.force * Math.cos(this.angle)
		const velocityY = this.force * Math.sin(this.angle)
		const dx = this.gamePos.x - velocityX
		const dy = this.gamePos.y - velocityY

		if (canMove(dx, gameField.width, canvas.width)) {
			this.gamePos.x -= velocityX
		}

		if (canMove(dy, gameField.height, canvas.height)) {
			this.gamePos.y -= velocityY
		}

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
	}

	public changeAngle = (angle: number) => {
		this.angle = angle
	}
}
