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
        <table className="user-table">
          <thead>
            <tr style={{textDecoration: "underline"}}>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username.toLowerCase()}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
