import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import styles from './AppWrapStyles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Breadcrumb from './Breadcrumb'
import Grid from '@material-ui/core/Grid'
import UserAvatar from './UserAvatar'
import MenuItems from './MenuItems'
import * as R from 'ramda'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(styles)

const enumMenu = {
  OPEN: 'open',
  CLOSE: 'close'
}

const enumTheme = {
  DARK: 'dark',
  LIGHT: 'light'
}

const getReadable = menuItem => {
  if (menuItem.pathname) {
    const paths = menuItem.pathname.split('/')
    if (paths.length === 2) {
      return { [paths[1]]: menuItem.label }
    }
    if (paths.length === 3) {
      return { [paths[2]]: menuItem.label }
    }
  }
  return {}
}

const getDafaultsReadableMap = menuItems => {
  const readables = menuItems.map(menuItem => {
    if (menuItem.group) {
      const readable = getReadable(menuItem)
      const subs = menuItem.items.map(subItem => getReadable(subItem))
      return [readable, ...subs]
    } else {
      return getReadable(menuItem)
    }
  })
  return R.mergeAll(R.flatten(readables))
}

const AppWrap = ({
  children,
  logo,
  menuItems,
  onLogout,
  isPositionButtonMenuDrawer = false,
  hideMenuButton = false,
  onToggleDrawer,
  classes: appWrapClasses,
  pathReadableMap,
  menuItemsClasses,
  hideBreadcrumb,
  userAvatarProps,
  theme: themeName,
  customBar
}) => {
  const history = useHistory()
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [hideMenu, setHideMenu] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const classes = useStyles()
  const [popperOpen, setPopperOpen] = useState(false)
  const lightTheme = themeName === enumTheme.LIGHT

  const updateDimensions = () => {
    if (window.innerWidth < theme.breakpoints.values.md) {
      setOpen(false)
    }
    setWidth(window.innerWidth)
  }

  const handleMenuItemClick = label => {
    if (label) setOpen(true)
  }

  const handleToggleDrawer = open => {
    onToggleDrawer(open ? enumMenu.OPEN : enumMenu.CLOSE)
  }

  useEffect(() => {
    setHideMenu(width < theme.breakpoints.values.sm && !open)
  }, [open, width])

  useEffect(() => {
    setOpen(localStorage.toggleDrawer === '1')
    handleToggleDrawer(localStorage.toggleDrawer === '1')
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const toggleMenu = () => {
    setOpen(!open)
    handleToggleDrawer(!open)
    localStorage.setItem('toggleDrawer', !open ? '1' : '0')
  }

  const buttonMenu = () => (
    <Tooltip
      title={open ? 'Retrair menu' : 'Expandir menu'}
      aria-label={open ? 'Retrair menu' : 'Expandir menu'}
    >
      <IconButton
        aria-label='open drawer'
        onClick={toggleMenu}
        className={classNames(
          classes.menuButton,
          isPositionButtonMenuDrawer && classes.menuButtonInMenuDrawer,
          appWrapClasses && appWrapClasses.menuButton
        )}
      >
        <MenuIcon />
      </IconButton>
    </Tooltip>
  )

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar
          className={classNames(
            classes.appBar,
            open && classes.appBarShift,
            hideMenu && classes.appBarHiddenMenu
          )}
          position='absolute'
        >
          <Toolbar disableGutters classes={{ root: classes.navBarRoot }}>
            <Grid container>
              <Grid
                item
                xs
                className={classNames(
                  classes.toolsLeft,
                  isPositionButtonMenuDrawer &&
                    classes.toolsLeftWithButtonInDrawer,
                  !hideMenu && classes.toolsLeftHideMenu
                )}
              >
                {!hideMenuButton && !isPositionButtonMenuDrawer && buttonMenu()}

                {!hideBreadcrumb && (
                  <Breadcrumb
                    history={history}
                    pathReadableMap={R.mergeRight(
                      getDafaultsReadableMap(menuItems),
                      pathReadableMap
                    )}
                  />
                )}
              </Grid>

              {customBar && (
                <Grid item xs className={classNames(classes.toolsRight)}>
                  {customBar}
                </Grid>
              )}

              <Grid item className={classNames(classes.toolsRight)}>
                <UserAvatar onLogout={onLogout} {...userAvatarProps} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          onMouseOver={() => setPopperOpen(!open)}
          onMouseLeave={() => setPopperOpen(false)}
          variant='permanent'
          classes={{
            paper: classNames(
              classes.drawerPaper,
              lightTheme && classes.drawerPaperLight,
              !open && classes.drawerPaperClose,
              hideMenu && classes.drawerHideMenu,
              appWrapClasses && appWrapClasses.drawerMenu
            )
          }}
          open={open}
        >
          <div className={classes.drawerInner}>
            <div
              className={classNames(
                classes.drawerHeader,
                isPositionButtonMenuDrawer && classes.drawerHeaderInMenuDrawer,
                appWrapClasses && appWrapClasses.drawerHeader
              )}
            >
              {!open && isPositionButtonMenuDrawer && (
                <div>{isPositionButtonMenuDrawer && buttonMenu()}</div>
              )}
              <div
                className={classNames(
                  open
                    ? classes.drawerLogo
                    : isPositionButtonMenuDrawer
                      ? classes.drawerLogoClosedWithButtonInDrawer
                      : classes.drawerLogoClosed
                )}
              >
                {logo}
              </div>
              {open && isPositionButtonMenuDrawer && <div>{buttonMenu()}</div>}
            </div>
            <Divider />
            <List disablePadding>
              <MenuItems
                expanded={open}
                popperOpen={popperOpen}
                onMenuItemClick={handleMenuItemClick}
                items={menuItems}
                theme={themeName}
                classes={menuItemsClasses}
              />
            </List>
          </div>
        </Drawer>
        <main
          className={classNames(
            classes.content,
            lightTheme && classes.contentLight,
            appWrapClasses && appWrapClasses.content
          )}
        >
          <div>{children}</div>
        </main>
      </div>
    </div>
  )
}

AppWrap.defaultProps = {
  onToggleDrawer: R.empty,
  themeName: enumTheme.DARK,
  pathReadableMap: {}
}

AppWrap.propTypes = {
  /** Logo Picture */
  logo: PropTypes.any,
  /** Function for handle the logout */
  onLogout: PropTypes.func,
  /** Items of the menu */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pathname: PropTypes.string,
      icon: PropTypes.any
    })
  ),
  /** Theme that will be applied (must be in the enumTheme) */
  themeName: PropTypes.string,
  /** User avatar props */
  userAvatarProps: PropTypes.object,
  /** MenuItems theme */
  menuItemsClasses: PropTypes.object,
  /** Hide the Breadcrumb */
  hideBreadcrumb: PropTypes.bool,
  /** Function to pass the state of the drawer */
  onToggleDrawer: PropTypes.func,
  /** Map of path names to readable names. See breadcrumbs for more info */
  pathReadableMap: PropTypes.object,
  /** Custom options to display after breadcrumbs */
  customBar: PropTypes.any
}

export default AppWrap
