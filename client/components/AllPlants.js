import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlants } from "../store/allPlants";
import CreatePlant from "./CreatePlant";
import Navbar from "./Navbar";

export class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getPlants();
  }
  render() {
    const plants = this.props.plants;
    if (!this.props.plants || this.props.plants.length === 0) {
      return <h3> Loading your plants...</h3>;
    }
    return (
      <div>
        <Navbar />
        <div></div>
        <div id="createPlantView">
          <h2>Add a new plant</h2>
          <CreatePlant />
        </div>
        <ul id="allPlantsView">
          {this.props.plants.map((plantObj) => (
            <div className="PlantInfo" key={plantObj.id}>
              <h3>
                <Link to={`/plant-friends/${plantObj.id}`}>
                  {" "}
                  {plantObj.name}
                </Link>
              </h3>
              <div />
              <img className="plant-image" src={plantObj.imageLink} />
              <div className="plant-attributes">
                <div>Species: {plantObj.species}</div>
                <div />
                <div>
                  About Your Plant Friend: <br /> {plantObj.description}
                </div>
                <div />
                <div>Care: {plantObj.careInstructions}</div>
              </div>
              <br />
              <div className="price">
                Price: $
                {String(plantObj.price / 100).length === 2
                  ? plantObj.price / 100 + ".00"
                  : plantObj.price / 100}
              </div>
            </div>
          ))}
        </ul>
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
