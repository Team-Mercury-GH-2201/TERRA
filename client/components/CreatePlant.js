import React from 'react';
import { connect } from 'react-redux';
import { createPlant } from '../store/allPlants';

class CreatePlant extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            species: '',
            description: '',
            careInstructions: '',
            imageLink: '',
            price: '',
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event){
        event.preventDefault() ;
        if (!this.state.name || !this.state.species){
            this.setState({ errorMessage: 'You must enter a name and species!' });
        } else {
            this.props.createPlant({...this.state})
            this.setState({ name: '', species: '', description: '', careInstructions: '', imageLink: '',  price: '', errorMessage: ''})
        }
    }
    render() {
        const { name, species, description, careInstructions, price, imageLink, errorMessage } = this.state;
        return (
            <div id="form">
                <form id="createPlantForm" onSubmit={this.handleSubmit} >
                    {/* name field */}
                    <label htmlFor="name">Name: </label>
                    <input name="name" onChange={this.handleChange} value={name}></input>
                    
                    {/* species field */}
                    <label htmlFor="species">Species: </label>
                    <input name="species" onChange={this.handleChange} value={species}></input>
                    
                    {/* description field */}
                    <label htmlFor="description">Description: </label>
                    <input name="description" onChange={this.handleChange} value={description}></input>
                    
                    {/* care instructions field */}
                    <label htmlFor="careInstructions">Care Instructions: </label>
                    <input name="careInstructions" onChange={this.handleChange} value={careInstructions}></input>
                    
                    {/* price field */}
                    <label htmlFor="price">Price: </label>
                    <input name="price" onChange={this.handleChange} value={price}></input>
                    
                    {/* image link field */}
                    <label htmlFor="imageLink">Image Link: </label>
                    <input name="imageLink" onChange={this.handleChange} value={imageLink}></input>
                    
                    {/* error message */}
                    {errorMessage ? <p>{errorMessage}</p> : ''}
                    
                    {/* submit button */}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createPlant: (plant) => dispatch(createPlant(plant))
});

export default connect(null, mapDispatchToProps)(CreatePlant)

