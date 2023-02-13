import { View } from '../../core'
import { Player, Field, Bubble } from '../../models'
import { getAngle, getMousePos } from '../../utils'

export class Game extends View {
	private frame = 0
	private player = new Player()
	private field = new Field()
	private bubbles: Array<Bubble> = []
	private state: 'playing' | 'paused' | 'idle' = 'idle'

	constructor(canvas: HTMLCanvasElement) {
		super()
		canvas.width = this.canvas.width
		canvas.height = this.canvas.height

		canvas.onclick = () => {
			this.state = 'playing'
		}

		canvas.onmousemove = (event: MouseEvent) => {
			if (this.state === 'playing') {
				const point = this.player.position
				const cursor = getMousePos(canvas, event)
				const ang = getAngle({ point, cursor })

				this.player.changeAngle(ang)
			}
		}
	}

	public draw(context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.field.draw(context, this.player)
		this.player.draw(context)
		this.drawBubbles(context)
		this.frame++

		requestAnimationFrame(() => this.draw(context))
	}

	private drawBubbles(context: CanvasRenderingContext2D) {
		const { frame, bubbles, player } = this

		if (frame % 100 === 0) bubbles.push(new Bubble())

		for (let i = 0; i < bubbles.length; i++) {
			bubbles[i].draw(context, player)

			if (bubbles[i].position.y < 0 - bubbles[i].radius) {
				bubbles.splice(i, 1)
				i--
			} else if (
				bubbles[i].distance <
				bubbles[i].radius + player.radius
			) {
				if (bubbles[i]) {
					if (!bubbles[i].counted) player.score++
					bubbles[i].counted = true
					bubbles[i].sound.play()
					bubbles[i].frameX++
					if (bubbles[i].frameX > 7) bubbles[i].pop = true
					if (bubbles[i].pop) bubbles.splice(i, 1)
					i--
				}
			}
		}
	}
}
