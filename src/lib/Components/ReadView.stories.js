import React from 'react'
import { storiesOf } from '@storybook/react'
import ReadView from './ReadView'
import { withInfo } from '@storybook/addon-info'
import { MemoryRouter as Router } from 'react-router-dom'

const data = {
  nome: 'Taylor',
  sobrenome: 'Swift',
  idade: '22',
  rainha: true,
  textoGrande:
    'When life gives you lemons, dont make lemonade. Make life take the lemons back! Get mad! I dont want your damn lemons, what the hell am I supposed to do with these? Demand to see lifes manager! Make life rue the day it thought it could give Cave Johnson lemons! Do you know who I am? Im the man whos gonna burn your house down! With the lemons!',
}
const config = [
  {
    title: 'Principal',
    children: {
      nome: { label: 'Nome' },
      sobrenome: { label: 'Sobrenome' },
      idade: { label: 'Idade' },
      rainha: {
        label: 'Rainha',
        format: value => (value ? 'Sim' : 'Não'),
      },
    },
  },
  {
    title: 'Titulo do texto',
    children: {
      textoGrande: { size: 12 },
    },
  },
]

const Root = ({ children }) => (
  <div style={{ padding: '3rem' }}>
    <Router>{children}</Router>
  </div>
)

storiesOf('Read View', module)
  .addDecorator((story, context) => (
    <Root>{withInfo('List Descrição')(story)(context)}</Root>
  ))
  .add('default', () => <ReadView config={config} item={data} />)
