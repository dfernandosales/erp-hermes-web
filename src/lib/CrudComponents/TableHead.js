import React, { useState, useEffect } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  textBold: {
    fontWeight: 'bold',
  },
})

const EnhancedTableHead = ({
  hideDownloadIcon,
  defaultOrder,
  location,
  history,
  columns,
  onDownloadClick,
  above,
  hideColumns = {},
  hideEmptyColumn,
}) => {
  const [field, setField] = useState(defaultOrder)
  const [direction, setDirection] = useState('asc')
  const classes = useStyles()

  const getFieldDirection = ({ location: { search } }) => {
    const searchParams = new URLSearchParams(search)
    const order = searchParams.get('order')
    if (!order) {
      return
    }
    const [field, direction = 'asc'] = order.split(' ')
    setField(field)
    setDirection(direction)
  }

  useEffect(() => {
    getFieldDirection({
      defaultOrder,
      location,
      history,
      columns,
      onDownloadClick,
      above,
      hideColumns,
      hideEmptyColumn,
    })
  }, [location.search])

  const onRequestSort = newField => {
    const searchParams = new URLSearchParams(location.search)
    let newDirection = 'asc'
    if (field === newField) {
      newDirection = direction === 'desc' ? 'asc' : 'desc'
    }
    searchParams.set('order', `${newField} ${newDirection}`)
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  return (
    <TableHead>
      {above}
      <TableRow>
        {columns.map(({ label, source, noOrder, numeric, align }) => {
          if (hideColumns[source] && hideColumns[source]()) {
            return null
          }

          if (noOrder) {
            return (
              <TableCell align={align} key={source}>
                {label}
              </TableCell>
            )
          }
          return (
            <TableCell align={align} key={source} numeric={numeric}>
              <TableSortLabel
                active={field === source}
                direction={direction}
                onClick={event => onRequestSort(source)}
                className={classes.textBold}
              >
                {label}
              </TableSortLabel>
            </TableCell>
          )
        })}
        <TableCell align="right">
          {hideDownloadIcon ? null : (
            <Tooltip title="Baixar lista" aria-label="Baixar lista">
              <IconButton size="small" onClick={onDownloadClick}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default withRouter(EnhancedTableHead)
