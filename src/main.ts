import './style.css'
import { Game } from './models'

export const canvas = document.getElementById('root') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

const game = new Game(canvas)
game.draw(context)
