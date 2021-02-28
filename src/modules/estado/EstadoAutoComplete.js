import React from 'react'
import { autocompleteHelpers } from '../../lib/Common'
import estadoRepository from './estadoRepository'
import Autocomplete from '../../Components/Autocomplete'
const { toOption } = autocompleteHelpers

export const loadEstados = async inputValue => {
  const response = await estadoRepository.list({
    query: {
      name: inputValue,
      order: 'name asc'
    },
    paginate: {
      limit: 5
    }
  })
  if (response.ok) {
    return response.data.map(toOption('name'))
  }

  return []
}

const EstadoAutocomplete = props => {
  return (
    <Autocomplete
      repository={estadoRepository}
      labelOption='name'
      loadOptions={loadEstados}
      {...props}
    />
  )
}

export default EstadoAutocomplete
