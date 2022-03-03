import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlants } from '../store/allPlants';
import CreatePlant from './CreatePlant';

export class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getPlants();
    console.log('component mounted');
  }
  render() {
    const plants = this.props.plants;
    if (!this.props.plants || this.props.plants.length === 0) {
      return <h3> Loading your plants...</h3>;
    }
    return (
      <div>
        <h1>Welcome to TERRA - for all your plant friend needs</h1>
        <div></div>
        <div id="navbar">
          <span>Login</span>
          <span>Plant Friends</span>
          <span>cart</span>
        </div>
        <ul id="allPlantsView">
          {this.props.plants.map((plantObj) => (
            <div className="PlantInfo" key={plantObj.id}>
              <h3>Plant Friend Name: {plantObj.name}</h3>
              <div />
              <img src={plantObj.imageLink} />
              <div>Species: {plantObj.species}</div>
              <div />
              <div>About Your Plant Friend: {plantObj.description}</div>
              <div />
              <div>Care: {plantObj.careInstructions}</div>
              <div />
              <div>Price: {plantObj.price}</div>
            </div>
          ))}
        </ul>
        <div className="createPlant">
          <h2>Add a new plant</h2>
          <CreatePlant/>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.plants,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
  };
};

export default connect(mapState, mapDispatch)(AllPlants);
