import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import FilterActions from './FilterActions'

const actions = {
  toggleDetailedFilter: action('toggleDetailedFilter'),
  onClear: action('onClear')
}

const customLabels = {
  simpleFilter: 'Label Simples',
  detailedFilter: 'Label Avançada',
  clear: 'Limpar',
  find: 'Encontrar'
}

storiesOf('FilterActions', module)
  .addDecorator(story => <div style={{ marginTop: '3rem' }}>{story()}</div>)
  .add('default', () => <FilterActions />)
  .add('fetching', () => <FilterActions fetching />)
  .add('label simple filter', () => <FilterActions {...actions} />)
  .add('label simple filter fetching', () => <FilterActions {...actions} fetching />)
  .add('label detailed filter', () => <FilterActions {...actions} showDetailedFilter />)
  .add('label detailed filter fetching', () => (
    <FilterActions {...actions} showDetailedFilter fetching />
  ))
  .add('different labels - simple', () => <FilterActions {...actions} labels={customLabels} />)
  .add('different labels - detailed', () => (
    <FilterActions {...actions} labels={customLabels} showDetailedFilter />
  ))
  .add('different labels - simple and fetching', () => (
    <FilterActions {...actions} labels={customLabels} fetching />
  ))
  .add('different labels - detailed and fetching', () => (
    <FilterActions {...actions} labels={customLabels} showDetailedFilter fetching />
  ))
  .add('filter without clear label', () => <FilterActions labels={{find: 'Buscar'}} {...actions} />)
