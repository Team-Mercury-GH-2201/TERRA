import React from 'react';

class CreatePlant extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            species: '',
            description: '',
            careInstructions: '',
            price: null, //confirm what starting point should be here
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){}
    handleSubmit(event){}
    render() {
        return (
            <Form id="createPlantForm" onSubmit={this.handleSubmit} >
                <label></label>
                <input></input>
                <label></label>
                <input></input>
                <label></label>
                <input></input>
                <label></label>
                <input></input>
                <label></label>
                <input></input>
            </Form>
        )
    }
}