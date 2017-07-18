import React from 'react';
import {MasterLayout} from 'components/Layout';
import ResetPasswordViaEmail from 'components/ResetPasswordViaEmail';

export default class RequestPasswordEmail extends React.Component {
  render() {
    return (
      <MasterLayout>
        <ResetPasswordViaEmail/>
      </MasterLayout>
    );
  }
}
