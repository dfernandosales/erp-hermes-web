import {recoverValues, makeUrl} from './useFilter'

describe('recoverValues', () => {

  test('Deve montar objeto com search da url', () => {
    const search = '?nome=teste&idade=25'
    expect(recoverValues(search)).toEqual({
      nome: 'teste',
      idade: '25'
    })
  })

  test('Deve tratar parametros booleanos da url', () => {
    const search = '?underAge=true&male=false'
    expect(recoverValues(search)).toEqual({
      underAge: true,
      male: false
    })
  })

  test('Não deve montas filtro', () => {
    expect(recoverValues('')).toEqual({})
  })
})

describe('makeUrl', () => {
  test('Deve montar url', () => {
    const history = {
      location: {pathname: '/pessoas', search: ''}
    }
    const values = {
      nome: 'teste',
      idade: 1
    }
    const params = new URLSearchParams({nome: 'teste', idade: 1})
    expect(makeUrl(history, values)).toBe(`/pessoas?${params}`)
  })


  test('Deve montar url parâmetros de paginação', () => {
    const history = {
      location: {pathname: '/pessoas', search: '?sort=nome&skip=0&limit=10'}
    }
    const values = {
      nome: 'teste',
      idade: 1
    }
    const params = new URLSearchParams({nome: 'teste', idade: 1, sort: 'nome', skip:0, limit: 10})
    expect(makeUrl(history, values)).toBe(`/pessoas?${params}`)
  })
})
