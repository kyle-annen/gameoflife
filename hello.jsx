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
			recipes: [
				{
					title: "Ruben",
					ingredients: ["Rye Bread", "Corned Beef", "Thousand Island", "Swiss Cheese"],
				},
				{
					title: "Monte Cristo",
					ingredients: ["Rye Bread", "Corned Beef", "Thousand Island", "Swiss Cheese"],
				}
			],
		};
	this.open = this.open.bind(this);
	this.close = this.close.bind(this);
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


	render() {
		return (
			<div className="container">
				<h1>Recipe Box</h1>
				<div className="jumbotron">
					{this.state.recipes.map((recipe) =>
							<Recipe recipe={recipe} />
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
            <Button color="primary" onClick={this.close}>Save Recipe</Button>
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
							color="danger">
							Delete Recipe
						</Button>
						<p/>
						{this.props.recipe.ingredients.map((ingredient) =>
							<ListGroupItem>{ingredient}</ListGroupItem>
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