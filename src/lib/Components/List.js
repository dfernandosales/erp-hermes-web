import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Snackbar from '../Common/Snackbar'
import SimpleDialog from '../Common/SimpleDialog'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { useLocation } from 'react-router-dom'
import TableHead from '../CrudComponents/TableHead'
import TableBody from '../CrudComponents/TableBody'
import Pagination from './Pagination'
import TableContainer from '@material-ui/core/TableContainer'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  container: {
    maxHeight: '85vh',
  },
}))

const List = ({
  state,
  clearRemovedMessage,
  removeItem,
  deleteFItem,
  hideDownloadIcon = false,
  flatOnDownload = false,
  csvSeparator = ',',
  onDownloadClick,
  listOptions = { ...listOptions, defaultOrder: '' },
  undoRemove,
  withPaper,
  onClickNew,
  onClickEdit,
  onClickView,
  onClickRow,
  labelRowsPerPage = 'Linhas por página',
  ofLabel = 'de',
  history,
  titleDelete = 'Excluir permanentemente esse registro?',
  exportName = new Date().toString(),
  actionsOptions,
  stickyHeader,
  adjustToScreenHeight,
  emptyText = 'Sem Resultados.',
  fetchAllList,
  removedMessage,
  removedItem,
}) => {
  const location = useLocation()
  const classes = useStyles()
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [item, setItem] = useState(null)

  const fields = Object.entries(listOptions.fields)
    .filter(([s, value]) => !!value)
    .map(([source, value]) => {
      const {
        label = source,
        noOrder,
        align,
        type,
        format,
        getOne,
        key,
      } = value
      return {
        noOrder,
        align,
        key,
        getOne,
        format,
        label,
        source,
        type,
      }
    })

  const urlFilterToObject = filter => {
    if (!filter) return {}
    return filter.split(',').reduce((obj, keyValue) => {
      const [key, value] = keyValue.split('=')
      return { ...obj, [key]: value }
    }, {})
  }

  function flatObject(obj) {
    const flatObject = {}
    const path = [] // current path

    function dig(obj) {
      if (obj !== Object(obj))
        return (flatObject[path.join('.')] = obj) /*<- value*/
      for (let key in obj) {
        path.push(key)
        dig(obj[key])
        path.pop()
      }
    }
    dig(obj)
    return flatObject
  }

  const createCsv = (list, listOptions) => {
    if (flatOnDownload) {
      list = list.map(obj => flatObject(obj))
    }
    const keys = Object.keys(list[0])
    const rows = list.map(obj => keys.map(key => obj[key]).join(csvSeparator))
    const header = keys
      .map(key => {
        const field = listOptions.fields[key]
        return field ? field.label : key
      })
      .join(csvSeparator)
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
    const response = await fetchAllList()
    try {
      if (response.ok && response.data.length) {
        const csv = createCsv(response.data, listOptions)
        downloadFile(csv, exportName)
      }
    } catch (e) {
      console.log(
        'Erro ao tentar gerar csv de toda a lista buscando na api. Fallback para lista do estado.'
      )
      state.list.forEach(o => delete o.removed)
      const csv = createCsv(state.list, listOptions)
      downloadFile(csv, exportName)
    }
  }

  const handleClickDeleteFConfirmation = async () => {
    if (deleteFItem) {
      await deleteFItem(item, location)
    }
  }

  const undoAction = () => {
    if (removedMessage && undoRemove && removedItem) {
      return [
        <Button key="undo" color="secondary" size="small" onClick={undoRemove}>
          DESFAZER
        </Button>,
      ]
    }
    return []
  }

  const actions = undoAction()

  const onClickDeleteRow = item => {
    if (removeItem) {
      return removeItem(item)
    }
    if (deleteFItem) {
      setOpenConfirmationDialog(true)
      setItem(item)
    }
  }

  const closeDialog = () => {
    setOpenConfirmationDialog(false)
  }

  const Container = withPaper ? Paper : props => <div {...props} />
  return (
    <Container {...(withPaper ? { square: true } : {})} padding={0}>
      <Paper className={classes.table} square>
        {state.loading ? <LinearProgress /> : null}
        <TableContainer className={adjustToScreenHeight && classes.container}>
          <Table stickyHeader={stickyHeader}>
            <TableHead
              hideDownloadIcon={hideDownloadIcon}
              onDownloadClick={() =>
                onDownloadClick ? onDownloadClick() : downloadCsv()
              }
              defaultOrder={listOptions.defaultOrder}
              columns={fields}
            />
            <TableBody
              actionsOptions={actionsOptions}
              onClickRow={onClickRow}
              onClickEdit={onClickEdit}
              onClickView={onClickView}
              onClickDelete={
                removeItem || deleteFItem ? onClickDeleteRow : null
              }
              list={state.list}
              fields={fields}
              emptyText={emptyText}
              loading={state.loading}
              removeItem
            />
            <TableFooter>
              <TableRow>
                <TableCell
                  align="right"
                  colSpan={fields.length}
                  className="pl-0"
                >
                  <Pagination
                    count={state.count}
                    history={history}
                    location={location}
                    ofLabel={ofLabel}
                    labelRowsPerPage={labelRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <Snackbar
        message={removedMessage}
        action={actions}
        onClose={clearRemovedMessage}
      />
      {onClickNew && (
        <Tooltip title="Adicionar registro" aria-label="Adicionar registro">
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={onClickNew}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <SimpleDialog
        open={!!openConfirmationDialog}
        buttonLabel="Não"
        handleClose={closeDialog}
        primaryAction={handleClickDeleteFConfirmation}
        title={titleDelete}
        primaryActionButtonLabel="Sim"
      />
    </Container>
  )
}

List.propTypes = {
  /** List Header (Fields and defaultOrder). */
  listOptions: PropTypes.shape({
    fields: PropTypes.shape({
      cellName: PropTypes.object,
    }).isRequired,
    defaultOrder: PropTypes.string,
  }).isRequired,
  /** If true, the Download icon will be hidden */
  hideDownloadIcon: PropTypes.bool,
  /** Utilizar BrowserRouter */
  history: PropTypes.object,
  /** Envolve a lista a um elemento Paper */
  withPaper: PropTypes.bool,
  /** Deleta o item a nível lógico e retorna por callback o registro removido */
  removeItem: PropTypes.func,
  /** Desfaz a remoção do item a nível lógico */
  undo: PropTypes.func,
  /** Deleta o item a nível físico e retorna por callback o registro removido */
  deleteFitem: PropTypes.func,
  /** Mostra um fab para adicionar novos registros */
  onClickNew: PropTypes.func,
  /** Mostra um ícone de edit e retorna por callback o objeto clicado */
  onClickEdit: PropTypes.func,
  /** Mostra um ícone de visualização e retorna por callback o objeto clicado em modo visualização */
  onClickView: PropTypes.func,
  /** Habilita o click na linha e retorna por callback o objeto clicado */
  onClickRow: PropTypes.func,
  deleteItem: PropTypes.func,
  removedMessage: PropTypes.string,
  removedItem: PropTypes.object,
}

export default List
