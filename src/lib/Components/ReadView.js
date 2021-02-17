import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import * as R from 'ramda'

const useStyles = makeStyles(theme => ({
  formContent: {
    paddingTop: 16,
    paddingBottom: 16,
    direction: 'row',
    alignItems: 'center',
    justify: 'flex-start'
  },
  root: {
    padding: 16,
    marginBottom: 20
  },
  buttonContent: {
    width: '100%'
  },
  buttonContainer: {
    width: 160
  }
}))

const LabelValue = ({ label, value }) => (
  <>
    {label && (
      <Typography
        variant='caption'
        style={{ display: 'inline-block', width: '100%' }}
      >
        {label}
      </Typography>
    )}
    <Typography
      variant='body1'
      style={{
        width: '100%',
        display: 'inline-block',
        wordWrap: 'break-word',
        overflow: 'hidden'
      }}
    >
      {value}
    </Typography>
  </>
)

const format = (value, item, fieldConfig) =>
  fieldConfig.format ? fieldConfig.format(value, item) : value

const goToEdit = history =>
  history.location.pathname
    .split('/')
    .filter(p => !!p)
    .slice(0, -1)
    .join('/')

const ReadView = ({
  config,
  item,
  onGoBack,
  edit = true,
  hideGoBack = false
}) => {
  const history = useHistory()
  const classes = useStyles()

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack()
      return
    }
    const listPath = /\/.+?\//
    const path = listPath.exec(history.location.pathname)
    const goBack = path[0].substring(0, path[0].length - 1)
    if (sessionStorage.listCache) {
      const listCache = JSON.parse(sessionStorage.listCache)
      if (!R.isNil(listCache[goBack])) {
        history.push(goBack + listCache[goBack])
        return
      }
    }
    history.push(goBack + history.location.search)
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3} className={classes.formContent}>
        {config.map((secao, key) => (
          <React.Fragment key={key}>
            <Grid item xs={12}>
              <Typography
                variant={secao.variant || 'h6'}
                style={{ display: 'inline-block', width: '100%' }}
              >
                {secao.title}
              </Typography>
            </Grid>
            {Object.entries(secao.children).map(([fieldName, fieldConfig]) => (
              <Grid item xs={12} sm={fieldConfig.size || 3} key={fieldName}>
                {fieldConfig.isFullComponent ? (
                  fieldConfig.format(item[fieldName])
                ) : (
                  <LabelValue
                    label={fieldConfig.label}
                    value={format(item[fieldName], item, fieldConfig)}
                  />
                )}
              </Grid>
            ))}
          </React.Fragment>
        ))}
        <Grid item xs={12} className={classes.buttonContent}>
          <Grid justify='flex-end' container spacing={2}>
            {!hideGoBack && (
              <Grid item classes={{ item: classes.buttonContainer }}>
                <Button
                  type='button'
                  fullWidth
                  variant='outlined'
                  onClick={handleGoBack}
                >
                  Voltar
                </Button>
              </Grid>
            )}
            {edit && (
              <Grid item classes={{ item: classes.buttonContainer }}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    history.push('/' + goToEdit(history))
                  }}
                >
                  Editar
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

ReadView.propTypes = {
  config: PropTypes.array,
  item: PropTypes.object,
  onGoBack: PropTypes.func,
  edit: PropTypes.bool
}

export default React.memo(ReadView)
