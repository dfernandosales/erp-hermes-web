import React from 'react'
import { List } from '../../lib/Components'
import { autocompleteHelpers } from '../../lib/Common'
import { useListRepository } from '../../lib/Hooks'
import reservaQuartoRepository from './reservaQuartoRepository'


const ReservaQuartoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      numeroQuarto: {
        label: 'Quarto',
      },
      categoria: {
        label: 'Categoria',
        format: categoria => categoria
      },
     
    }
  }

  const listHook = useListRepository({
    repository: reservaQuartoRepository,
    path: 'reserva-quarto',
    query: [["reservaId", props.match.params.id]],
  })
  if(!listHook.state.loading){
    listHook.state.list = listHook.state.list.map(item => {return {...item, numeroQuarto: item.quarto.numero, categoria:item.quarto.categoriaQuarto.nome}})
  } 
  console.log(listHook.state.list)

  listHook.onClickEdit = props.onClickEdit;
  listHook.onClickNew = props.onClickNew;
  listHook.onClickView = null;

  delete listHook.undoRemove;
  delete listHook.removedMessage;

  return (
    <>
      <List
        {...listHook}
        hideDownloadIcon
        onClickEdit={null}
        listOptions={listOptions}
      />
    </>
  )
}

export default ReservaQuartoList