import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { paginate } from '../../lib/feathers'

const relatorioReservaRepository = createRepository({
  path: 'relatorio-reserva',
  restApi,
  queryTransform: {
    ...paginate
  }
});

export default relatorioReservaRepository