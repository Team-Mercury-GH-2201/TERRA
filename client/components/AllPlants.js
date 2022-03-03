import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPlants} from '../store/allPlants'

export class AllPlants extends React.Component {
  
  componentDidMount() {
    console.log('what are my prop', this.props)
    this.props.getPlants()
    console.log('component mounted')
  }
  render() {
    const plants = this.props.plants;
    if (!this.props.plants || this.props.plants.length === 0) {
      return <h3> Loading your plants...</h3>;
    }
    console.log('these are the plants', plants)
    return (
      <div>
        <h1>Welcome to TERRA - for all your plant friend needs</h1>
        <div></div>
        <ul id="allPlantsView">
          {this.props.plants.map(plantObj => (
            <div className="PlantInfo" key={plantObj.id}>
                <h3><Link to={`/plant-friends/${plantObj.id}`}> Plant Friend Name: {plantObj.name}</Link></h3>
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
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('here is state', state)
  return {
    plants: state.plants
  };
};


const mapDispatch = (dispatch) => {
  return {
    getPlants: () => dispatch(fetchPlants())
  }
}

export default connect(mapState, mapDispatch)(AllPlants);