import React from 'react';
import {MasterLayout} from 'components/Layout';
import ResetPasswordViaPhone from 'components/ResetPasswordViaPhone';

export default class RequestPasswordPhone extends React.Component {
  render() {
    return (
      <MasterLayout>
        <ResetPasswordViaPhone/>
      </MasterLayout>
    );
  }
}
