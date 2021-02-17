import React from 'react'
import PropTypes from 'prop-types'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

const PaginationActions = React.forwardRef(function PaginationActions (
  props,
  ref
) {
  const {
    backIconButtonProps,
    count,
    nextIconButtonProps,
    onChangePage,
    page,
    rowsPerPage,
    ...other
  } = props

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  return (
    <div ref={ref} {...other}>
      <Tooltip title='Página Anterior' aria-label='Página Anterior'>
        <span>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            color='inherit'
            {...backIconButtonProps}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Próxima página' aria-label='Próxima página'>
        <span>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            color='inherit'
            {...nextIconButtonProps}
          >
            <KeyboardArrowRight />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  )
})

PaginationActions.propTypes = {
  backIconButtonProps: PropTypes.object,
  count: PropTypes.number.isRequired,
  nextIconButtonProps: PropTypes.object,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default PaginationActions
