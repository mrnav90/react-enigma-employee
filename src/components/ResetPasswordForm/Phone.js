import React from 'react';
import PropTypes from 'prop-types';
import LaddaButton, {XL, EXPAND_LEFT} from 'react-ladda';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import LoadingPage from 'components/LoadingPage';
import MessageError from 'components/MessageError';
import {translate} from 'utils';
import {resetPassword} from 'apis';
import validate from './validate';

class ResetPasswordViaPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_code: '',
      employee_code: '',
      employee_name: '',
      employee_phone: '',
      errors: {},
      messageErrors: {},
      isSubmit: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.backLoginPage = this.backLoginPage.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const {company_code, employee_code, employee_name, employee_phone} = this.state;
      const data = {
        company_code: company_code,
        employee_code: employee_code,
        employee_name: employee_name,
        employee_phone: employee_phone
      };
      this.setState({errors: {}, isSubmit: true});
      this.props.requestPhone(data).then(() => {
        this.context.router.push('/reset-password/success');
        this.setState({isSubmit: false});
      }).catch((response) => {
        this.setState({isSubmit: false, messageErrors: response.errors});
      });
    }
  }

  onChangeTextField(e) {
    this.setState({errors: {}});
    this.setState({[e.target.name]: e.target.value});
  }

  isValid() {
    const {errors, isValid} = validate(this.state, 'phone');
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  backLoginPage() {
    this.context.router.push('/sign-in');
  }

  render() {
    const {isSubmit, company_code, employee_code, employee_name, employee_phone, errors} = this.state;
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <LoadingPage isShow={isSubmit} />
            <Form className="reset-password-form" onSubmit={this.onSubmit} name="resetPasswordForm" method="POST" noValidate>
              <p className="title">
                <span>{translate('reset_password_via_phone_content_1')}</span>
                <span>{translate('update_user_info_title')}</span>
              </p>
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
                  {translate('name')}
                  <span className="required">{translate('required')}</span>
                </ControlLabel>
                <FormControl type="text" disabled={isSubmit} onChange={this.onChangeTextField} value={employee_name} maxLength="255" name="employee_name" placeholder={translate('name')}/>
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="employee_name"/>}
                {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="employee_name"/>}
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  {translate('phone_number')}
                  <span className="required">{translate('required')}</span>
                </ControlLabel>
                <FormControl type="text" disabled={isSubmit} onChange={this.onChangeTextField} value={employee_phone} maxLength="20" name="employee_phone" placeholder={translate('phone_number')}/>
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="employee_phone"/>}
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="employee_phone_invalid"/>}
                {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="employee_phone"/>}
              </FormGroup>
              <FormGroup className="group-button">
                <Row>
                  <Col md={6}>
                    <Button type="button" onClick={this.backLoginPage} disabled={isSubmit} className="btn-back btn" bsSize="large" block>{translate('return')}</Button>
                  </Col>
                  <Col md={6}>
                    <LaddaButton className="btn-submit btn-login btn btn-lg btn-block" type="submit" data-size={XL} data-style={EXPAND_LEFT} loading={isSubmit}>{translate('send')}</LaddaButton>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ResetPasswordViaPhone.contextTypes = {
  router: PropTypes.object.isRequired
};

ResetPasswordViaPhone.propTypes = {
  requestPhone: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    translation: state.i18n
  };
};

const mapDispatchToProps = () => {
  return {
    requestPhone: (data) => resetPassword.actions.phone.request({}, {data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordViaPhone);
