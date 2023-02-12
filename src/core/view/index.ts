import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	FIELD_HEIGHT,
	FIELD_WIDTH
} from '../../utils'

export abstract class View {
	canvas = {
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	}
	gameField = {
		width: FIELD_WIDTH,
		height: FIELD_HEIGHT
	}

	public abstract draw(
		context: CanvasRenderingContext2D,
		...args: unknown[]
	): void
}
