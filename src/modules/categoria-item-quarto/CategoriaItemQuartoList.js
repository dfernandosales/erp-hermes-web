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
  })

  return (
    <>
      <List
        {...props}
        {...listHook}
        onClickView={null}
        hideDownloadIcon
        listOptions={listOptions}
      />
    </>
  )
}

export default CategoriaItemQuartoList