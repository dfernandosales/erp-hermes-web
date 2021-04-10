import React from 'react'
import { List } from '../../lib/Components'
import { useListRepository } from '../../lib/Hooks'
import reservaRepository from './reservaRepository'
import { formatDateTime, formatMoney } from '../../utils/Utils'


const ReceitaList = ({ ...props }) => {
  const listOptions = {
    fields: {
      createdAt: {
        label: 'Data',
        format: value => formatDateTime(value),
      },
      tipo: {
        label: 'Tipo',
        format: tipo => "RESERVA"
      },
      valorReserva: {
        label: "Valor Receita",
        format: valorReserva => formatMoney(valorReserva)
      }
    }
  }

  const listHook = useListRepository({
    repository: reservaRepository,
    path: 'reserva',
    query: [["status", "FINALIZADA"]],
  })

  return (
    <>
      <List
        {...props}
        {...listHook}
        removeItem={null}
        onClickEdit={null}
        onClickView={null}
        onClickNew={null}
        listOptions={listOptions}
      />
    </>
  )
}

export default ReceitaList