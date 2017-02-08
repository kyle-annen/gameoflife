import React from 'react';
import ReactDOM from 'react-dom';

class GameOfLife extends React.Component {
	constructor(props) {
		super(props);

		var temp_board = [];

		for (var i=0; i < 20; i++) {
			var temp_row = [];
			for (var j=0; j < 20; j++) {
				temp_row.push(0);
			}
			temp_board.push(temp_row);
		}

		this.state = {
			width: 20,
			height: 20,
			board: temp_board
		}
	}




	render() {
		return (
			<div className="container">
				<GameBoard board={this.state.board} />
			</div>
		)
	}
}

class GameBoard extends React.Component {

	render() {
		return (
			{this.props.board.map(row, i)}
		)
	}
}







ReactDOM.render( <GameOfLife />, document.getElementById('app'));