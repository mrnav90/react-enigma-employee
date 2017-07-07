import React from 'react';
import {MasterLayout} from 'components/Layout';
import LoginForm from 'components/LoginForm';

export default class SignInPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <LoginForm/>
      </MasterLayout>
    );
  }
}
