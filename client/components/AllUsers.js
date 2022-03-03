import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        <h2>All Users</h2>
        <h4>ID ** USERNAME ** EMAIL ** ADMIN</h4>
        {users.map((user) => {
          return (
            <div key={user.id} className="user-table">
              <div>
                <h4>{user.id}</h4>
                <h4>{user.username}</h4>
                <h4>{user.email}</h4>
                <h4>{`${user.isAdmin}`}</h4>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
