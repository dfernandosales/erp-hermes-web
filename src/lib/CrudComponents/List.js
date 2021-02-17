import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from './TableHead'
import TableBody from './TableBody'
import * as R from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from './Pagination'
import LinearProgress from '@material-ui/core/LinearProgress'
import Snackbar from '../Common/Snackbar'
import SimpleDialog from '../Common/SimpleDialog'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4)
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
}))

const List = ({
  hideDownloadIcon = false,
  deleteFItem,
  listOptions = { ...listOptions, defaultOrder: '' },
  getPage,
  getCount,
  deleteItem,
  undo,
  withPaper,
  onClickNew,
  onClickEdit,
  onClickView,
  labelRowsPerPage = 'Linhas por página',
  ofLabel = 'de',
  history,
  titleDelete = 'Excluir permanentemente esse registro?',
  exportName = new Date().toString()
}) => {
  const location = useLocation()
  const createFields = () => {
    const fields = listOptions.fields
    return R.keys(fields)
      .filter(s => !!fields[s])
      .map(source => {
        const field = fields[source]
        const { label = source, noOrder, type, format, getOne, key } = field
        return {
          noOrder,
          key,
          getOne,
          format,
          label,
          source,
          type
        }
      })
  }

  const classes = useStyles()
  const [list, setList] = useState([])
  const [fields] = useState(createFields())
  const [loading, setLoading] = useState(true)
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [item, setItem] = useState(null)
  const [count, setCount] = useState(0)
  const [removedMessage, setRemovedMessage] = useState('')
  const [removedItem, setRemovedItem] = useState({})

  const urlFilterToObject = filter => {
    if (!filter) return {}
    return filter.split(',').reduce((obj, keyValue) => {
      const [key, value] = keyValue.split('=')
      return { ...obj, [key]: value }
    }, {})
  }

  const updatePage = async () => {
    const params = new URLSearchParams(location.search)
    const filter = urlFilterToObject(params.get('filters'))
    if (getPage) {
      setLoading(true)
      const page = +params.get('page') || 0
      const rowsPerPage = +params.get('rows') || 10
      const order = params.get('order') || listOptions.defaultOrder
      const list = await getPage({
        page,
        rowsPerPage,
        filter,
        order,
        location
      })
      setLoading(false)
      setList(list)
    }
    if (getCount) {
      const count = await getCount({ filter, location })
      setCount(count)
    }
  }

  const createCsv = (list, listOptions) => {
    const rows = list.map(obj => Object.values(obj).join(','))
    const header = Object.keys(list[0])
      .map(key => {
        const field = listOptions.fields[key]
        return field ? field.label : key
      })
      .join(',')
    return [header].concat(rows).join('\r\n')
  }

  const downloadFile = (csv, exportName) => {
    const element = document.createElement('a')
    const blob = new Blob(['\ufeff', csv])
    element.setAttribute('href', URL.createObjectURL(blob))
    element.setAttribute('download', `${exportName}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadCsv = async () => {
    const params = new URLSearchParams(location.search)
    const filter = urlFilterToObject(params.get('filters'))
    if (getPage) {
      const page = +params.get('page') || 0
      const rowsPerPage = +params.get('rows') || 10
      const order = params.get('order') || listOptions.defaultOrder
      const list = await getPage({
        filter,
        order,
        location,
        rowsPerPage: 5000
      })
      list.forEach(o => delete o.removed)
      const csv = createCsv(list, listOptions)
      downloadFile(csv, exportName)
    }
  }

  useEffect(() => {
    updatePage()
  }, [location.search])

  const handleClickDelete = async item => {
    if (deleteItem) {
      const {
        ok,
        message = 'Registro removido. Deseja desfazer essa ação?'
      } = await deleteItem(item, location)
      setRemovedMessage(message)
      if (ok) {
        setRemovedItem(item)
        updatePage()
      }
    }
  }

  const handleUndo = async () => {
    const item = removedItem
    handleSnackbarClose()
    await undo(item, location)
    updatePage()
  }

  const handleClickDeleteFConfirmation = async () => {
    if (deleteFItem) {
      const { ok, message = 'Registro removido!' } = await deleteFItem(
        item,
        location
      )
      setRemovedMessage(message)
      if (ok) {
        updatePage()
      }
    }
  }

  const undoAction = () => {
    if (removedItem) {
      return [
        <Button key='undo' color='secondary' size='small' onClick={handleUndo}>
          DESFAZER
        </Button>
      ]
    }
    return []
  }

  const handleSnackbarClose = () => {
    setRemovedMessage('')
    setRemovedItem(null)
  }

  const onClickDeleteRow = item => {
    if (deleteItem) {
      return handleClickDelete(item)
    }
    if (deleteFItem) {
      setOpenConfirmationDialog(true)
      setItem(item)
    }
  }

  const closeDialog = () => {
    setOpenConfirmationDialog(false)
    setRemovedItem(null)
  }

  const Container = withPaper ? Paper : props => <div {...props} />
  return (
    <Container padding={0}>
      {loading ? <LinearProgress /> : null}
      <Paper className={classes.table}>
        <Table>
          <TableHead
            hideDownloadIcon={hideDownloadIcon}
            onDownloadClick={downloadCsv}
            defaultOrder={listOptions.defaultOrder}
            columns={fields}
          />
          <TableBody
            onClickView={onClickView}
            onClickEdit={onClickEdit}
            onClickDelete={deleteItem || deleteFItem ? onClickDeleteRow : null}
            list={list}
            fields={fields}
          />
          <TableFooter>
            <TableRow>
              <TableCell align='right' colSpan={fields.length} className='pl-0'>
                {getCount && (
                  <Pagination
                    count={count}
                    history={history}
                    location={location}
                    ofLabel={ofLabel}
                    labelRowsPerPage={labelRowsPerPage}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
      <Snackbar
        message={removedMessage}
        action={undoAction()}
        onClose={handleSnackbarClose}
      />
      {onClickNew && (
        <Tooltip title='Adicionar registro' aria-label='Adicionar registro'>
          <Fab
            color='primary'
            aria-label='Add'
            className={classes.fab}
            onClick={onClickNew}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <SimpleDialog
        open={!!openConfirmationDialog}
        buttonLabel='Não'
        handleClose={closeDialog}
        primaryAction={handleClickDeleteFConfirmation}
        title={titleDelete}
        primaryActionButtonLabel='Sim'
      />
    </Container>
  )
}

List.propTypes = {
  /** List Header (Fields and defaultOrder). */
  listOptions: PropTypes.shape({
    fields: PropTypes.shape({
      cellName: PropTypes.object
    }).isRequired,
    defaultOrder: PropTypes.string
  }).isRequired,
  /** List Content */
  getPage: PropTypes.func.isRequired,
  /** Rotas, Usando o componente ListApi não é necessário atribuí-lo manualmente */
  location: PropTypes.object.isRequired,
  /** If true, the Download icon will be hidden */
  hideDownloadIcon: PropTypes.bool,
  /** Utilizar BrowserRouter */
  history: PropTypes.object,
  /** Envolve a lista a um elemento Paper */
  withPaper: PropTypes.bool,
  getCount: PropTypes.func,
  /** Deleta o item a nível lógico e retorna por callback o registro removido */
  deleteItem: PropTypes.func,
  /** Desfaz a remoção do item a nível lógico */
  undo: PropTypes.func,
  /** Deleta o item a nível físico e retorna por callback o registro removido */
  deleteFitem: PropTypes.func,
  /** Mostra um fab para adicionar novos registros */
  onClickNew: PropTypes.func,
  /** Mostra um ícone de edit e retorna por callback o objeto clicado */
  onClickEdit: PropTypes.func,
  /** Mostra um ícone de visualização e retorna por callback o objeto clicado em modo visualização */
  onClickView: PropTypes.func
}

export default List
