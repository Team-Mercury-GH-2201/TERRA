import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlant, updateAPlant } from "../store/singlePlant";
import { deleteAPlant } from "../store/allPlants";

class EditPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      species: "",
      description: "",
      careInstructions: "",
      imageLink: "",
      price: "",
      errorMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPlant(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.plant.id !== this.props.plant.id) {
      this.setState({
        name: this.props.plant.name || "",
        species: this.props.plant.species || "",
        description: this.props.plant.description || "",
        careInstructions: this.props.plant.careInstructions || "",
        imageLink: this.props.plant.imageLink || "",
        price: this.props.plant.price || "",
        errorMessage: "",
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.name || !this.state.species) {
      this.setState({ errorMessage: "You must enter a name and species!" });
    } else {
      await this.props.updateAPlant({ ...this.props.plant, ...this.state });
    }
  }

  render() {
    const {
      name,
      species,
      description,
      careInstructions,
      imageLink,
      price,
      errorMessage,
    } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div id="form">
        <h2>Edit Your Plant</h2>
        <form id="createPlantForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="plantName">Plant Friend Name:</label>
            <input name="name" onChange={handleChange} value={name} />
          </div>

          <div>
            <label htmlFor="species">Species:</label>
            <input name="species" onChange={handleChange} value={species} />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input
              name="description"
              onChange={handleChange}
              value={description}
            />
          </div>

          <div>
            <label htmlFor="careInstructions">Care Instructions:</label>
            <input
              name="careInstructions"
              onChange={handleChange}
              value={careInstructions}
            />
          </div>

          <div>
            <label htmlFor="imageLink">Image Link:</label>
            <input name="imageLink" onChange={handleChange} value={imageLink} />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input name="price" onChange={handleChange} value={price} />
          </div>

          <div style={{ color: "red" }}>{errorMessage}</div>
          <div id="buttons">
            <button type="submit">Submit Change</button>
            <button
              match={this.props.match}
              history={this.props.history}
              type="button"
              className="remove"
              onClick={() => {
                this.props.deleteAPlant(this.props.plant.id);
              }}
            >
              Delete
            </button>
          </div>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()}></form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  plant: state.plant,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  fetchPlant: (id) => dispatch(fetchPlant(id)),
  updateAPlant: (plant) => dispatch(updateAPlant(plant, history)),
  deleteAPlant: (id) => dispatch(deleteAPlant(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlant);
