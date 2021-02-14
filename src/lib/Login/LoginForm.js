import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from '../Fields';
import {Field} from 'react-final-form';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import { Form } from 'react-final-form'
import Snackbar from '../Common/Snackbar'

const useStyles = makeStyles(theme => ({
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.primary.main
  }
}))

const LoginForm = ({
    usernameLabel = 'Username',
    passwordLabel = 'Password',
    submitLabel = 'Login',
    recoverPasswordLabel = 'Recover Password',
    logo,
    onSubmit,
    validate,
    errorMessage,
    onPasswordRecoverClick,
    onSnackbarClose
  }) => {

  const classes = useStyles()
  return (
    <div className={classes.background}>
      <Paper
        style={{padding: 20, minWidth: 300}}
        elevation={4}>
        { logo }
        <Form onSubmit={onSubmit} validate={validate}>
          {
            ({handleSubmit, submitting}) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction='column'>
                  <Grid item>
                    <Field
                      fullWidth
                      component={TextField}
                      label={usernameLabel}
                      name='username'/>
                  </Grid>
                  <Grid item>
                    <Field
                      fullWidth
                      component={TextField}
                      label={passwordLabel}
                      type='password'
                      name='password'/>
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      disabled={submitting}
                      variant='contained'
                      color='primary'
                      type='submit'>
                      {submitLabel}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type='button'
                      fullWidth
                      onClick={onPasswordRecoverClick}>
                      {recoverPasswordLabel}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )
          }
        </Form>
      </Paper>
      <Snackbar
        onClose={onSnackbarClose}
        message={errorMessage} />
    </div>
  )
}

LoginForm.propTypes = {
  usernameLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  errorMessage: PropTypes.string,
  validate: PropTypes.func,
  logo: PropTypes.element,
  onSubmit: PropTypes.func.isRequired
}


export default LoginForm
