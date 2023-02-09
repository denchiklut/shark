import { FIELD_HEIGHT, FIELD_WIDTH } from '../shared'
import { Player } from '../player'
import field from './field.png'

const img = new Image()
img.src = field

export class Field {
	public draw = (context: CanvasRenderingContext2D, player: Player) => {
		context.drawImage(
			img,
			player.gamePos.x,
			player.gamePos.y,
			FIELD_WIDTH,
			FIELD_HEIGHT
		)
	}
}
