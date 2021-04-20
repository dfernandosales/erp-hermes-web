import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const pagamentoRepository = createRepository({
  path: 'pagamento',
  restApi,
  queryTransform: {
    descricao: query.ilike('descricao'),
    valor: query.ilike('valor'),
    dataPagamento: query.ilike('dataPagamento'),
    ...paginate
  }
})

export default pagamentoRepository
