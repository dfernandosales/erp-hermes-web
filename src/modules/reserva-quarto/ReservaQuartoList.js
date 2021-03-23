import React from 'react'
import { List } from '../../lib/Components'
import { autocompleteHelpers } from '../../lib/Common'
import { useListRepository } from '../../lib/Hooks'
import reservaQuartoRepository from './reservaQuartoRepository'


const ReservaQuartoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      quartoId: {
        label: 'Quarto reservado',
      },
      quarto: {
        label: 'Categoria',
        format: quarto => quarto.categoriaQuarto.nome
      },
     
    }
  }

  const listHook = useListRepository({
    repository: reservaQuartoRepository,
    path: 'reserva-quarto',
    query: [["reservaId", props.match.params.id]],
    forceRemove: true,
  })

  listHook.onClickEdit = props.onClickEdit;
  listHook.onClickNew = props.onClickNew;
  listHook.onClickView = null;

  delete listHook.undoRemove;
  listHook.deleteFItem = listHook.removeItem;
  delete listHook.removeItem;

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