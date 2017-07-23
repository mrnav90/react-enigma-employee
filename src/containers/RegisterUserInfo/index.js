import React from 'react';
import {MasterLayout} from 'components/Layout';
import UserInfoForm from 'components/UserInfoForm';

export default class RegisterUserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MasterLayout>
        <UserInfoForm/>
      </MasterLayout>
    );
  }
}
