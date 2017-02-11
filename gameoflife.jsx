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
		this.gameLoop = this.gameLoop.bind(this);
		this.randomizeBoard = this.randomizeBoard.bind(this);
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

	gameLoop() {
		if (this.state.run) {
			console.log("Starting Game Loop")
			//define shorthand for board in state
			const iboard = this.state.board;
			//define a copy of the game board
			var gb = JSON.parse(JSON.stringify(iboard));
			//loop through each row
			for (var y=0; y < 20; y++) {
				//loop through each cell
				for (var x=0; x < 20; x++) {

					//define an array to push neighbor cell values (N,S,E,W)
					var n = [];
					//define a variable for the count of neighbors that are alive
					var ncount = 0;

					//push the value of all neighbor cells to the array
					if (y > 0 && x > 0 && x < 19 && y < 19) {
						iboard[y-1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x-1] == 1 ? ncount += 1 : ncount +=0;
					} else if (y == 0 && x == 0) {
						iboard[y][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x] == 1 ? ncount += 1 : ncount +=0;
					} else if (y == 0 && x == 19) {
						iboard[y+1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x-1] == 1 ? ncount += 1 : ncount +=0;
					} else if (y == 19 && x == 19) {
						iboard[y-1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x-1] == 1 ? ncount += 1 : ncount +=0;
					} else if (y == 19 && x == 0) {
						iboard[y-1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x+1] == 1 ? ncount += 1 : ncount +=0;
					} else if (y == 0) {
						iboard[y][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x-1] == 1 ? ncount += 1 : ncount +=0;
					} else if ( y == 19) {
						iboard[y-1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x-1] == 1 ? ncount += 1 : ncount +=0;
					} else if (x == 0) {
						iboard[y-1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x+1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x] == 1 ? ncount += 1 : ncount +=0;
					} else if (x == 19) {
						iboard[y-1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x] == 1 ? ncount += 1 : ncount +=0;
						iboard[y+1][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y][x-1] == 1 ? ncount += 1 : ncount +=0;
						iboard[y-1][x-1] == 1 ? ncount += 1 : ncount +=0;
					}

					

					//loop with for game rules

					//if alive 
					if (iboard[y][x] === 1) {
						//if fewer than or equal to 2 neighbors, cell dies
						if (ncount < 2) {
							gb[y][x] = 0;
							//if 2-3 nieghbors, survives
						} else if (ncount > 1 && ncount < 4) {
							gb[y][x] = 1;
							//if there are 4 neighbors, cell dies
						} else {
							gb[y][x] = 0;
						}
					}
					//if cell is alive and has 3 neighbors, cell is alive by reproduction
					if(iboard[y][x] === 0 && ncount === 3) {
						gb[y][x] = 1;
					}
				}
			}
			console.log("finish conditionals");
			this.setState({
				board: gb
			})
			console.log("finish setstate in Game Loop");
		}
	}

	randomizeBoard() {
		if (!this.state.run) {
			var randBoard = [];
			for (var y=0; y < 20; y++) {
				var brow = [];
				for (var x=0; x < 20; x++) {
					brow.push(Math.floor(Math.random() * 2));
				}
				randBoard.push(brow);
			}
			this.setState({
				board: randBoard
			})
		}
	}

	componentDidMount() {
		this.randomizeBoard();
		setInterval(this.gameLoop, 300);
	}


	render() {
		return (
			<div className="board-container">
				<GameBoard 
				board={this.state.board} 
				handleCellClick={this.handleCellClick}
				clearBoard={this.clearBoard}
				startGame={this.startGame}
				stopGame={this.stopGame}
				randomizeBoard={this.randomizeBoard}/>
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
					<button
						className="btn btn-secondary"
						onClick={this.props.randomizeBoard}>
						Randomize Board
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