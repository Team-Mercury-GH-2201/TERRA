import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from '../store/users';

export class AllUsers extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }
    render(){
        return(
            <div>
                <h2>All Users</h2>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(null, mapDispatch)(AllUsers);