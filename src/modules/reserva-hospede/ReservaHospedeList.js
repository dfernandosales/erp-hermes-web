import React from 'react'
import { List } from '../../lib/Components'
import { autocompleteHelpers } from '../../lib/Common'
import { useListRepository } from '../../lib/Hooks'
import reservaHospedeRepository from './reservaHospedeRepository'


const ReservaHospedeList = ({ ...props }) => {
  const listOptions = {
    fields: {
      hospede: {
        label: 'Nome Hospede',
        format: hospede => hospede.nomeCompleto
      },
     
    }
  }

  const listHook = useListRepository({
    repository: reservaHospedeRepository,
    path: 'reserva-hospede',
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
        listOptions={listOptions}
      />
    </>
  )
}

export default ReservaHospedeList