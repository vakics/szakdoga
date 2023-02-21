import React, { useEffect, useRef, useState } from "react"
import { Header } from "../components/Header"
import '../css/game.css'
import useInterval from "../components/game/UseInterval"
import { Button, Modal } from "react-bootstrap"

const canvasX = 1000
const canvasY = 500
const initialTrain = [ [ 2, 5 ], [ 2, 5 ] ]
const initialStation = [ 7, 5 ]
const scale = 30
const timeDelay = 200

export const Game=()=>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [ train, setTrain ] = useState(initialTrain)
	const [ station, setStation ] = useState(initialStation)
	const [ direction, setDirection ] = useState([ 0, -1 ])
	const [ delay, setDelay ] = useState<number | null>(null)
	const [ gameOver, setGameOver ] = useState(false)
	const [ score, setScore ] = useState(0)

	useInterval(() => runGame(), delay)

	useEffect(
		() => {
			let stat = document.getElementById("station") as HTMLCanvasElement
			let loc = document.getElementById("locomotive") as HTMLCanvasElement
			let car = document.getElementById("carrige") as HTMLCanvasElement
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					let length=train.length
					train.forEach(([ x, y ]) =>{
						if(direction[0]===1 && direction[1]===0){
							if((train[0][0]===x && train[0][1]===y)){
								ctx.drawImage(loc,x, y, 1.5, 1)
							}
							if((train[length-1][0]===x && train[length-1][1]===y)){
								ctx.drawImage(loc,x-2.5, y, 1.5, 1)
							}
						}
						if(direction[0]===-1 && direction[1]===0){
							if((train[0][0]===x && train[0][1]===y)){
								ctx.drawImage(loc,x-2.5, y, 1.5, 1)
							}
							if((train[length-1][0]===x && train[length-1][1]===y)){
								ctx.drawImage(loc,x, y, 1.5, 1)
							}
						}
						if(direction[0]===0 && direction[1]===1){
							if((train[0][0]===x && train[0][1]===y)){
								ctx.drawImage(loc,x-1, y+1, 1.5, 1)
							}
							if((train[length-1][0]===x && train[length-1][1]===y)){
								ctx.drawImage(loc,x-1, y-1, 1.5, 1)
							}
						}
						if(direction[0]===0 && direction[1]===-1){
							if((train[0][0]===x && train[0][1]===y)){
								ctx.drawImage(loc,x-1, y-1, 1.5, 1)
							}
							if((train[length-1][0]===x && train[length-1][1]===y)){
								ctx.drawImage(loc,x-1, y+1, 1.5, 1)
							}
						}
						ctx.drawImage(car,x-1, y, 1, 1)
						
					})
					ctx.drawImage(stat, station[0], station[1], 1, 1)
				}
			}
		},
		[ train, station, gameOver ]
	)

	function handleSetScore() {
		if (score > Number(localStorage.getItem("highScore"))) {
			localStorage.setItem("highScore", JSON.stringify(score))
		}
	}

	function play() {
		setTrain(initialTrain)
		setStation(initialStation)
		setDirection([ 1, 0 ])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
	}

	function checkCollision(head: number[]) {
		if((head[0]<0 || head[0]* scale >= canvasX) || (head[1]<0 || head[1]* scale >= canvasY)) return true
		for (const s of train) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function stationReached(newTrain: number[][]) {
		let coord = station.map(() => Math.floor(Math.random() * canvasY / scale))
		if (newTrain[0][0] === station[0] && newTrain[0][1] === station[1]) {
			let newStation = coord
			setScore(score + 1)
			setStation(newStation)
			return true
		}
		return false
	}

	function runGame() {
		const newTrain = [ ...train ]
		const newLocomotive = [ newTrain[0][0] + direction[0], newTrain[0][1] + direction[1] ]
		newTrain.unshift(newLocomotive)
		if (checkCollision(newLocomotive)) {
			setDelay(null)
			setGameOver(true)
			handleSetScore()
		}
		if (!stationReached(newTrain)) {
			newTrain.pop()
		}
		setTrain(newTrain)
	}

	function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				setDirection([ 0, 1 ])
				break
		}
	}

	return (
		<div className="game-container">
            <Header/>
            <div onKeyDown={(e) => changeDirection(e)} className="game">
				<img src={require("../images/trains/Bpost_82_29.png")} id="carrige" />
				<img src={require("../images/trains/M32.png")} id="locomotive" />
                <img id="station" src={require("../images/station.png")} width="30" />
				{gameOver && 
				<Modal show={gameOver} className="gameover" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton onClick={()=>setGameOver(false)}>
					  <Modal.Title>Game over</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div>Vesztettél!</div>
						<div>Pontjaid száma {score}</div>
					</Modal.Body>
					<Modal.Footer>
					  <Button variant="light" onClick={()=>setGameOver(false)}>
						Bezárás
					  </Button>
					</Modal.Footer>
				</Modal>}
                <canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
				<button onClick={play} className="playButton">
					Játék
				</button>
            </div>
			<div className="scoreBox">
				<h2>Pontok: {score}</h2>
				<h2>High Score: {localStorage.getItem("highScore")}</h2>
			</div>	
        </div>
	)
}