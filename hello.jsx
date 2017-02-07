import React from 'react';
import ReactDOM from 'react-dom';
import { Button, 
					Form,
					FormGroup, 
					Label, 
					Input, 
					FormText, 
					Collapse, 
					Modal, 
					ModalHeader, 
					ModalBody, 
					ModalFooter, 
					ListGroup, 
					ListGroupItem 
				} from 'reactstrap';

class RecipeBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			recipes: [],
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.submit = this.submit.bind(this);
		this.remove = this.remove.bind(this);
	}

	open() {
		this.setState({
			modal: true
		})
	}

	close() {
		this.setState({
			modal: false
		})
	}

	submit() {
		var newTitle = document.getElementById('recipeTitle').value;
		var newIngredients = document.getElementById('recipeIngredients').value.trim().split(', ');
		var oldList = this.state.recipes;
		var newEntry = {
			title: newTitle,
			ingredients: newIngredients
		};

		oldList.push(newEntry);

		this.setState({
			modal: false,
			recipes: oldList
		})
	}

	remove(idx, e) {
		var oldList = this.state.recipes;
		var newList = [];

		for (var i = 0; i < oldList.length; i++ ) {
			if (i !== idx) {
				newList.push(oldList[i]);
			}
		}

		this.setState({
			modal: false,
			recipes: newList
		});
	}


	componentDidUpdate() {
		localStorage.setItem( 'state', JSON.stringify(this.state));
	}

	componentWillMount() {
		const recipeStorage = JSON.parse(localStorage.getItem('state'));
		if (recipeStorage != null) {
			this.setState(recipeStorage);
			console.log(recipeStorage);		

		} else {
			this.setState({
				modal: false,
				recipes: [
					{
						title: "Ruben",
						ingredients: ["Rye Bread", "Corned Beef", "Thousand Island", "Swiss Cheese"],
					},
					{
						title: "Monte Cristo",
						ingredients: ["Rye Bread", "Corned Beef", "Thousand Island", "Swiss Cheese"],
					}
				]
			})
		}
	}


	render() {
		return (
			<div className="container">
				<h1>Recipe Box</h1>
				<div className="jumbotron">	
					{this.state.recipes.map((recipe, i) =>
							<Recipe recipe={recipe} key={i} index={i} remove={this.remove}/>
						)}
				</div>

				<Button
					color="primary"
					onClick={this.open}>
					Add Recipe
				</Button>
				
				<Modal isOpen={this.state.modal} toggle={this.close} >
          <ModalHeader toggle={this.close}>Add Recipe</ModalHeader>
          <ModalBody>
          	<RecipeForm />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>Save Recipe</Button>
            <Button color="secondary" onClick={this.close}>Cancel</Button>
          </ModalFooter>
        </Modal>
       
			</div>

		)
	}
}

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false
		}
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse })
	}

	render() {
		return (
			<ListGroup>
				<h1 
					onClick={this.toggle}
					className="ing-title">
					{this.props.recipe.title}
				</h1>
				
					<Collapse isOpen={this.state.collapse}>
						<h5>Ingredients</h5>
						<Button
							color="danger"
							onClick={this.props.remove.bind(this, this.props.index)}
							>
							Delete Recipe
						</Button>
						<p/>
						{this.props.recipe.ingredients.map((ingredient, k) =>
							<ListGroupItem key={k} >{ingredient}</ListGroupItem>
						)}
					</Collapse>
				
			</ListGroup>
		)
	}
}

class RecipeForm extends React.Component {
	render() {
		return (
			<Form>
				<FormGroup>
					<Label for="recipeTitle">Recipe Title</Label>
					<Input type="text" name="recipe" id="recipeTitle" placeholder="ex. Spagetti Bolgnese" />
				</FormGroup>
				<FormGroup>
					<Label for="recipeIngredients">Recipe Title</Label>
					<Input 
						type="textarea" 
						name="recipe"
						id="recipeIngredients" 
						placeholder="Ingredients seperate by a comma. Ex spagetti, meat balls, mushroooms, bolgnese sauce" />
				</FormGroup>
			</Form>
		)
	}
}




ReactDOM.render( <RecipeBox />, document.getElementById('app'));