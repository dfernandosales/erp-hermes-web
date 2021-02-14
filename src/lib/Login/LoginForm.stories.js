import React from 'react'
import { storiesOf } from '@storybook/react'
import {action} from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import AndroidIcon from '@material-ui/icons/Android'

import LoginForm from './LoginForm'

const Root = ({children}) => (
  <div style={{padding: '3rem'}}>
      {children}
  </div>
)

storiesOf('LoginForm', module)
.addDecorator((story, context) => <Root>{withInfo('List Descrição')(story)(context)}</Root>)
.add('default', () => 
    <LoginForm
        onSubmit={action('onSubmit')}
        onPasswordRecoverClick={action('onPasswordRecoverClick')}
        onSnackbarClose={action('onSnackbarClose')}
        usernameLabel='Usuário'
        submitLabel='Entrar'    
        passwordLabel='Senha'
        recoverPasswordLabel='Recuperar Senha'
    />)
.add('logo', () => 
    <LoginForm
        onSubmit={action('onSubmit')}
        onPasswordRecoverClick={action('onPasswordRecoverClick')}
        onSnackbarClose={action('onSnackbarClose')}
        usernameLabel='Usuário'
        submitLabel='Entrar'    
        passwordLabel='Senha'
        recoverPasswordLabel='Recuperar Senha'
        logo={<AndroidIcon />}
    />)
.add('error', () => 
    <LoginForm
        onSubmit={action('onSubmit')}
        onPasswordRecoverClick={action('onPasswordRecoverClick')}
        onSnackbarClose={action('onSnackbarClose')}
        usernameLabel='Usuário'
        submitLabel='Entrar'    
        passwordLabel='Senha'
        recoverPasswordLabel='Recuperar Senha'
        errorMessage="Ocorreu um erro!"
    />)