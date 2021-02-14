import React  from 'react'
import { fetchListPure, useListRepository, removePure } from './useListRepository'
import { cleanup, render, waitForElement, fireEvent } from '@testing-library/react'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { createBasicRepository as createRepository } from '../Repository'
import {act} from 'react-dom/test-utils'

afterEach(cleanup)

let repository
beforeEach(() => {
  repository = {
    list: jest.fn(async () => ({
      ok: true,
      data: ['maria', 'jose'],
      count: 2,
    })),
    remove: jest.fn(async () => ({
      ok: true
    }))
  }
})

describe('Buscar lista no repository', () => {
  test('Default', async () => {
    const location = { search: '' }
    const response = await fetchListPure({ location, repository })
    expect(repository.list).toBeCalled()
    expect(response.ok).toBe(true)
    expect(response.data).toEqual(['maria', 'jose'])
    expect(response.count).toBe(2)
  })

  test('Com filtros', async () => {
    const location = { search: '?nome=teste' }
    const response = await fetchListPure({ location, repository })
    expect(repository.list).toBeCalledWith({
      query: { nome: 'teste' },
      paginate: {
        skip: 0,
        limit: 10,
      },
      options: {}
    })
    expect(response.ok).toBe(true)
    expect(response.data.length).toBe(2)
    expect(response.count).toBe(2)
  })

  test('Com queries', async () => {
    const location = {search: ''}
    const response = await fetchListPure({location, repository, query: [['tenantId', 1]]})
    expect(repository.list).toBeCalledWith({
      query: { tenantId: 1 },
      paginate: {
        skip: 0,
        limit: 10,
      },
      options: {}
    })
    expect(response.ok).toBe(true)
    expect(response.data.length).toBe(2)
  })

  test('Com filtros e query', async () => {
    const location = { search: '?nome=teste' }
    const response = await fetchListPure({ location, repository, query: [['tenantId', 1]] })
    expect(repository.list).toBeCalledWith({
      query: { nome: 'teste', tenantId: 1 },
      paginate: {
        skip: 0,
        limit: 10,
      },
      options: {}
    })
    expect(response.ok).toBe(true)
    expect(response.data.length).toBe(2)
    expect(response.count).toBe(2)
  })

  test('Com paginação', async () => {
    const location = { search: '?nome=teste&page=0' }
    const response = await fetchListPure({ location, repository })
    expect(repository.list).toBeCalledWith({
      query: { nome: 'teste' },
      paginate: { skip: 0, limit: 10 },
      options: {}
    })
    expect(response.ok).toBe(true)
    expect(response.data.length).toBe(2)
  })

  test('Com ordenação default', async () => {
    const location = { search: '?nome=teste&page=0' }
    const response = await fetchListPure({
      location,
      repository,
      defaultSort: 'nome',
    })
    expect(repository.list).toBeCalledWith({
      query: { nome: 'teste', sort: 'nome' },
      paginate: { skip: 0, limit: 10 },
      options: {}
    })
    expect(response.ok).toBe(true)
    expect(response.data.length).toBe(2)
  })

  test('Com ordenação da url', async () => {
    const location = { search: '?nome=teste&page=1&sort=idade' }
    const response = await fetchListPure({
      location,
      repository,
      defaultSort: 'nome',
    })
    expect(repository.list).toBeCalledWith({
      query: { nome: 'teste', sort: 'idade' },
      paginate: { skip: 10, limit: 10 },
      options: {}
    })
    expect(response.ok).toBe(true)
    expect(response.data.length).toBe(2)
  })
})

