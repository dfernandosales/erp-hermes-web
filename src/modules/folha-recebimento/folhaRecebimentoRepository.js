import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const folhaRecebimentoRepository = createRepository({
  path: 'folha-recebimento',
  restApi,
  queryTransform: {
    descricao: query.ilike('descricao'),
    data: query.ilike('data'),
    valor: query.ilike('valor'),
    ...paginate
  }
})

export default folhaRecebimentoRepository
