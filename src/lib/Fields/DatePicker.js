import React from 'react'
import { DatePicker } from '@material-ui/pickers'
//import 'moment/locale/pt'

const locale = {
  pt: 'pt',
}

export default function DatePickerField({ input, meta, ...props }) {
  return (
    <DatePicker
      {...props}
      keyboard
      clearable
      locale={locale}
      format="DD/MM/YYYY"
      mask={value =>
        value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
      }
      value={input.value || null}
      error={meta.touched && !!meta.error}
      onError={() => input.onChange(null)}
      helperText={meta.touched && meta.error}
      onChange={date => {
        input.onChange(date ? date.toISOString() : undefined)
      }}
      onBlur={input.onBlur}
      disableOpenOnEnter
      animateYearScrolling={false}
      cancelLabel="Cancelar"
      clearLabel="Limpar"
      okLabel="OK"
    />
  )
}
