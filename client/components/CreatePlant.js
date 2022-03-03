import React from 'react';

class CreatePlant extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            species: '',
            description: '',
            careInstructions: '',
            imageLink: '',
            price: 0, //confirm what starting point should be here
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
        event.preventDefault();

    }
    render() {
        const { name, species, description, careInstructions, price, imageLink }
        return (
            <Form id="createPlantForm" onSubmit={this.handleSubmit} >
                <label htmlFor="name">Name</label>
                <input name="name" onChange={this.handleChange} value={name}></input>
                <label htmlFor="species"></label>
                <input name="species" onChange={this.handleChange} value={species}></input>
                <label htmlFor="description"></label>
                <input name="description" onChange={this.handleChange} value={description}></input>
                <label htmlFor="careInstructions"></label>
                <input name="careInstructions" onChange={this.handleChange} value={careInstructions}></input>
                <label htmlFor="price"></label>
                <input name="price" onChange={this.handleChange} value={price}></input>
                <label htmlFor="imageLink"></label>
                <input name="imageLink" onChange={this.handleChange} value={imageLink}></input>
            </Form>
        )
    }
}