import React from 'react'
import PropTypes from 'prop-types'

const withRecoverPassword = (RecoverPasswordComponent) => {
  return class RecoverPasswordContainer extends React.Component {
    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    }

    state = {
      success: false,
      message: ''
    }

    handleSubmit = async (formValues) => {
      const { onSubmit } = this.props
      const data = await onSubmit(formValues)
      this.setState({ message: data.message })
      if (data.ok) {
        setTimeout(() => {
          this.props.history.push('/login')
        }, 4000)
      }
    }

    handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      this.setState({
        message: ''
      })
    }

    render() {
      const {
        ...rest
      } = this.props

      return (
        <RecoverPasswordComponent
          {...rest}
          validate={this.validate}
          message={this.state.message}
          handleSnackbarClose={this.handleSnackbarClose}
          onSubmit={this.handleSubmit} />
      )
    }
  }
}

export default withRecoverPassword
