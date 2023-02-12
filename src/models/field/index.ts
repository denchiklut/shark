import { View } from '../../core'
import { Player } from '../player'
import field from './field.png'

const img = new Image()
img.src = field

export class Field extends View {
	public draw = (context: CanvasRenderingContext2D, player: Player) => {
		const { canvas, gameField } = this

		context.save()
		context.translate(
			canvas.width / 2 - gameField.width / 2,
			canvas.height / 2 - gameField.height / 2
		)
		context.drawImage(
			img,
			player.gamePos.x,
			player.gamePos.y,
			gameField.width,
			gameField.height
		)
		context.restore()
	}
}
