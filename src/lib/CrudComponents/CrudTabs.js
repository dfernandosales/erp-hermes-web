import React, { useState, useEffect, useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import { Route, useLocation, useParams, useHistory } from 'react-router-dom'
import Badge from './Badge'

const TabsContext = React.createContext({})

const getTab = (tabs, pathname) => {
  tabs.forEach((tab) => {
    if (tab.value === undefined) {
      console.error('Tab must have a value property')
    }
  })
  const [tab = ''] = tabs
    .map((tab) => (pathname.includes(tab.value) ? tab.value : null))
    .filter((x) => !!x)
  return tab
}

export const useTabsNavigation = ({
  mainPath,
  tabs = [],
  withPaper = true,
}) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const [value, setValue] = useState(getTab(tabs, location.pathname))

  const onChange = (target) => {
    const { id } = params
    const { pathname } = location
    if (target === 'newChild') {
      return history.push(pathname + '/new-child')
    }
    return history.push(`/${mainPath}/${id}/${target}`)
  }

  const toNewChild = () => onChange('newChild')
  const toEditChild = (item) =>
    history.push(`${location.pathname}/${item.id}${location.search}`)

  useEffect(() => {
    return setValue(getTab(tabs, location.pathname))
  }, [location.pathname, tabs])

  return {
    value,
    onChange,
    toEditChild,
    toNewChild,
    mainPath,
    tabs,
    withPaper,
  }
}

export const makePath = ({ mainPath, name, isForm } = {}) => {
  if (!name) return `/${mainPath}/:id`
  if (isForm) return `/${mainPath}/:id/${name}/:childId`
  return `/${mainPath}/:id/${name}`
}

export const CrudRoute = ({ name = '', isForm, render, component }) => {
  const tabsContext = useContext(TabsContext)
  const history = useHistory()
  return (
    <Route
      path={makePath({
        mainPath: tabsContext.mainPath,
        name,
        isForm,
        history,
      })}
      exact
      component={component}
      render={render}
    />
  )
}

export const CrudTabs = ({
  value,
  mainPath,
  children,
  onChange,
  withPaper = true,
  tabs = [],
  tabsProps,
}) => {
  const location = useLocation()
  const Container = withPaper ? Paper : React.Fragment
  return (
    <div>
      <Paper square>
        <div>
          <Tabs
            indicatorColor="primary"
            value={value}
            onChange={(_, value) => onChange(value)}
            {...tabsProps}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.value}
                value={tab.value}
                disabled={index > 0 && location.pathname.includes('new')}
                label={
                  <Badge
                    content={index + 1}
                    disabled={tab.value !== value}
                    primary
                    label={tab.label}
                  />
                }
              />
            ))}
          </Tabs>
        </div>
      </Paper>
      <TabsContext.Provider value={{ mainPath }}>
        <Container {...(withPaper ? { square: true } : {})}>
          {children}
        </Container>
      </TabsContext.Provider>
    </div>
  )
}
