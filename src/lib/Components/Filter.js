import React, { useState } from 'react'
import { Form } from 'react-final-form'
import { Paper, Grid, Collapse } from '@material-ui/core'
import FilterActions from './FilterActions'
import PropTypes from 'prop-types'

const defaultLabels = {
  simpleFilter: 'Simple',
  detailedFilter: 'Detailed',
  clear: 'Clear',
  find: 'Find',
}

const Filter = ({
  children,
  labels = defaultLabels,
  initialValues,
  onClear,
  onSubmit,
  validate,
  detailedFilter,
}) => {
  const [showDetailed, setShowDetailed] = useState(false)
  const formClear = (event, form) => {
    // form.reset(event)
    onClear(event)
  }
  const renderDetailedFilter = () => (
    <Collapse in={showDetailed}>{detailedFilter}</Collapse>
  )

  const toggleDetailedFilter = () => {
    setShowDetailed(!showDetailed)
  }

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
      {({ handleSubmit, form }) => (
        <Paper style={{ padding: 16, marginBottom: 20 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {children}
              </Grid>
              {detailedFilter && (
                <Grid item xs={12}>
                  {renderDetailedFilter()}
                </Grid>
              )}
              <Grid item xs={12}>
                <FilterActions
                  onClear={e => formClear(e, form)}
                  labels={labels}
                  showDetailedFilter={showDetailed}
                  toggleDetailedFilter={detailedFilter && toggleDetailedFilter}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Form>
  )
}

Filter.propTypes = {
  /** Children elements that will be render inside the form*/
  children: PropTypes.object,
  /** Labels of the buttons  */
  labels: PropTypes.object,
}

export default Filter
