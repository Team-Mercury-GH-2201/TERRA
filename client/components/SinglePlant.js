import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { Link } from 'react-router-dom';

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.fetchPlant(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h1>Welcome to TERRA - for all your plant friend needs</h1>
        <div></div>
        <div id='navbar' ><span>  Login  </span><span>  Plant Friends  </span><span>  cart  </span></div>
        <ul id="singlePlant">
          <div><strong>Plant Friend Name: {this.props.plant.name}</strong></div>
          <img src={plantObj.imageLink}/>
          <div>Species: {this.props.plant.species}</div>
          <div>About Your Plant Friend: {this.props.plant.description}</div>
          <div>Care: {this.props.plant.careInstructions}</div>
          <div>Price: {this.props.plant.price}</div>
        </ul>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    plant: state.plant
  };
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id))
  };
};


export default connect(mapState, mapDispatch)(SinglePlant);