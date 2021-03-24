import React from 'react'
import { List } from '../../lib/Components'
import { useListRepository } from '../../lib/Hooks'
import categoriaitemQuartoRepository from './categoriaitemQuartoRepository'


const CategoriaItemQuartoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      item: {
        label: 'Nome do item',
        format: item => item.nome
      },
      quantidade: {
        label: 'Quantidade',
      },
    }
  }

  const listHook = useListRepository({
    repository: categoriaitemQuartoRepository,
    path: 'categoria-item-quarto',
    query: [["categoriaQuartoId", props.match.params.id]],
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
        listOptions={listOptions}
      />
    </>
  )
}

export default CategoriaItemQuartoList