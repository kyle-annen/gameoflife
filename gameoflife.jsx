import React from 'react';
import ReactDOM from 'react-dom';

class GameOfLife extends React.Component {
	constructor(props) {
		super(props);
		//loop to populate game board
		var temp_board = [];
		for (var i=0; i < 20; i++) {
			var temp_row = [];
			for (var j=0; j < 20; j++) {
				temp_row.push(0);
			}
			temp_board.push(temp_row);
		}
		//set start board as string to keep from linked arrays, has to be better way
		var start_board = JSON.stringify(temp_board);
		this.state = {
			width: 20,
			height: 20,
			board: temp_board,
			start_board: start_board,
			run: false
		};
		//this declarations, need to research why this is nessesary
		this.handleCellClick = this.handleCellClick.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
	}

	//when cell clicked, change cooresponding value in board array to 1
	handleCellClick(cid) {
		if (this.state.run == false) {
			const values = cid.split("-");
			const yval = parseInt(values[1]);
			const xval = parseInt(values[2]);
			var cboard = this.state.board;

			if (cboard[yval][xval] == 0) {
				cboard[yval][xval] = 1
			} else {
				cboard[yval][xval] = 0
			}

			this.setState({
				board: cboard
			})
		}
	}

	//sets all values in board array to 0
	clearBoard() {
		this.setState({
			board: JSON.parse(this.state.start_board),
			run: false
		})
	}

	//value to set state to running
	startGame() {
		this.setState({
			run: true
		})
	}

	stopGame() {
		this.setState({
			run: false
		})
	}



	render() {
		return (
			<div className="board-container">
				<GameBoard 
				board={this.state.board} 
				handleCellClick={this.handleCellClick}
				clearBoard={this.clearBoard}
				startGame={this.startGame}
				stopGame={this.stopGame}/>
			</div>
		)
	}
}

class GameBoard extends React.Component {
	render() {
		return (
			<div className="container">
				<br/>
				<div className="btn-group" role="group" aria-label="Basic example">
					<button 
						type="button" 
						className="btn btn-primary"
						onClick={this.props.startGame}>
						Start
					</button>
					<button 
						className="btn btn-warning"
						onClick={this.props.stopGame}>
						Stop
					</button>
					<button 
						className="btn btn-danger"
						onClick={this.props.clearBoard}>
						Clear Board
					</button>
				</div>
				<br/><br/>
				{this.props.board.map((row, i) => {
					return (
						<GameRow
						row={row} 
						key={i} 
						gamerow={i} 
						handleCellClick={this.props.handleCellClick} />
					) 			
				})}
			</div>
		)
	}
}

class GameRow extends React.Component {
	render() {
		return (
			<div className="row">
				{this.props.row.map((cell, i) => {
					return (
							<div 
								className={"cell-" + cell.toString()} 
								id={"cid-" + this.props.gamerow.toString() + "-" + i.toString() }
								onClick={this.props.handleCellClick.bind(
										null, 
										"cid-" + this.props.gamerow.toString() + "-" + i.toString()
										)
								}
								key={i}>
							</div>
						)
					})
				}
			</div>
		)
	}
}









ReactDOM.render( <GameOfLife />, document.getElementById('app'));