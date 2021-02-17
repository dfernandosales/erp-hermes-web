import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import PickImage from './PickImage'

const styles = () => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    color: '#fff'
  },
  darken: {
    filter: 'gray' /* IE6-9 */,
    '-webkit-filter':
      'brightness(40%)' /* Chrome 19+, Safari 6+, Safari 6+ iOS */,
    transition: 'filter 0.5s'
  },
  normal: {
    filter: 'gray' /* IE6-9 */,
    '-webkit-filter':
      'brightness(100%)' /* Chrome 19+, Safari 6+, Safari 6+ iOS */,
    transition: 'filter 0.5s'
  },
  avatarControlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

const EditControls = ({ classes, id, onChange, ...props }) => (
  <div {...props} className={classes.avatarControlsContainer}>
    <PickImage onChange={onChange} id={id}>
      <IconButton component='span' className={classes.iconButton}>
        <EditIcon />
      </IconButton>
    </PickImage>
    <IconButton
      onClick={() => onChange && onChange(undefined)}
      className={classes.iconButton}
    >
      <DeleteIcon />
    </IconButton>
  </div>
)

const NewControls = ({ classes, onChange, id, ...props }) => (
  <div {...props} className={classes.avatarControlsContainer}>
    <PickImage onChange={onChange} id={id}>
      <IconButton component='span' className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </PickImage>
  </div>
)
function ImagePicker ({
  classes,
  id = 'image-pick',
  value,
  defaultImage,
  onChange,
  component = 'img',
  size,
  width
}) {
  const hasValue = !!value
  const Component = component
  const [showControls, changeShowControls] = useState(false)
  const getStringData = () => {
    if (typeof value === 'string') return value
    return value[0].dataURL
  }
  useEffect(() => {
    value && changeShowControls(false)
  }, [value])
  return (
    <div style={{ position: 'relative', height: size, width: size || width }}>
      <Component
        onError={() => onChange(null)}
        onMouseEnter={() => changeShowControls(true)}
        onMouseLeave={() => changeShowControls(false)}
        src={hasValue ? getStringData() : defaultImage}
        style={{ height: size, width: size || width }}
        className={showControls ? classes.darken : classes.normal}
      />
      {showControls && !hasValue && (
        <NewControls
          classes={classes}
          id={id}
          onChange={onChange}
          onMouseEnter={() => changeShowControls(true)}
          onMouseLeave={() => changeShowControls(false)}
        />
      )}
      {showControls && hasValue && (
        <EditControls
          onChange={onChange}
          id={id}
          classes={classes}
          onMouseEnter={() => changeShowControls(true)}
          onMouseLeave={() => changeShowControls(false)}
        />
      )}
    </div>
  )
}

function ImagePickerField ({ input, label, ...props }) {
  return (
    <div>
      {label ? <InputLabel htmlFor='my-input'>{label}</InputLabel> : null}
      <div style={{ marginTop: 8 }} />
      <ImagePicker
        {...props}
        id={input.name}
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  )
}

export default withStyles(styles)(ImagePickerField)
