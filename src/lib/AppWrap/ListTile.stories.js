import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import ListTile from './ListTile'

const actions = {
  onNameClick: action('onNameClick'),
  onActionClick: action('onActionClick'),
  onAvatarClick: action('onAvatarClick')
}

storiesOf('ListTile', module)
  .addDecorator(withInfo('ListTile - Mostra a foto e o nome do usuário com um botão de logout'))
  .add('default', () => <ListTile />)
  .add('with label', () => <ListTile label={'Bonjour'} />)
  .add('with name', () => <ListTile name={'Darkness'} />)
  .add('with name and onNameClick', () => (
    <ListTile name={'Darkness'} onNameClick={actions.onNameClick} />
  ))
  .add('with avatar', () => <ListTile avatar={'http://i.imgur.com/D4ltFjC.jpg'} />)
  .add('with avatar and onAvatarClick', () => (
    <ListTile avatar={'http://i.imgur.com/D4ltFjC.jpg'} onAvatarClick={actions.onAvatarClick} />
  ))
  .add('with action', () => <ListTile action={'Au revoir'} />)
  .add('with action and onActionClick', () => (
    <ListTile action={'Au revoir'} onActionClick={actions.onActionClick} />
  ))
  .add('with user avatar and name', () => (
    <ListTile
      name={'Saylor Twift'}
      avatar={
        'https://abrilexame.files.wordpress.com/2019/09/2019-08-26t220609z_1628094435_hp1ef8q1pe90t_rtrmadp_3_awards-vma-e1567780055794.jpg'
      }
    />
  ))
  .add('with all', () => (
    <ListTile
      label={'Come'}
      name={'Back'}
      avatar={
        'https://upload.wikimedia.org/wikipedia/pt/thumb/c/ca/Taylor_Swift_-_Red.jpeg/220px-Taylor_Swift_-_Red.jpeg'
      }
      action={'Be Here'}
      {...actions}
    />
  ))