describe('Remove item', () => {
  test('Remover item pelo id', async () => {
    const item = {id: 1, nome: 'Marcos'}
    const result = await removePure({repository, item})
    expect(repository.remove).toBeCalledWith({id: 1})
    expect(result.ok).toBe(true)
    expect(result.message).toBe('Registro removido. Deseja desfazer essa ação?')
  })


  test('Remover item pelo cpf', async () => {
    const item = {cpf: '09809809888', nome: 'Marcos'}
    const result = await removePure({repository, item, getId: i => i.cpf})
    expect(repository.remove).toBeCalledWith({id: '09809809888'})
    expect(result.ok).toBe(true)
    expect(result.message).toBe('Registro removido. Deseja desfazer essa ação?')
  })


  test('Deve falhar se result for false', async () => {
    repository.remove = jest.fn(async () => ({ok: false}))
    const item = {id: 1, nome: 'Marcos'}
    const result = await removePure({repository, item})
    expect(repository.remove).toBeCalledWith({id: 1})
    expect(result.ok).toBe(false)
    expect(result.message).toBe('Não foi possível remover o registro')
  })
})

describe('Componente com hook', () => {
  const List = () => {
    const { state } = useListRepository({ repository })
    return (
      <div>
        {state.list.map(item => (
          <span key={item}>{item}</span>
        ))}
      </div>
    )
  }

  it('Deve montar lista', async () => {
    const { getByText } = render(
      <Router initialEntries={['/']}>
        <Route path="/" component={List} />
      </Router>
    )

    expect(repository.list).toBeCalled()
    await waitForElement(() => getByText('maria'))
    expect(getByText('maria')).toBeTruthy()
    expect(getByText('jose')).toBeTruthy()
  })
})

describe('Integração com repository', () => {
  let restApi, repository
  beforeEach(() => {
    restApi = {
      get: jest.fn(async () => ({
        ok: true,
        data: {
          count: 2,
          data: [{id: 1, name: 'pedro'}, {id: 2, name: 'ana'}],
        },
      })),
      patch: jest.fn(async () => ({ok : true})),
      delete: jest.fn(async () => ({ok : true})),
    }
    repository = createRepository({
      path: 'pessoas',
      restApi,
    })

  })
  const List = () => {
    const { state, removedMessage, removeItem, undoRemove } = useListRepository({ repository })
    return (
      <div>
        {state.list.map(item => (
          <div key={item.id}>
            <span>{item.name}</span>
            <button type='button' onClick={() => removeItem(item)}>Remove {item.name}</button>
          </div>
        ))}
        <button type='button' onClick={undoRemove}>Desfazer</button>
        <span>{removedMessage}</span>
      </div>
    )
  }

  it('Deve montar lista', async () => {
    const { getByText, findByText } = render(
      <Router initialEntries={['/']}>
        <Route path="/" component={List} />
      </Router>
    )

    expect(restApi.get).toBeCalled()
    expect(await findByText('pedro')).toBeDefined()
    expect(getByText('ana')).toBeDefined()
  })


  it('Deve remover item', async () => {
    const { getByText, queryByText, findByText } = render(
      <Router initialEntries={['/']}>
        <Route path="/" component={List} />
      </Router>
    )

    fireEvent.click(await findByText('Remove pedro'))
    const removedMessage = await findByText(/removido/)
    expect(removedMessage).toBeDefined()
    expect(restApi.delete).toBeCalledWith('pessoas/1')
  })


  it('Deve desfazer remoção', async () => {
    const { getByText, queryByText, findByText } = render(
      <Router initialEntries={['/']}>
        <Route path="/" component={List} />
      </Router>
    )

    fireEvent.click(await findByText('Remove pedro'))
    const removedMessage = await findByText(/removido/)
    expect(removedMessage).toBeDefined()
    expect(restApi.delete).toBeCalledWith('pessoas/1')
    //não deveria usar act aqui, porém estava aparecendo um warning por update do componente sem act
    await act(async () => {
      fireEvent.click(await findByText('Desfazer'))
    })
    expect(restApi.patch).toBeCalledWith('pessoas/1', {id: 1, deletedAt: null}, {parentId: undefined})
    expect(restApi.get).toBeCalledTimes(3)
  })
})
