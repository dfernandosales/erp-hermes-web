import React from 'react'
import { List } from '../../lib/Components'
import { useListRepository } from '../../lib/Hooks'
import reservaRepository from './reservaRepository'



const ReservaList = ({ ...props }) => {
  const listOptions = {
    fields: {
      id: {
        label: 'Numero da Reserva'
      },
    }
  }

  const listHook = useListRepository({
    repository: reservaRepository,
    path: 'reserva'
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

export default ReservaList