import React from 'react'
import { DateTimePicker } from '@material-ui/pickers'
// import 'moment/locale/pt'

const locale = {
  pt: 'pt'
}

export default function DateTimePickerField ({ input, meta, ...props }) {
  return (
    <DateTimePicker
      {...props}
      keyboard
      clearable
      locale={locale}
      format='DD/MM/YYYY HH:mm'
      mask={value =>
        value
          ? [
              /\d/,
              /\d/,
              '/',
              /\d/,
              /\d/,
              '/',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ':',
              /\d/,
              /\d/
            ]
          : []}
      value={input.value || null}
      error={meta.touched && !!meta.error}
      onError={() => input.onChange(null)}
      helperText={meta.touched && meta.error}
      onChange={date => {
        input.onChange(date ? date.toISOString() : undefined)
      }}
      disableOpenOnEnter
      animateYearScrolling={false}
      ampm={false}
      cancelLabel='Cancelar'
      clearLabel='Limpar'
      okLabel='OK'
    />
  )
}
