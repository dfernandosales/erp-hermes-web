import React, { useEffect, useState } from 'react'
import PropsTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import * as R from 'ramda'
import classNames from 'classnames'
import styles from './BreadcrumbStyles'
import Typography from '@material-ui/core/Typography'
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import { getBreadcrumbConfig } from './BreadCrumbUtils'

const useStyles = makeStyles(styles)

const Breadcrumb = props => {
  const [parts, setParts] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const parts = getBreadcrumbConfig(props.history.location.pathname) || []
    setParts(parts)
  }, [props.history.location.pathname])

  const navigate = (path) => {
    props.history.push(`/${path}`)
  }

  const getLabel = (part, index) => {
    switch (true) {
      case part.isId:
        if (index === 1) { return R.pathOr(part.pathPart, ['info', 'label'], props) }
        return part.pathPart
      case part.pathPart === 'new' || part.pathPart === 'new-child':
        return 'Novo'
      case part.pathPart === 'view':
        return 'Visualizar'
      default:
        const key = Object.keys(props.pathReadableMap).find(key => key.split("?")[0] === part.pathPart);
        if (props.pathReadableMap[key]) {
          return props.pathReadableMap[key]
        } else {
          return part.pathPart.replace(/-/g, ' ')
        }
    }
  }

  const renderPart = (part, index) => {
    return (
      <Typography
        className={classNames(classes.part, part.isCurrentPath && classes.currentPath)}
        type={index === 0 ? 'subtitle1' : 'caption'}
        onClick={() => navigate(part.path)}
        key={part.pathPart}
      >
        {getLabel(part, index)}
        {!part.isFinalPath && <ArrowIcon className={classes.separator} />}
      </Typography>)
  }

  return (
    <div className={classNames(classes.root)}>
      {
        parts.map(renderPart)
      }
    </div>
  )
}
Breadcrumb.propTypes = {
  /** Pathname source used to get the label, normally got from useHistory */
  history: PropsTypes.shape({
    location: PropsTypes.shape({
      pathname: PropsTypes.string.isRequired,
    }).isRequired,
    push: PropsTypes.func.isRequired,
  }).isRequired,
  /** Label to show at breadcrumb, it will only show when the identifier is
   * the second element on path
   */
  info: PropsTypes.shape({
    label: PropsTypes.string,
  }),
  /** Map a path name to readable name */
  pathReadableMap: PropsTypes.object,
}
Breadcrumb.defaultProps = {
  pathReadableMap: {},
}

export default Breadcrumb
