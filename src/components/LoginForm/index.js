import React from 'react';
import LoadingPage from 'components/LoadingPage';
import {translate} from 'utils';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false
    };
  }

  render() {
    const {isSubmit} = this.state;
    return (
      <div className="login-form">
        <LoadingPage isShow={false} />
        <form name="loginForm" method="POST" noValidate>
          <div className="form-group">
            <label>{translate('company_id')}</label>
            <input type="text" disabled={isSubmit} maxLength="255" name="company_code" placeholder="ID"/>
          </div>
          <div className="form-group">
            <label>{translate('employee_id')}</label>
            <input type="text" disabled={isSubmit} maxLength="255" name="company_code" placeholder="ID"/>
          </div>
          <div className="form-group">
            <label>{translate('password')}</label>
            <input type="text" disabled={isSubmit} maxLength="255" name="company_code" placeholder="ID"/>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="show_pass" disabled={isSubmit}>
                <input className="checbox" type="checkbox"/>
                <span className="checkbox_span"></span>
                {translate('show_password')}
              </label>
            </div>
            <div className="col-md-6 text-right">

            </div>
          </div>
        </form>
      </div>
    );
  }
}
