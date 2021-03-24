import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const ocupacaoRepository = createRepository({
  path: 'ocupacao-chart',
  restApi,
  queryTransform: {
    ...paginate
  }
})

export default ocupacaoRepository
