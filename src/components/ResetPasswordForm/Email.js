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

class ResetPasswordViaEmail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      company_code: '',
      email: '',
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
      const {company_code, email} = this.state;
      const data = {
        company_code: company_code,
        email: email
      };
      this.setState({errors: {}, isSubmit: true});
      this.props.requestEmail(data).then(() => {
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
    const {errors, isValid} = validate(this.state, 'email');
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  backLoginPage() {
    this.context.router.push('/sign-in');
  }

  render() {
    const {isSubmit, company_code, email, errors} = this.state;
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <LoadingPage isShow={isSubmit} />
            <Form className="reset-password-form" onSubmit={this.onSubmit} name="resetPasswordForm" method="POST" noValidate>
              <p className="title">
                <span>{translate('register_your_email')}</span>
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
                  {translate('email_address')}
                  <span className="required">{translate('required')}</span>
                </ControlLabel>
                <FormControl type="email" disabled={isSubmit} onChange={this.onChangeTextField} value={email} maxLength="255" name="email" placeholder={translate('email_address')}/>
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="email"/>}
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="email_valid"/>}
                {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="email"/>}
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

ResetPasswordViaEmail.contextTypes = {
  router: PropTypes.object.isRequired
};

ResetPasswordViaEmail.propTypes = {
  requestEmail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    translation: state.i18n
  };
};

const mapDispatchToProps = () => {
  return {
    requestEmail: (data) => resetPassword.actions.email.request({}, {data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordViaEmail);
