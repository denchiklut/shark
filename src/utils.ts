import { canvas } from './models/shared'

interface Point {
	x: number
	y: number
}

interface Props {
	point: Point
	cursor: Point
}

export const canMove = (playerPos: number, field: number, canvas: number) => {
	return Math.abs(playerPos) < (field - canvas) / 2
}

export const getAngle = ({ point, cursor }: Props) => {
	return Math.atan2(cursor.y - point.y, cursor.x - point.x)
}

export const getMousePos = (evt: MouseEvent) => {
	const rect = canvas.getBoundingClientRect()
	const marginTop = Number(canvas.style.marginTop)

	const x = evt.clientX - rect.left
	const y = evt.clientY - rect.top - marginTop

	return { x, y }
}

export const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getDistance = (i: Point, f: Point) => {
	return Math.abs(Math.sqrt(Math.pow(f.x - i.x, 2) + Math.pow(f.y - i.y, 2)))
}

export const cirCollission = (
	x1: number,
	y1: number,
	r1: number,
	x2: number,
	y2: number,
	r2: number
) => {
	return getDistance({ x: x1, y: y1 }, { x: x2, y: y2 }) < r1 + r2
}
