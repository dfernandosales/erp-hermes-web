import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import {Form} from 'react-final-form';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import classNames from 'classnames'
import Snackbar from '../Common/Snackbar'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'

export const PRISTINE_BEHAVIOR = {
  DISABLED_WHEN_DIRTY: pristine => !pristine,
  DISABLED_WHEN_NOT_DIRTY: pristine => pristine,
  DEFAULT: pristine => false
};

const useStyles = makeStyles(theme => ({
  formContent: {
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%'
  },
  buttonContent: {
    width: '100%'
  },
  buttonContainer: {
    width: 160
  },
  root: {
    padding: 16,
    marginBottom: 20
  },
  buttonWrapper: {
    margin: theme.spacing(),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    right: 8,
    marginTop: -12,
    marginLeft: -12,
  },
  successButton: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: green[500],
    },
  },
  errorButton: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: red[500],
    },
  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
  iconSmall: {
    fontSize: 20,
  }
}))

function CrudForm({children, validate, getItem, withPaper, onSubmit, decorators, customActions=[], formProps, ...props}) {
  const history = useHistory()
  const classes = useStyles()
  const Container = withPaper ? Paper : (props => <div {...props}/>)
  const [item, setItem] = useState()
  const [formState, setFormState] = useState({
    status: 'edit',
    message: ''
  })

  const _getItem = async () => {
    if (getItem) {
      const data = await getItem()
      setItem(data)
    }
  }

  const handleSubmit = async (data) => {
    if (onSubmit) {
      const result = await onSubmit(data)
      setItem(data)
      if (result) {
        setFormState({
          status: result.ok ? 'success' : 'error',
          message: result.message
        })
        setTimeout(() => setFormState({
          status: 'edit',
          ...formState
        }), 4000)
      }
   }
  }

  const handleSnackbarClose = () => {
    setFormState({
      ...formState,
      message: ''
    })
  }

  useEffect(() => {
      _getItem()
  }, [history.location.pathname])

  const getButtonLabel = (submitting) => {
    if (submitting) {
      return (
        <div>
          <CircularProgress size={24} className={classes.buttonProgress} />
          Salvando
        </div>
      )
    }
    switch (formState.status) {
      case 'success':
        return (
          [
            <CheckCircleIcon key='successIcon' className={classNames(classes.leftIcon, classes.iconSmall)}/>,
            <span key='successLabel'>Sucesso</span>

          ]
        )
      case 'edit':
        return 'Salvar'
      case 'error':
        return 'Oops, algo errado'
      default: throw Error('Unexpected formState')
    }
  }

  const getButtonClass = () => {
    switch (formState.status) {
      case 'success':
        return classes.successButton
      case 'edit':
        return classes.button
      case 'error':
        return classes.errorButton
      default: throw Error('Unexpected formState')
    }
  }

  return (
    <Container className={classes.root}>
      <Form onSubmit={handleSubmit} validate={validate} initialValues={item} decorators={decorators} {...formProps}>
        {
          ({handleSubmit, submitting, pristine, values, ...rest}) => (
            <form onSubmit={handleSubmit} >
              <Grid direction='column' container spacing={2}>
                <Grid item>
                  <div className={classes.formContent}>
                    { typeof children === 'function' ? children({values, ...rest}) : children}
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.buttonContent}>
                  <Grid justify='flex-end' container spacing={2}>
                    <Grid item classes={{item: classes.buttonContainer}}>
                      <Button fullWidth type='button' variant='outlined' onClick={() => {
                          const goBack = props.history.location.pathname.split("/").filter(p => !!p).slice(0,-1).join("/")
                          history.push('/' + goBack)
                        }}>
                        Voltar
                      </Button>
                    </Grid>
                    {
                      customActions.map((action) => (
                        <Grid item key={action.label} classes={{item: classes.buttonContainer}}>
                          <Button fullWidth variant='outlined' type='button' color='primary' onClick={action.onClick} component={action.component} disabled={action.pristine ? action.pristine(pristine) : PRISTINE_BEHAVIOR.DEFAULT(pristine)} {...action.props}>
                            {action.label} {action.icon}
                          </Button>
                        </Grid>
                      ))
                    }
                    <Grid item classes={{item: classes.buttonContainer}}>
                      <Button
                        className={getButtonClass()}
                        fullWidth
                        type='submit'
                        disabled={submitting}
                        variant='contained'
                        color='primary'>
                        {getButtonLabel(submitting)}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )
        }
      </Form>
      <Snackbar message={formState.message} onClose={handleSnackbarClose} />
    </Container>
  )
}

CrudForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  withPaper: PropTypes.bool,
  /** Add new Actions to the form */
  customActions: PropTypes.array,
  getItem: PropTypes.func,
  /** If some Field needs to be required */
  validate: PropTypes.func,
  /** use createDecorator from final-form-calculate, a simple explanation is: "If field X changes, update field Y" */
  decorators: PropTypes.array
}

export default CrudForm
