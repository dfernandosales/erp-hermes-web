import React from 'react'
import { act } from 'react-dom/test-utils'
import useToOneEntityManager from './useToOneEntityManager'
import CrudForm from '../Components/CrudForm'
import { createBasicRepository as createRepository } from '../Repository'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { cleanup, render, fireEvent } from '@testing-library/react'
import TextField from '../Fields/TextField'
import { Field } from 'react-final-form'

afterEach(cleanup)

let restApi
let repository

beforeEach(() => {
  restApi = {
    get: jest.fn(async () => ({
      ok: true,
      data: {
        data: [{
          id: 5,
          info: 'Marcos',
        }],
      },
    })),
    post: jest.fn(async () => ({
      ok: true,
      data: {
        id: 5,
        info: 'Marcos',
      },
    })),
    patch: jest.fn(async () => ({
      ok: true,
      data: {
        id: 5,
        info: 'Marcos',
      },
    })),
  }
  repository = createRepository({
    path: 'contatos',
    restApi,
  })
})

describe('Integração do useToOneEntityManager and CrudForm', () => {
  const Form = () => {
    const hook = useToOneEntityManager({ repository, relationKey: 'pessoaId' })
    return (
      <CrudForm {...hook}>
        <Field component={TextField} name="info" />
      </CrudForm>
    )
  }

  it('Deve buscar item', async () => {
    const { findByDisplayValue } = render(
      <Router initialEntries={['/pessoas/2/contatos']}>
        <Route path="/pessoas/:id" component={Form} />
      </Router>
    )

    expect(restApi.get).toBeCalledWith('contatos?pessoaId=2')
    expect(await findByDisplayValue('Marcos')).toBeDefined()
  })

  it('Deve atualizar item', async () => {
    const { getByText, findByDisplayValue } = render(
      <Router initialEntries={['/pessoas/2/contatos']}>
        <Route path="/pessoas/:id" component={Form} />
      </Router>
    )

    await findByDisplayValue('Marcos')
    await act(async () => {
      fireEvent.click(getByText('Salvar').closest('button'))
    })
    expect(restApi.patch).toBeCalledWith('contatos/5', {id: 5, pessoaId: 2, info: 'Marcos' }, undefined)
  })

})
