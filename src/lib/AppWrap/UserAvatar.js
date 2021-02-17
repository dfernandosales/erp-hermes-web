import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../Login/Auth'
import * as R from 'ramda'
import ListTile from './ListTile'

const UserAvatar = props => {
  const context = useContext(AuthContext)

  const logout = () => {
    context.logout && context.logout()
    props.onLogout && props.onLogout()
  }

  const username = R.path(['user', 'name'], context)
  return (
    <ListTile
      {...props}
      onActionClick={props.onActionClick || logout}
      name={username}
    />
  )
}

UserAvatar.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onNameClick: PropTypes.func,
  avatar: PropTypes.string,
  onAvatarClick: PropTypes.func,
  action: PropTypes.node,
  onActionClick: PropTypes.func,
  onLogout: PropTypes.func
}

UserAvatar.defaultProps = {
  label: 'Hello',
  name: 'Unknown',
  onNameClick: undefined,
  avatar: undefined,
  onAvatarClick: undefined,
  action: undefined,
  onActionClick: undefined,
  onLogout: undefined
}

export default UserAvatar
