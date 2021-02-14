import React from 'react'
import { storiesOf } from '@storybook/react'
import Auth, { AuthContext } from '../Login/Auth'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'

import UserAvatar from './UserAvatar'

const AuthMock = class AuthMock extends React.Component {
  static contextType = AuthContext

  componentDidMount() {
    const { user } = this.props
    if (typeof this.context.handleUserLogin === 'function') this.context.handleUserLogin(user)
    else console.error('Must have Auth in tree')
  }

  componentWillUnmount() {
    if (this.context.loggedin)
      if (typeof this.context.logout === 'function') this.context.logout()
      else console.error('Must have Auth in tree')
    else console.error('Must have Auth in tree')
  }

  render() {
    return this.props.children
  }
}

const actions = {
  onNameClick: action('onNameClick'),
  onLogout: action('onLogout'),
  onAvatarClick: action('onAvatarClick')
}

storiesOf('UserAvatar', module)
  .addDecorator((story, context) => (
    <Auth>
      {withInfo('UserAvatar - Mostra a foto e o nome do usuário com um botão de logout ')(story)(
        context
      )}
    </Auth>
  ))
  .add('default', () => <UserAvatar />)
  .add('with label', () => <UserAvatar label={'Olá'} />)
  .add('with name', () => (
    <AuthMock user={{ name: 'Taylor Swift' }}>
      <UserAvatar />
    </AuthMock>
  ))
  .add('with avatar', () => <UserAvatar avatar={'http://i.imgur.com/D4ltFjC.jpg'} />)
  .add('with avatar and name', () => (
    <AuthMock user={{ name: 'Taylor Swift' }}>
      <UserAvatar
        avatar={
          'https://abrilexame.files.wordpress.com/2019/09/2019-08-26t220609z_1628094435_hp1ef8q1pe90t_rtrmadp_3_awards-vma-e1567780055794.jpg'
        }
      />
    </AuthMock>
  ))
  .add('with action (with default logout)', () => (
    <AuthMock user={{ name: 'Taylor Swift' }}>
      <UserAvatar action={'Logout'} onLogout={actions.onLogout} />
    </AuthMock>
  ))
  .add('with all', () => (
    <AuthMock user={{ name: 'Taylor Swift' }}>
      <UserAvatar
        label={'Come'}
        name={'Back'}
        avatar={
          'https://upload.wikimedia.org/wikipedia/pt/thumb/c/ca/Taylor_Swift_-_Red.jpeg/220px-Taylor_Swift_-_Red.jpeg'
        }
        action={'Be Here'}
        {...actions}
      />
    </AuthMock>
  ))
