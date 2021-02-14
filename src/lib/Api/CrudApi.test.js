import {getCount, getPage, getWhereFilter, handleDelete, handleDeleteF, ListApi, undo} from './CrudApi'

let api
beforeEach(() => {
  api = {
    getList: jest.fn(async () => ({ok: true, data: []})),
    getRelationList: jest.fn(async () => ({ok: true, data: []})),
    getCount: jest.fn(async () => ({ok: true, data: {count: 100}})),
    getRelationCount: jest.fn(async () => ({ok: true, data: {count: 100}})),
    remove: jest.fn(async (_, data) => ({ok: true, data})),
    removeRelation: jest.fn(async (_, data) => ({ok: true, data})),
    undoRemove: jest.fn(async (_, data) => ({ok: true, data})),
    undoRemoveRelation: jest.fn(async (_, data) => ({ok: true, data})),
    deleteF: jest.fn(async (_, data) => ({ok: true, data})),
    deleteFRelation: jest.fn(async (_, data) => ({ok: true, data})),
  }
})

it('Deve fazer busca de lista para o primeiro nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas'}
  const result = await getPage({api, location})
  expect(api.getRelationList).not.toBeCalled()
  expect(api.getList).toBeCalledWith({
    limit: undefined,
    order: undefined,
    skip: undefined,
    offset: undefined,
    where: {}
  })
  expect(result).toEqual([])
})

it('Deve fazer busca de lista para o segundo nivel, rota relacionada ao paui', async () => {
  const location = {pathname: '/pessoas/1/contatos'}
  const result = await getPage({api, location})
  expect(api.getList).not.toBeCalled()
  expect(api.getRelationList).toBeCalledWith({
    location,
    limit: undefined,
    order: undefined,
    skip: undefined,
    where: {}
  })
  expect(result).toEqual([])
})

it('Deve montar filtro para query no backend', () => {
  const where = getWhereFilter({nome: 'teste'}, {deleted: false}, {})
  expect(where).toEqual({nome: 'teste', deleted: false})
})

it('Deve montar filtro para query no backend com filtro do componente', () => {
  const where = getWhereFilter({nome: 'teste'}, {filter: {deleted: false}, offset: 10, limit: 5}, {})
  expect(where).toEqual({nome: 'teste', deleted: false})
})

it('Deve montar filtro para query no backend com configuração de filtro', () => {
  const where = getWhereFilter({pessoaId: {id: 10}}, {deleted: false}, {pessoaId: p => p.id})
  expect(where).toEqual({pessoaId: 10, deleted: false})
})

it('Deve fazer busca de lista com  filtro', async () => {
  const location = {pathname: '/pessoas'}
  const result = await getPage({api, location, where: {deleted: false}})
  expect(api.getList).toBeCalledWith({
    limit: undefined,
    order: undefined,
    skip: undefined,
    offset: undefined,
    where: {deleted: false}
  })
  expect(result).toEqual([])
})

it('getPage deve funcionar como esperado', async () => {
  const children = async ({getPage}) => {
    const result = await getPage({location: {pathname: '/pessoas'}})
    const resultRelation = await getPage({location: {pathname: '/pessoas/1/contatos'}})
    expect(result).toEqual([])
    expect(resultRelation).toEqual([])
  }
  await ListApi({api, children})
})

it('getCount deve funcioar corretamente', async () => {
  const result = await getCount(api, {})({filter: {}})
  expect(api.getCount).toBeCalledWith({where: {}})
  expect(result).toBe(100)
})

it('getCount deve funcioar corretamente para rota de relacionamento', async () => {
  const location = {pathname: '/pessoas/10/contatos'}
  const result = await getCount(api, {})({location, filter: {ativo: true}})
  expect(api.getRelationCount).toBeCalledWith({
    filter: {
      where: {ativo: true}
    },
    location,
  })
  expect(result).toBe(100)
})

it('getCount deve retornar 0 quando houver erro na api', async () => {
  const api = {getCount: jest.fn(async () => ({ok: false}))}
  const result = await getCount(api, {})({filter: {page: 1, rowsPerPage: 10, order: 'nome'}})
  expect(api.getCount).toBeCalledWith({
    where: {
      page: 1,
      rowsPerPage: 10,
      order: 'nome'
    }
  })
  expect(result).toBe(0)
})

it('getCount deve funcioar corretamente', async () => {
  const result = await getCount(api, {})({filter: {page: 1, rowsPerPage: 10, order: 'nome'}})
  expect(api.getCount).toBeCalledWith({
    where: {
      page: 1,
      rowsPerPage: 10,
      order: 'nome'
    }
  })
  expect(result).toBe(100)
})

it('getCount deve funcionar como esperado pelo ListApi', async () => {
  const children = async ({getCount}) => {
    const result = await getCount({}, {pathname: '/pessoas'})
    expect(result).toEqual(100)
  }
  await ListApi({api, children})
})

it('Deve fazer remove de lista para o primeiro nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas'}
  const result = await handleDelete(api)({id: 1}, location)
  expect(api.removeRelation).not.toBeCalled()
  expect(api.remove).toBeCalledWith(1)
  expect(result).toEqual({item: {id: 1}, message: 'Item removido. Deseja desfazer alteração?', ok: true})
})

it('Deve fazer remove de lista para o segundo nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const result = await handleDelete(api)({id: 1}, location)
  expect(api.remove).not.toBeCalled()
  expect(api.removeRelation).toBeCalledWith(1, {location})
  expect(result).toEqual({item: {id: 1}, message: 'Item removido. Deseja desfazer alteração?', ok: true})
})

it('Deve fazer undo remove de lista para o primeiro nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas'}
  const result = await undo(api)({id: 1}, location)
  expect(api.undoRemoveRelation).not.toBeCalled()
  expect(api.undoRemove).toBeCalledWith(1)
  expect(result).toEqual({ok: true})
})

it('Deve fazer undo remove de lista para o segundo nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const result = await undo(api)({id: 1}, location)
  expect(api.undoRemove).not.toBeCalled()
  expect(api.undoRemoveRelation).toBeCalledWith(1, {location})
  expect(result).toEqual({ok: true})
})

it('Deve fazer delete de lista para o primeiro nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas'}
  const result = await handleDeleteF(api)({id: 1}, location)
  expect(api.deleteFRelation).not.toBeCalled()
  expect(api.deleteF).toBeCalledWith(1)
  expect(result).toEqual({message: 'Item removido!', ok: true})
})

it('Deve fazer delete de lista para o segundo nivel, rota raiz', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const result = await handleDeleteF(api)({id: 1}, location)
  expect(api.deleteF).not.toBeCalled()
  expect(api.deleteFRelation).toBeCalledWith(1, {location})
  expect(result).toEqual({message: 'Item removido!', ok: true})
})
