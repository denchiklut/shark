import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	FIELD_HEIGHT,
	FIELD_WIDTH
} from '../shared'
import { Player } from '../player'
import field from './field.png'

const img = new Image()
img.src = field

export class Field {
	public draw = (context: CanvasRenderingContext2D, player: Player) => {
		context.save()
		context.translate(
			CANVAS_WIDTH / 2 - FIELD_WIDTH / 2,
			CANVAS_HEIGHT / 2 - FIELD_HEIGHT / 2
		)
		context.drawImage(
			img,
			player.gamePos.x,
			player.gamePos.y,
			FIELD_WIDTH,
			FIELD_HEIGHT
		)
		context.restore()
	}
}
