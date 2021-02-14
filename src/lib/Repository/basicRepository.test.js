import create from './basicRepository'

let restApi
beforeEach(() => {
  restApi = {
    post: jest.fn(async (path, data) => ({
      ok: true,
      data: { id: 1, ...data },
    })),
    put: jest.fn(async (path, data) => ({
      ok: true,
      data,
    })),
    get: jest.fn(async () => ({
      ok: true,
      data: {
        data: [],
        total: 0,
      },
    })),
    patch: jest.fn(async (path, data) => ({
      ok: true,
      data,
    })),
    delete: jest.fn(async () => ({
      ok: true,
      data: {
        data: {},
      },
    })),
  }
})

test('Deve lançar erro por não passar restApi', async () => {
  expect(() => {
    create({ path: 'pessoas' })
  }).toThrowError('restApi')
})

test('Deve lançar erro por não passar path', async () => {
  expect(() => {
    create({ restApi })
  }).toThrowError('path')
})

describe('Buscas', () => {
  test('Deve buscar um item', async () => {
    const repository = create({ path: 'pessoas', restApi })
    await repository.getOne({ id: 1 })
    expect(restApi.get).toBeCalledWith('pessoas/1')
  })
  test('Deve buscar um item na uri root mesmo com parentid', async () => {
    const repository = create({ path: 'pessoas', restApi })
    await repository.getOne({ id: 1, parentId: 10 })
    expect(restApi.get).toBeCalledWith('pessoas/1')
  })
  test('Deve buscar um item com relacionamento de path', async () => {
    const repository = create({
      parentPath: 'pessoas',
      path: 'contatos',
      restApi,
      relationType: 'path',
    })
    await repository.getOne({ id: 1, parentId: 10 })
    expect(restApi.get).toBeCalledWith('pessoas/10/contatos/1')
  })

  test('Deve buscar um item com include', async () => {
    const queryTransform = {
      include: values => {
        return values.map(value => {
          return [`$include[${value}]`, 1]
        })
      }
    }
    const repository = create({ path: 'pessoas', restApi, queryTransform })
    await repository.getOne({ id: 1, query: {include: ['endereco']} })
    expect(restApi.get).toBeCalledWith(
      `pessoas/1?${new URLSearchParams('$include[endereco]=1')}`
    )
  })

  test('Deve buscar lista de itens na api rest', async () => {
    const repository = create({ path: 'pessoas', restApi })
    const response = await repository.list()
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith('pessoas')
  })

  test('Deve buscar lista de itens na api rest com falha no request', async () => {
    const restApi = {
      get: jest.fn(async () => ({ ok: false, data: {} })),
    }
    const repository = create({ path: 'pessoas', restApi })
    const response = await repository.list()
    expect(response.ok).toBe(false)
    expect(response.data).toEqual({})
    expect(response.count).toBe(undefined)
    expect(restApi.get).toBeCalledWith('pessoas')
  })

  test('Deve buscar lista de itens na api rest com filtro', async () => {
    const repository = create({ path: 'pessoas', restApi })
    const response = await repository.list({
      query: {
        name: 'test',
      },
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith('pessoas?name=test')
  })

  test('Deve buscar lista de itens na api rest com filtro like', async () => {
    const queryTransform = {
      name: value => ['name[$like]', `%${value}%`],
    }
    const repository = create({ path: 'pessoas', restApi, queryTransform })
    const response = await repository.list({
      query: {
        name: 'test',
      },
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith(
      `pessoas?${new URLSearchParams('name[$like]=%test%')}`
    )
  })

  test('Deve buscar lista de itens na api rest dois filtros a partir de um valor', async () => {
    const queryTransform = {
      name: value => [
        ['name[$like]', `%${value}%`],
        ['name[$ne]', 'outro'],
      ],
    }
    const repository = create({ path: 'pessoas', restApi, queryTransform })
    const response = await repository.list({
      query: {
        name: 'test',
      },
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith(
      `pessoas?${new URLSearchParams('name[$like]=%test%&name[$ne]=outro')}`
    )
  })

  test('Deve buscar lista de itens na api rest com paginação', async () => {
    const queryTransform = {
      skip: value => ['$skip', value],
      limit: value => ['$limit', value],
    }
    const repository = create({ path: 'pessoas', restApi, queryTransform })
    const response = await repository.list({
      paginate: {
        limit: 10,
        skip: 10,
      },
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith(
      `pessoas?${new URLSearchParams('$limit=10&$skip=10')}`
    )
  })

  test('Deve buscar lista de itens na api rest com paginação e filtro', async () => {
    const queryTransform = {
      skip: value => ['$skip', value],
      limit: value => ['$limit', value],
    }
    const repository = create({ path: 'pessoas', restApi, queryTransform })
    const response = await repository.list({
      paginate: {
        limit: 10,
        skip: 10,
      },
      query: {
        name: 'test',
      },
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith(
      `pessoas?${new URLSearchParams('name=test&$limit=10&$skip=10')}`
    )
  })

  test('Deve buscar lista de itens na api rest com paginação e filtro e include', async () => {
    const queryTransform = {
      skip: value => ['$skip', value],
      limit: value => ['$limit', value],
      include: values => {
        return values.map(value => {
          return [`$include[${value}]`, 1]
        })
      }
    }
    const repository = create({ path: 'pessoas', restApi, queryTransform })
    const response = await repository.list({
      paginate: {
        limit: 10,
        skip: 10,
      },
      query: {
        name: 'test',
        include: ['endereco', 'telefone']
      },
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith(
      `pessoas?${new URLSearchParams('name=test&$include[endereco]=1&$include[telefone]=1&$limit=10&$skip=10')}`
    )
  })

  test('Deve fazer a busca relacionada a uma entidade pai', async () => {
    const repository = create({
      parentPath: 'pessoas',
      path: 'telefones',
      restApi,
    })
    const response = await repository.list({
      parentId: 10,
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith('pessoas/10/telefones')
  })

  test('Deve fazer a busca relacionada a uma entidade pai por query', async () => {
    const queryTransform = {
      parentId: value => ['pessoaId', `${value}`],
    }
    const repository = create({
      parentPath: 'pessoas',
      relationType: 'query',
      path: 'telefones',
      restApi,
      queryTransform,
    })
    const response = await repository.list({
      parentId: 10,
    })
    expect(response.ok).toBe(true)
    expect(response.data).toEqual([])
    expect(response.count).toEqual(0)
    expect(restApi.get).toBeCalledWith('telefones?pessoaId=10')
  })
})

describe('Remove', () => {
  test('Deve remover o registry pela sua uri sem parent', async () => {
    const repository = create({
      path: 'telefones',
      restApi,
    })
    const response = await repository.remove({ id: 100 })
    expect(response.ok).toBe(true)
    expect(restApi.delete).toBeCalledWith('telefones/100')
  })

  test('Deve remover item pela sua URI', async () => {
    const repository = create({
      parentPath: 'pessoas',
      path: 'telefones',
      restApi,
    })
    const response = await repository.remove({ id: 100, parentId: 4 })
    expect(response.ok).toBe(true)
    expect(restApi.delete).toBeCalledWith('pessoas/4/telefones/100')
  })

  test('Remover deve falhar se não for passado o id', async () => {
    const repository = create({
      parentPath: 'pessoas',
      path: 'telefones',
      restApi,
      queryTransform: {},
    })
    expect(repository.remove({})).rejects.toThrow()
  })
})

describe('Create and update', () => {
  test('Deve fazer post com sucesso', async () => {
    const repository = create({
      path: 'pessoas',
      restApi,
    })
    const response = await repository.create({ nome: 'teste' })
    expect(restApi.post).toBeCalledWith('pessoas', { nome: 'teste' }, undefined)
    expect(response).toEqual({
      ok: true,
      data: { id: 1, nome: 'teste' },
    })
  })

  test('Deve fazer put com sucesso', async () => {
    const repository = create({
      path: 'pessoas',
      restApi,
    })
    const response = await repository.update({ id: 2, nome: 'teste' })
    expect(restApi.patch).toBeCalledWith(
      'pessoas/2',
      { id: 2, nome: 'teste' },
      undefined
    )
    expect(response).toEqual({
      ok: true,
      data: { id: 2, nome: 'teste' },
    })
  })
})
