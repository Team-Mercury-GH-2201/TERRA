import React from 'react'
import {connect} from 'react-redux'
import Navbar from './Navbar'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <Navbar />
      <h2>{`Welcome, ${
          username[0].toUpperCase() +
          username.slice(1)
        }!`}</h2>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
