import config from '../config'
import { create } from 'apisauce'

export const restApi = create({
  baseURL: config.baseURL
})

const getApi = () => {
  return {
    setToken: token => restApi.setHeader('Authorization', `Bearer ${token}`),
    ping: idUsuario => restApi.get(`/users/${idUsuario}`),
    login: credentials =>
      restApi.post('/authentication', {
        strategy: 'local',
        ...credentials
      }),
    logout: () => restApi.delete('/authentication'),
    resetPassword: data => restApi.post('/account', data)
  }
}

export default getApi()
