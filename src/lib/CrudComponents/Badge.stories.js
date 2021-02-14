import React from 'react';
import { storiesOf } from '@storybook/react';

import Badge from './Badge';



storiesOf('Badge', module)
  .add('default', () => <Badge content={2}  />)
  .add('primary', () => <Badge content={3} primary />)
  .add('primary disabled', () => <Badge content={2} primary disabled/>)
  .add('primary with label', () => <Badge content={2} label='Warning' primary />)
