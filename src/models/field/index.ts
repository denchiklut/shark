import { canvas, context } from '../shared'
import { Player } from '../player'
import field from './field.png'

const img = new Image()
img.src = field

export class Field {
	private x = 0
	private y = 0

	public draw = (player: Player) => {
		this.x = player.gamePos.x - canvas.width / 2
		this.y = player.gamePos.y - canvas.height / 2

		context.drawImage(
			img,
			this.x,
			this.y,
			canvas.width * 2,
			canvas.height * 2
		)
	}
}
