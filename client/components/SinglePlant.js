import React from 'react';
import { connect } from 'react-redux';
import { fetchPlant } from '../store/singlePlant';
import { deleteAPlant } from '../store/allPlants';
import { Link } from 'react-router-dom';
import EditPlant from './EditPlant';
import { fetchUsers } from '../store/users';

export class SinglePlant extends React.Component {
  componentDidMount() {
    this.props.fetchPlant(this.props.match.params.id);
    this.props.fetchUsers(this.props.match.params.id)
  }
  render() {
    console.log(this.props.users)
    return (
      <div>
        <h1>Welcome to TERRA - for all your plant friend needs</h1>
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
        {this.props.users.isAdmin === true ?
          (<div>
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
          ) : null}

      </div>
    )
  }
}

const mapState = (state) => {
  return {
    plant: state.plant,
    users: state.users,
  };
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id)),
    deleteAPlant: (id) => dispatch(deleteAPlant(id, history)),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};


export default connect(mapState, mapDispatch)(SinglePlant);