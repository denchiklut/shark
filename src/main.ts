import './style.css'
import { Player } from './models/player'
import { canvas, context } from './models/shared'
import { Field } from './models/field'
import { getAngle, getMousePos } from './utils'

context.font = '50px Georgia'
canvas.width = 800
canvas.height = 500

const mouse = {
	mouseDown: false
}

const player = new Player()
const field = new Field()

const draw = () => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	field.draw(player)
	player.draw()
	requestAnimationFrame(draw)
}

draw()

canvas.onmousemove = (event: MouseEvent) => {
	if (mouse.mouseDown) {
		const point = player.position
		const cursor = getMousePos(event)
		const ang = getAngle({ point, cursor })

		player.changeAngle(ang)
	}
}

canvas.onclick = () => {
	mouse.mouseDown = true
}
