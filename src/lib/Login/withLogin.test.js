import {validate, handleSubmit} from './LoginLib'

describe('withLogin', () => {
  it ('Deve fazer a validação correta dos campos de login', () => {
    const validation = validate('Obrigatório')({
      username: 'teste',
      password: 'senha'
    })

    expect(validation).toEqual({})
  })

  it('Deve validar quando não passar username', () => {

    const validation = validate('Obrigatório')({
      password: 'senha'
    })

    expect(validation).toEqual({
      username: 'Obrigatório'
    })
  })

  it('Deve validar quando não passar uma senha', () => {
    const validation = validate('Obrigatório')({
      username: 'teste'
    })

    expect(validation).toEqual({
      password: 'Obrigatório'
    })
  })

  it('Deve fazer login com sucesso', async() => {
    const handleUserLogin = jest.fn()
    const onSubmit = async() => {
      return {
        ok: true,
        token: 'hfaso132jfdosaopjsa#fsafsa'
      }
    }
    const credentials = {}

    const result = await handleSubmit({handleUserLogin, credentials, console: {}, onSubmit})
    expect(handleUserLogin).toBeCalledWith({
      ok: true,
      token: 'hfaso132jfdosaopjsa#fsafsa'
    })
    expect(result).toBeUndefined()
  })

  it('Deve dar erro de autenticação', async() => {
    const handleUserLogin = jest.fn()
    const onSubmit = async() => {
      return {ok: false}
    }
    const credentials = {}
    const result = await handleSubmit({handleUserLogin, credentials, console: {}, onSubmit})
    expect(result).toEqual({error: 'Usuário ou senha inválidos'})
  })

  it('Deve apresentar um warn quando o login não estiver configurado corretamente', async () => {
    const console = {warn: jest.fn()}
    const onSubmit = async() => {
      return {ok: true, token: '123'}
    }
    const credentials = {}
    await handleSubmit({onSubmit, credentials, console})
    expect(console.warn).toBeCalledWith('Login Context not found')
  })


})


