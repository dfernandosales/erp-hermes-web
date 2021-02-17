import React from 'react'
import { DatePicker } from 'material-ui-pickers'
import 'moment/locale/pt'

export default function DatePickerField ({ input, meta, ...props }) {
  return (
    <DatePicker
      {...props}
      keyboard
      clearable
      locale={{
        pt: 'pt'
      }}
      format='DD/MM/yyyy'
      mask={value =>
        value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []}
      value={input.value || null}
      error={meta.touched && !!meta.error}
      onError={() => input.onChange(null)}
      helperText={meta.touched && meta.error}
      onChange={date => {
        input.onChange(date ? date.toISOString() : undefined)
      }}
      disableOpenOnEnter
      animateYearScrolling={false}
      cancelLabel='Cancelar'
      clearLabel='Limpar'
      okLabel='OK'
    />
  )
}
