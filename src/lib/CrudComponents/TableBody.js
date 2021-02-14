import React, { useState, useEffect } from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  withlink: {
    cursor: 'pointer',
  },
  actionButtons: {
    display: 'inline-block',
    wordBreak: 'break-word',
    minWidth: '128px',
  },
  actionCell: {
    width: '2rem',
  },
}))

const EntityField = ({ id, getOne, fieldName, onClickRow }) => {
  const [entity, setEntity] = useState(null)

  const getEntity = async () => {
    const response = await getOne(id, { fields: { nome: true } })
    if (response.ok) {
      setEntity(response.data)
    }
  }
  useEffect(() => {
    getEntity()
  }, [id])

  return (
    <TableCell key={id} onClick={onClickRow}>
      {entity && entity[fieldName]}
    </TableCell>
  )
}

const renderCell = (item, onClickRow, classes, align) => field => {
  const { format = x => x } = field
  if (field.getOne) {
    return (
      <EntityField
        key={field.source}
        onClickRow={() => onClickRow && onClickRow(item, field)}
        getOne={field.getOne}
        id={item[field.source]}
        fieldName={field.key}
      />
    )
  }
  return (
    <TableCell
      key={field.source}
      className={onClickRow ? classes.withlink : ''}
      onClick={() => onClickRow && onClickRow(item, field)}
      align={
        !!field.align ? field.align : field.type === 'number' ? 'right' : 'left'
      }
    >
      {format(item[field.source], item)}
    </TableCell>
  )
}

const _actionsOptions = () => ({
  canView: true,
  canUpdate: true,
  canRemove: true,
})
export default ({
  list,
  fields,
  onClickView,
  onClickEdit,
  onClickDelete,
  onClickRow,
  actionsOptions = _actionsOptions,
  emptyText,
  loading,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const { location } = history

  const params = new URLSearchParams(location.search)
  const page = +params.get('page') || 0

  return (
    <TableBody>
      {list.length
        ? list.map((item, index) => {
            const options = actionsOptions(item)
            return (
              <TableRow key={index} hover>
                {fields.map(renderCell(item, onClickRow, classes))}
                <TableCell align="right" className={classes.actionCell}>
                  <div className={classes.actionButtons}>
                    {onClickView && options.canView && (
                      <Tooltip
                        style={{ marginRight: 10 }}
                        title="Ver registro"
                        aria-label="Ver registro"
                      >
                        <IconButton
                          size="small"
                          aria-label="Ver"
                          onClick={() => onClickView(item)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onClickEdit && options.canUpdate && (
                      <Tooltip
                        style={{ marginRight: 10 }}
                        title="Editar registro"
                        aria-label="Editar registro"
                      >
                        <IconButton
                          size="small"
                          aria-label="Editar"
                          onClick={() => onClickEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onClickDelete && options.canRemove && (
                      <Tooltip
                        style={{ marginRight: 10 }}
                        title="Deletar registro"
                        aria-label="Deletar registro"
                      >
                        <IconButton
                          size="small"
                          aria-label="Deletar"
                          onClick={() => onClickDelete(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        : emptyText && !loading && page > 0
        ? (params.set('page', page - 1),
          history.push(`${location.pathname}?${params.toString()}`))
        : emptyText &&
          !loading &&
          page === 0 && (
            <TableRow hover>
              <TableCell align="center" colSpan={fields.length + 1}>
                <Typography variant="body1">{emptyText}</Typography>
              </TableCell>
            </TableRow>
          )}
    </TableBody>
  )
}
