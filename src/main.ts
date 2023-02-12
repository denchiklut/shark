import './style.css'
import { Player, Field } from './models'
import { getAngle, getMousePos, CANVAS_HEIGHT, CANVAS_WIDTH } from './utils'

export const canvas = document.getElementById('root') as HTMLCanvasElement
export const context = canvas.getContext('2d') as CanvasRenderingContext2D

context.font = '50px Georgia'
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const mouse = {
	mouseDown: false
}

const player = new Player()
const field = new Field()

const draw = () => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	field.draw(context, player)
	player.draw(context)
	requestAnimationFrame(draw)
}

draw()

canvas.onmousemove = (event: MouseEvent) => {
	if (mouse.mouseDown) {
		const point = player.position
		const cursor = getMousePos(canvas, event)
		const ang = getAngle({ point, cursor })

		player.changeAngle(ang)
	}
}

canvas.onclick = () => {
	mouse.mouseDown = true
}
