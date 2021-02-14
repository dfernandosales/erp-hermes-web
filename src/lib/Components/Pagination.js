import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination'
import { useHistory } from 'react-router-dom'

const CustomPagination = ({ count = 0, needRender }) => {
  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const page = Number(params.get('page')) || 0
  const rowsPerPage = Number(params.get('rows')) || 10
  needRender = count / rowsPerPage > 1

  const handleChange = (event, page) => {
    const { location } = history
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page - 1)
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  return needRender ? (
    <Pagination
      count={Math.ceil(count / rowsPerPage)}
      page={page + 1}
      onChange={handleChange}
    />
  ) : (
    ''
  )
}

CustomPagination.propTypes = {
  count: PropTypes.number,
  needRender: PropTypes.bool
}

export default CustomPagination
