import { AbilityBuilder } from '@casl/ability'

const subjectName = subject =>
  !subject || typeof subject === 'string' ? subject : subject.__type

export default usuario => {
  return AbilityBuilder.define({ subjectName }, (can, cannot) => {
    if (!usuario) return

    if (usuario.role?.includes('ADMIN')) {
      can('manage', 'all')
    }
    if (usuario.role?.includes('FUNC')) {
      cannot('manage', 'usuarios')
      //Colocar aqui as permissoes para o usuario tipo FUNC como descritas no documento
      // can('read', 'quartos')
    }
  })
}
