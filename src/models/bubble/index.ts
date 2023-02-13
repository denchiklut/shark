import { View } from '../../core'
import { Player } from '../player'
import image from './bubble-pop.png'
import sound1 from './sound1.ogg'
import sound2 from './sound2.ogg'

const img = new Image()
img.src = image

export class Bubble extends View {
	public score = 0
	public readonly radius = 50
	private speed = Math.random() * 2
	public distance = 0
	public counted = false
	public frameX = 0
	private spriteWidth = 91
	private spriteHeight = 91
	public pop = false
	public sound = new Audio(Math.random() <= 0.5 ? sound1 : sound2)
	public readonly position = {
		x: Math.random() * this.gameField.width,
		y: Math.random() * this.gameField.height + this.gameField.height
	}

	public draw(context: CanvasRenderingContext2D, player: Player) {
		this.position.x -= player.velocity.x
		this.position.y -= player.velocity.y + this.speed

		this.checkCollisions(player)
		context.drawImage(
			img,
			this.frameX * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.position.x - 68,
			this.position.y - 68,
			this.spriteWidth * 1.5,
			this.spriteHeight * 1.5
		)
	}

	private checkCollisions(player: Player) {
		const dx = this.position.x - player.position.x
		const dy = this.position.y - player.position.y

		this.distance = Math.sqrt(dx ** 2 + dy ** 2)
	}
}
