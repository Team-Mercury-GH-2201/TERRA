import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { deleteAPlant } from '../store/allPlants';
import { Link } from 'react-router-dom';
import EditPlant from './EditPlant';
import Navbar from './Navbar'

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.fetchPlant(this.props.match.params.id);
  }
  render() {
    console.log(this.props.users)
    return (
      <div>
        <Navbar />
        <div></div>
        <ul id="singlePlant">
          <div><strong>Plant Friend Name: {this.props.plant.name}</strong></div>
          <img src={this.props.plant.imageLink} />
          <div>Species: {this.props.plant.species}</div>
          <div>About Your Plant Friend: {this.props.plant.description}</div>
          <div>Care: {this.props.plant.careInstructions}</div>
          <div>Price: {this.props.plant.price}</div>
        </ul>
        <button>Add to Cart</button>
        <div>
          <EditPlant match={this.props.match} history={this.props.history} />
          <span>
            <button
              match={this.props.match}
              history={this.props.history}
              type="button"
              className="remove"
              onClick={() => this.props.deleteAPlant(this.props.plant.id)}
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    plant: state.plant,
  };
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id)),
    deleteAPlant: (id) => dispatch(deleteAPlant(id, history)),
  };
};


export default connect(mapState, mapDispatch)(SinglePlant);