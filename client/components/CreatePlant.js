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
            //dispatch to thunk
            // this.props.createPlant({...this.state})
            // this.setState({ name: '', species: '', description: '', careInstructions: '', imageLink: '',  price: '', errorMessage: ''})
        }
    }
    render() {
        const { name, species, description, careInstructions, price, imageLink, errorMessage }
        return (
            <div id="form">
                <Form id="createPlantForm" onSubmit={this.handleSubmit} >
                    {/* name field */}
                    <label htmlFor="name">Name</label>
                    <input name="name" onChange={this.handleChange} value={name}></input>
                    
                    {/* species field */}
                    <label htmlFor="species"></label>
                    <input name="species" onChange={this.handleChange} value={species}></input>
                    
                    {/* description field */}
                    <label htmlFor="description"></label>
                    <input name="description" onChange={this.handleChange} value={description}></input>
                    
                    {/* care instructions field */}
                    <label htmlFor="careInstructions"></label>
                    <input name="careInstructions" onChange={this.handleChange} value={careInstructions}></input>
                    
                    {/* price field */}
                    <label htmlFor="price"></label>
                    <input name="price" onChange={this.handleChange} value={price}></input>
                    
                    {/* image link field */}
                    <label htmlFor="imageLink"></label>
                    <input name="imageLink" onChange={this.handleChange} value={imageLink}></input>
                    
                    {/* error message */}
                    {errorMessage ? <p>{errorMessage}</p> : ''};
                    
                    {/* submit button */}
                    <div>
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        )
    }
}