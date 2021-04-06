import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const folhaPagamentoFuncionarioRepository = createRepository({
  path: 'folha-pagamento-funcionario',
  restApi,
  queryTransform: {
    nomeCompleto: query.ilike('nomeCompleto'),
    ...paginate
  }
})

export default folhaPagamentoFuncionarioRepository