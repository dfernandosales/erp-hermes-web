import React, { useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import Popper from '@material-ui/core/Popper'
import { drawerWidth, drawerClosedWidth } from './AppWrapStyles'
import Typography from '@material-ui/core/Typography'

const popperWidth = 200
const useStyles = makeStyles(theme => ({
  menuColor: {
    color: theme.palette.grey[500]
  },
  menuColorActive: {
    color: theme.palette.common.white
  },
  menuColorActiveLight: {
    color: theme.palette.grey[900]
  },
  divider: {
    backgroundColor: '#9D9C9D'
  },
  active: {
    borderLeft: `solid 3px ${theme.palette.primary.main}`,
    borderImageSlice: 1
  },
  popper: {
    width: popperWidth,
    marginLeft: drawerClosedWidth - drawerWidth + 0.5,
    zIndex: 1500
  },
  popperTitle: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
  },
  popperArrow: {
    position: 'absolute',
    left: -5,
    top: '50%',
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderRight: '5px solid white',
    zIndex: 1500
  },
  menuList: {
    marginTop: -10
  },
  menuItem: {
    fontSize: 14
  }
}))

const enumTheme = {
  DARK: 'dark',
  LIGHT: 'light'
}

const MenuItems = ({ items, classes: menuItemsClasses, theme: themeName, popperOpen, onMenuItemClick, expanded }) => {
  const classes = useStyles()
  const location = useLocation()
  const [openSubmenu, setOpenSubmenu] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [popperLabel, setPopperLabel] = useState('')

  const handleClosePopper = () => setAnchorEl(null)

  const handleGroupClick = label => () => {
    handleClosePopper()
    onMenuItemClick(label)
    setOpenSubmenu(openSubmenu === label ? '' : label)
  }

  const handleOpenPopper = (event, label) => {
    setPopperLabel(label)
    if (anchorEl !== event.currentTarget) setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    if (!popperOpen) handleClosePopper()
  }, [popperOpen])

  useEffect(() => {
    if (!expanded) setOpenSubmenu('')
  }, [expanded])

  const renderPopper = item => {
    return (
      <Popper
        className={
          classNames(
            classes.popper,
            menuItemsClasses && menuItemsClasses.popper
          )}
        placement='right'
        anchorEl={anchorEl}
        open={popperOpen && Boolean(anchorEl)}
        onClose={handleClosePopper}>

        <Paper>
          <div className={classNames(classes.popperArrow,
            menuItemsClasses && menuItemsClasses.popperArrow
          )}></div>
          {item.label === popperLabel ?
            <Typography className={classNames(
              classes.popperTitle,
              menuItemsClasses && menuItemsClasses.popperTitle
            )}>{item.label}</Typography> : null
          }
          {item.group && popperLabel === item.label ? renderMenuItem(item) : null}
        </Paper>

      </Popper>
    )
  }

  const renderMenuItem = item => {
    return (
      <div className={classes.menuList}>
        <MenuList>
          {item.items.map((i) => {
            return (
              <MenuItem
                className={classes.menuItem}
                key={i.label}
                onClick={handleClosePopper}
                component={Link}
                to={i.pathname}>{i.label}</MenuItem>)
          })}
        </MenuList>
      </div>
    )
  }

  const renderItem = (item, key) => {
    if (item.group) {
      return (
        <div
          key={item.label}
          className={
            classNames(
              classes.menuColor,
              menuItemsClasses && menuItemsClasses.menuColor
            )}>
          <ListItem
            button
            onClick={!popperOpen ? handleGroupClick(item.label) : null}
            onMouseOver={(event => handleOpenPopper(event, item.label))}
          >
            {item.icon && (
              <ListItemIcon
                classes={{
                  root: menuItemsClasses ? menuItemsClasses.menuColor : classes.menuColor
                }}>
                <item.icon />
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label} classes={{ primary: menuItemsClasses ? menuItemsClasses.menuColor : classes.menuColor }} />
            {openSubmenu === item.label ? <ExpandLess color='inherit' /> : <ExpandMore color='inherit' />}
          </ListItem>
          <Collapse in={!popperOpen ? openSubmenu === item.label : false} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {item.items.map(renderListItem, true)}
            </List>
          </Collapse>
          {renderPopper(item)}
        </div>
      )
    }

    return renderListItem(item, key)
  }

  const renderListItem = (item, key, isSubMenu) => {
    const active =
      `/${location.pathname.split('/')[1]}` === item.pathname.split('?')[0] ||
      location.pathname === item.pathname

    let activeColor = classes.menuColorActive
    if (themeName === enumTheme.LIGHT) {
      activeColor = classes.menuColorActiveLight
    }
    if (menuItemsClasses) {
      activeColor = menuItemsClasses.menuColorActive
    }

    return (
      <React.Fragment key={item.label}>
        <ListItem
          onMouseOver={event => handleOpenPopper(event, item.label)}
          style={isSubMenu ? { paddingLeft: 28 } : null}
          button
          classes={{
            root: active && (menuItemsClasses ? menuItemsClasses.active : classes.active)
          }}
          component={Link}
          to={item.pathname}
          onClick={handleClosePopper}
        >
          {item.icon && (
            <ListItemIcon
              classes={{
                root: classNames(
                  menuItemsClasses && menuItemsClasses.menuColor,
                  active
                    ? activeColor
                    : classes.menuColor
                )
              }}
            >
              <item.icon />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            classes={{
              primary: classNames(
                menuItemsClasses && menuItemsClasses.menuColor,
                active ? activeColor : classes.menuColor,
              )
            }}
          />
        </ListItem>
        {renderPopper(item)}
      </React.Fragment>

    )
  }
  return <div>{items.map(renderItem)}</div>
}

MenuItems.defaultProps = {
  items: [],
  themeName: enumTheme.DARK
}

MenuItems.propTypes = {
  /** Array of elements to be rendered in the menu */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      pathname: PropTypes.string,
      icon: PropTypes.object,
      items: PropTypes.array
    })
  ),
  /** The themeName that will be used */
  themeName: PropTypes.string
}

export default MenuItems
