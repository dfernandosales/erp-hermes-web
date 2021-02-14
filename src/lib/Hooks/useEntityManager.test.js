import React, {useState} from 'react'
import {act} from 'react-dom/test-utils'
import useEntityManager, {getIds, save} from './useEntityManager'
import { createBasicRepository as createRepository } from '../Repository'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { cleanup, render, waitForElement, fireEvent } from '@testing-library/react'
import TextField from '../Fields/TextField'
import {Field} from 'react-final-form'
import CrudForm from '../Components/CrudForm'

afterEach(cleanup)

let repository

beforeEach(() => {
  repository = {
    getOne: jest.fn(() => ({
      ok: true,
      data: {
        id: 1,
        nome: 'teste'
      }
    })), create: jest.fn(async (data) => {
      return {
        ok: true,
        data: {...data, id: 1},
      }
    }),
    update: jest.fn(async (data) => {
      return {
        ok: true,
        data: {...data},
      }
    }),
  }
})

test('Deve obter ids da forma correta', () => {
  expect(getIds(10, null)).toEqual({
    parentId: undefined,
    id: 10
  })
  expect(getIds(10, 5)).toEqual({
    parentId: 10,
    id: 5
  })
  expect(getIds('new')).toEqual({
    id: 'new'
  })
})


test('Deve criar novo objeto', async () => {
  const response = await save({
    repository,
    data: {nome: 'teste'},
    id: 'new'
  })
  expect(repository.create).toBeCalledWith({
    nome: 'teste'
  })
  expect(response).toEqual({
    ok: true,
    data: {id: 1, nome: 'teste'}
  })
})

test('Deve criar novo objeto relacionado ao pai', async () => {
  const response = await save({
    repository,
    data: { nome: 'teste' },
    id: 20,
    childId: 'new',
    relationKey: 'escritorioId',
  })
  expect(repository.create).toBeCalledWith({
    escritorioId: 20,
    nome: 'teste',
  }, {parentId: 20})
  expect(response).toEqual({
    ok: true,
    data: { id: 1, nome: 'teste', escritorioId: 20 },
  })
})

test('Deve atualizar objeto', async () => {
  const response = await save({
    repository,
    data: {id: 1, nome: 'teste'},
    id: 1
  })
  expect(repository.update).toBeCalledWith({
    id: 1,
    nome: 'teste',
  }, { getId: expect.any(Function) })
  expect(response).toEqual({
    ok: true,
    data: {id: 1, nome: 'teste'}
  })
})


describe('Integração do useEntityManager com repository', () => {
  let restApi, repository
  beforeEach(() => {
    restApi = {
      get: jest.fn(async () => ({
        ok: true,
        data: {
          id: 2, nome: 'Marcos'
        },
      })),
      post: jest.fn(async () => ({
        ok: true,
        data: {
          id: 2, nome: 'Marcos'
        },
      })),
      patch: jest.fn(async () => ({
        ok: true,
        data: {
          id: 2, nome: 'Marcos'
        },
      }))
    }
    repository = createRepository({
      path: 'pessoas',
      restApi,
    })

  })
  const Form = () => {
    const hook = useEntityManager({ repository })
    const [state, setState] = useState({})
    return (
      <CrudForm {...hook}>
        <Field component={TextField} name="nome" label="nome" inputProps={{'data-testid': 'nome'}}/>
      </CrudForm>
    )
  }

  it('Deve buscar item', async () => {
    const { findByDisplayValue } = render(
      <Router initialEntries={['/pessoas/2']}>
        <Route path="/pessoas/:id" component={Form} />
      </Router>
    )

    expect(restApi.get).toBeCalledWith('pessoas/2')
    expect(await findByDisplayValue('Marcos')).toBeDefined()
  })

  it('Deve criar item', async () => {
    const { getByText, getByTestId } = render(
      <Router initialEntries={['/pessoas/new?mode=create']}>
        <Route path="/pessoas/:id" component={Form} />
      </Router>
    )

    fireEvent.change(getByTestId('nome'), { target: { value: 'Manuela' } })
    await act(async () => {
      fireEvent.click(await getByText('Salvar').closest('button'))
    })
    expect(restApi.post).toBeCalledWith('pessoas', { nome: 'Manuela' }, undefined)
  })

  it('Deve atualizar item', async () => {
    const { getByText, findByDisplayValue, getByTestId } = render(
      <Router initialEntries={['/pessoas/2?mode=edit']}>
        <Route path="/pessoas/:id" component={Form} />
      </Router>
    )

    await findByDisplayValue('Marcos')
    fireEvent.change(getByTestId('nome'), { target: { value: 'China' } })
    await act(async () => {
      fireEvent.click(await getByText('Salvar').closest('button'))
    })
    expect(restApi.patch).toBeCalledWith('pessoas/2', { id: 2, nome: 'China' }, { getId: expect.any(Function) })
  })
})
