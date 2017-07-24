import React from 'react';
import {Row, Col, FormGroup, ControlLabel, FormControl, Form} from 'react-bootstrap';
import LaddaButton, {XL, EXPAND_LEFT} from 'react-ladda';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {changeLanguage} from 'actions';
import LoadingPage from 'components/LoadingPage';
import MessageError from 'components/MessageError';
import {translate, setLanguage} from 'utils';
import {auth} from 'apis';
import validate from './validate';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      company_code: '',
      employee_code: '',
      employee_password: '',
      password_type: 'password',
      errors: {},
      messageErrors: {},
      isSubmit: false
    };
    this.onShowPassowrd = this.onShowPassowrd.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onShowPassowrd() {
    const password_type = this.state.password_type === 'password' ? 'text' : 'password';
    this.setState({password_type: password_type});
  }

  onChangeLanguage() {
    const key = this.props.translation.locale === 'en' ? 'ja' : 'en';
    this.props.changeLanguage(key);
    setLanguage(key);
  }

  onChangeTextField(e) {
    this.setState({errors: {}});
    this.setState({[e.target.name]: e.target.value});
  }

  isValid() {
    const {errors, isValid} = validate(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const {company_code, employee_code, employee_password} = this.state;
      const data = {
        company_code: company_code,
        employee_code: employee_code,
        employee_password: employee_password
      };
      this.setState({errors: {}, isSubmit: true});
      this.props.login(data).then(() => {
        this.setState({isSubmit: false});
        this.context.router.push('/');
      }).catch((response) => {
        this.setState({isSubmit: false, messageErrors: response.errors});
      });
    }
  }

  render() {
    const {isSubmit, company_code, employee_code, employee_password, errors} = this.state;
    return (
      <Form className="login-form" onSubmit={this.onSubmit} name="loginForm" method="POST" noValidate>
        <LoadingPage isShow={isSubmit} />
        <FormGroup>
          <ControlLabel>
            {translate('company_id')}
            <span className="required">{translate('required')}</span>
          </ControlLabel>
          <FormControl type="text" disabled={isSubmit} onChange={this.onChangeTextField} value={company_code} maxLength="255" name="company_code" placeholder="ID"/>
          {!isEmpty(errors) && <MessageError messageErrors={errors} field="company_code"/>}
          {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="company_code"/>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            {translate('employee_id')}
            <span className="required">{translate('required')}</span>
          </ControlLabel>
          <FormControl type="text" disabled={isSubmit} onChange={this.onChangeTextField} value={employee_code} maxLength="255" name="employee_code" placeholder="ID"/>
          {!isEmpty(errors) && <MessageError messageErrors={errors} field="employee_code"/>}
          {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="employee_code"/>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            {translate('password')}
            <span className="required">{translate('required')}</span>
          </ControlLabel>
          <FormControl type={this.state.password_type} onChange={this.onChangeTextField} value={employee_password} disabled={isSubmit} maxLength="255" name="employee_password" placeholder={translate('password')}/>
          {!isEmpty(errors) && <MessageError messageErrors={errors} field="password"/>}
          {!isEmpty(errors) && <MessageError messageErrors={errors} field="password_short"/>}
          {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="employee_password"/>}
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md={6}>
              <ControlLabel className="checkbox-custom" disabled={isSubmit}>
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
        <LaddaButton className="btn-submit btn-login btn btn-lg btn-block" type="submit" data-size={XL} data-style={EXPAND_LEFT} loading={isSubmit}>{translate('login')}</LaddaButton>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  translation: PropTypes.object,
  changeLanguage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    translation: state.i18n
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (key) => dispatch(changeLanguage(key)),
    login: (data) => auth.actions.login.request({}, {data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
