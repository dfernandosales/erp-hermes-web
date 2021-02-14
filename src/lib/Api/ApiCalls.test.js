import {apiCrudFactory} from './ApiCalls'

let api
let pessoasApi
beforeEach(() => {
  api = {
    get: jest.fn(async () => ({ok: true, data: []})),
    post: jest.fn(async (_, data) => ({ok: true, data})),
    patch: jest.fn(async (_, data) => ({ok: true, data})),
    delete: jest.fn(async (_, data) => ({ok: true, data})),
  }
  pessoasApi = apiCrudFactory({api})('pessoas')
})


it('Deve fazer busca por rota de relacionamento', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const response = await pessoasApi.getRelationList({location})
  expect(api.get).toBeCalledWith('pessoas/1/enderecos', {filter: {}})
  expect(response.ok).toBeTruthy()
})

it('Deve fazer busca por rota de relacionamento, mesmo que pathname tenha base com outro nome', async () => {
  const location = {pathname: '/pessoas-outros/1/enderecos'}
  const response = await pessoasApi.getRelationList({location})
  expect(api.get).toBeCalledWith('pessoas/1/enderecos', {filter: {}})
  expect(response.ok).toBeTruthy()
})

it('geList do pai deve ser chamado com sucesso', async () => {
  const response = await pessoasApi.getList()
  expect(api.get).toBeCalledWith('pessoas', {filter: {}})
  expect(response.ok).toBeTruthy()
  expect(response.data).toEqual([])
})

it('get deve ser chamado sem o / no inicio', async () => {
  const pessoasApi = apiCrudFactory({api})('/pessoas')
  const response = await pessoasApi.getList()
  expect(api.get).toBeCalledWith('pessoas', {filter: {}})
  expect(response.ok).toBeTruthy()
  expect(response.data).toEqual([])
})


it('post deve ser chamado com sucesso', async () => {
  const response = await pessoasApi.create({nome: 'teste'})
  expect(api.post).toBeCalledWith('pessoas', {nome: 'teste'})
  expect(response.ok).toBeTruthy()
  expect(response.data).toEqual({nome: 'teste'})
})

it('Deve chamar getCount com sucesso', async () => {
  await pessoasApi.getCount()
  expect(api.get).toBeCalledWith('pessoas/count', {})
})

it('Deve chamar getRelationCount com sucesso', async () => {
  const location = {pathname: '/pessoas/10/contatos'}
  await pessoasApi.getRelationCount({location, filter: {}})
  expect(api.get).toBeCalledWith('pessoas/10/contatos/count', {})
})

it('Deve fazer remove por rota de relacionamento', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const response = await pessoasApi.removeRelation(1,{location})
  expect(api.patch).toBeCalledWith('pessoas/1/enderecos/1', {removed: true})
  expect(response.ok).toBeTruthy();
})

it('Deve fazer remove sem rota de relacionamento', async () => {
  const response = await pessoasApi.remove(1)
  expect(api.patch).toBeCalledWith('pessoas/1', {removed: true})
  expect(response.ok).toBeTruthy();
})

it('Deve fazer undo remove por rota de relacionamento', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const response = await pessoasApi.undoRemoveRelation(1,{location})
  expect(api.patch).toBeCalledWith('pessoas/1/enderecos/1', {removed: false})
  expect(response.ok).toBeTruthy();
})

it('Deve fazer undo remove sem rota de relacionamento', async () => {
  const response = await pessoasApi.undoRemove(1)
  expect(api.patch).toBeCalledWith('pessoas/1', {removed: false})
  expect(response.ok).toBeTruthy();
})

it('Deve fazer delete por rota de relacionamento', async () => {
  const location = {pathname: '/pessoas/1/enderecos'}
  const response = await pessoasApi.deleteFRelation(1,{location})
  expect(api.delete).toBeCalledWith('pessoas/1/enderecos/1')
  expect(response.ok).toBeTruthy();
})

it('Deve fazer delete sem rota de relacionamento', async () => {
  const response = await pessoasApi.deleteF(1)
  expect(api.delete).toBeCalledWith('pessoas/1')
  expect(response.ok).toBeTruthy();
})
