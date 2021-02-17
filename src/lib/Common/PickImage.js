import React from 'react'

function readAsDataURL (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      resolve(event.target.result)
    }
    reader.onerror = event => {
      console.error('error on read file', event.target)
      reject(event.target.result)
      reader.abort()
    }
    reader.readAsDataURL(file)
  })
}

const processFiles = files => {
  return files.map(async file => {
    const dataURL = await readAsDataURL(file)
    return {
      file,
      dataURL
    }
  })
}

export default function PickImage ({
  children,
  multiple,
  beforeOnChange,
  onChange,
  id,
  ...props
}) {
  return (
    <div>
      <input
        accept='image/*'
        style={{ display: 'none' }}
        id={id}
        multiple={multiple}
        onChange={event => {
          beforeOnChange && beforeOnChange(event)

          Promise.all(processFiles([...event.target.files])).then(onChange)
          event.target.value = null
        }}
        type='file'
        {...props}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}
