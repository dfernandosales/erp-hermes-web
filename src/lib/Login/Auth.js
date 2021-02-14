import React from 'react'

const initialState = {
  loggedin: false,
  redirectPath: undefined,
  user: {
    name: 'unkown'
  }
}
export const AuthContext = React.createContext(initialState)
export const {Consumer} = AuthContext

export default class Auth extends React.Component {
  state = initialState

  constructor(props) {
    super(props)
    const stringUser = localStorage['user']
    if (stringUser) {
      const user = JSON.parse(stringUser)
      props.withUser && props.withUser(user)
      this.state = {
        user,
        loggedin: true
      }
    } else {
      const url = new URL(window.location.href)
      this.state = {
        redirectPath: url.pathname
      }
    }
  }

  handleUserLogin = (user) => {
    this.props.withUser && this.props.withUser(user)
    localStorage['user'] = JSON.stringify(user)
    this.setState({
      user,
      loggedin: true
    })
  }

  logout = async (redirectPath) => {
    const {onLogout} = this.props
    onLogout && await onLogout()
    delete localStorage.user
    this.setState({
      user: undefined,
      loggedin: false,
      redirectPath
    })
  }

  render() {
    const {children} = this.props
    return (
      <AuthContext.Provider value={{
        loggedin: this.state.loggedin,
        redirectPath: this.state.redirectPath,
        logout: this.logout,
        user: this.state.user,
        handleUserLogin: this.handleUserLogin
      }}>
        {children}
      </AuthContext.Provider>
    )
  }
}
