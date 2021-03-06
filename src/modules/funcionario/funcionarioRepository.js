import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const funcionarioRepository = createRepository({
  path: 'funcionario',
  restApi,
  queryTransform: {
    nomeCompleto: query.ilike('nomeCompleto'),
    email: query.ilike('email'),
    telefone: query.ilike('telefone'),
    cpf: query.ilike('cpf'),
    ...paginate
  }
})

export default funcionarioRepository
