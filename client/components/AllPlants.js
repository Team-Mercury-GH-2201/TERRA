import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import allPlants from '../store/allPlants'

export class AllPlants extends React.Component {
  componentDidMount() {
    this.props.fetchPlants()
  }
  render() {
    return (
      <div>
        <h1 style='text-align:center'>Welcome to TERRA - for all your plant friend needs</h1>
        <div></div>
        <div id='navbar' style='text-align:right'><span >Login</span><span>Plant Friends</span><span>cart</span></div>
        <ul id="allPlantsView">
          {this.props.plants.map(plantObj => (
            <div className="PlantInfo" key={plantObj.id}>
                <h3>Plant Friend Name: {plantObj.name}</h3>
              <div />
              <img src="https://lh3.googleusercontent.com/h_XMcnkmJ8YaF69F4rhKtFLtGVA3zauAlOcjJHfAn0kpo1UfIyyVym61rHfovPgFIQpiRWfRPcnokafO59Ad1MyC3FvuiSSrGSe5cVgNXhcjoOmTf_eDHOodChWKvX9Yor3NO_TX9A=w600-h315-p-k"/> 
              <div>Species: {plantObj.species}</div>
              <div />
              <div>About Your Plant Friend: {plantObj.description}</div>
              <div />
              <div>Care: {plantObj.care}</div>
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
  return {
    plants: state.plants
  };
};


const mapDispatch = (dispatch) => ({
    fetchPlants: () => dispatch(fetchPlants())
})

export default connect(mapState, mapDispatch)(AllPlants);