import React from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form} from 'react-bootstrap';
import LaddaButton, {XL, EXPAND_LEFT} from 'react-ladda';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeLanguage} from 'actions';
import LoadingPage from 'components/LoadingPage';
import {translate} from 'utils';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_code: '',
      employee_code: '',
      employee_password: '',
      password_type: 'password',
      isSubmit: false
    };
    this.onShowPassowrd = this.onShowPassowrd.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.forgotPasswordViaEmail = this.forgotPasswordViaEmail.bind(this);
    this.forgotPasswordViaPhone = this.forgotPasswordViaPhone.bind(this);
  }

  onShowPassowrd() {
    this.setState({password_type: this.state.password_type === 'password' ? 'text' : 'password'});
  }

  onChangeLanguage() {
    this.props.changeLanguage('ja');
    this.forceUpdate();
  }

  onChangeTextField(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
  }

  forgotPasswordViaEmail() {

  }

  forgotPasswordViaPhone() {

  }

  render() {
    const {isSubmit, company_code, employee_code, employee_password} = this.state;
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <LoadingPage isShow={false} />
            <Form className="login-form" onSubmit={this.onSubmit} name="loginForm" method="POST" noValidate>
              <FormGroup>
                <ControlLabel>{translate('company_id')}</ControlLabel>
                <FormControl type="text" disabled={isSubmit} onChange={this.onChangeTextField} value={company_code} maxLength="255" name="company_code" placeholder="ID"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>{translate('employee_id')}</ControlLabel>
                <FormControl type="text" disabled={isSubmit} onChange={this.onChangeTextField} value={employee_code} maxLength="255" name="employee_code" placeholder="ID"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>{translate('password')}</ControlLabel>
                <FormControl type={this.state.password_type} onChange={this.onChangeTextField} value={employee_password} disabled={isSubmit} maxLength="255" name="employee_password" placeholder={translate('text_and_number')}/>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <ControlLabel className="remember-me" disabled={isSubmit}>
                      <input type="checkbox" onClick={this.onShowPassowrd} />
                      <span className="checkbox-layer"></span>
                      {translate('show_password')}
                    </ControlLabel>
                  </Col>
                  <Col md={6}>
                    <span onClick={this.onChangeLanguage} className="change-language pull-right">{translate('language')}</span>
                  </Col>
                </Row>
              </FormGroup>
              <LaddaButton className="btn-submit btn-login btn btn-lg btn-default btn-block" type="submit" data-size={XL} data-style={EXPAND_LEFT} loading={false}>{translate('login')}</LaddaButton>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={8} mdOffset={2}>
            <Row>
              <Col md={5} mdOffset={1}>
                <div className="forgot-link forgot-email">
                  <i className="fa fa-lock icon-lock"></i>
                  <span className="block-text">
                    <span>{translate('click_forgot_password')}</span>
                    <span>{translate('reset_password_via_email')}</span>
                  </span>
                </div>
              </Col>
              <Col md={6}>
                <div className="forgot-link forgot-phone">
                  <i className="fa fa-lock icon-lock"></i>
                  <span className="block-text">
                    <span>{translate('click_forgot_password')}</span>
                    <span>{translate('reset_password_via_phone')}</span>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

LoginForm.propTypes = {
  changeLanguage: PropTypes.func.isRequired
};

export default connect(null, dispatch => {
  return {
    changeLanguage: (key) => dispatch(changeLanguage(key))
  };
})(LoginForm);
