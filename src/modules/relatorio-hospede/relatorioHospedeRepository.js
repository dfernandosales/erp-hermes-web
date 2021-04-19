import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const relatorioHospedeRepository = createRepository({
  path: 'relatorio-hospede',
  restApi,
  queryTransform: {
    ...paginate
  }
});

export default relatorioHospedeRepository
