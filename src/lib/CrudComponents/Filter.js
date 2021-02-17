import React from 'react'
import { Form } from 'react-final-form'
import Paper from '@material-ui/core/Paper'
import FilterActions from './FilterActions'
import PropTypes from 'prop-types'
import useFilter from './Hooks/useFilter'

const Filter = ({ children, labels, formatFilters }) => {
  const { initialValues, handleClear, handleSubmit } = useFilter({
    formatFilters
  })

  const formClear = (event, form) => {
    form.reset(event)
    handleClear(event)
  }

  return (
    <Form onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleSubmit, form }) => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
          <form onSubmit={handleSubmit}>
            {children}
            <div style={{ height: 8 }} />
            <FilterActions onClear={e => formClear(e, form)} labels={labels} />
          </form>
        </Paper>
      )}
    </Form>
  )
}

Filter.propTypes = {
  /** Children elements that will be render inside the form */
  children: PropTypes.object,
  /** Labels of the buttons  */
  labels: PropTypes.object
}

export default Filter
