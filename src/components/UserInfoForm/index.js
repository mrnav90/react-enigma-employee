import React from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form, Button} from 'react-bootstrap';
import LaddaButton, {XL, EXPAND_LEFT} from 'react-ladda';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {changeLanguage} from 'actions';
import LoadingPage from 'components/LoadingPage';
import MessageError from 'components/MessageError';
import {translate, setLanguage, revokeUser, getUserInfo, setUserInfo} from 'utils';
import {employee, auth} from 'apis';
import validate from './validate';

class UserInfoForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      password_type: 'password',
      errors: {},
      messageErrors: {},
      isLoading: false,
      isSubmit: false
    };
    this.onShowPassowrd = this.onShowPassowrd.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.backLoginPage = this.backLoginPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.userInfo().then((response) => {
      this.setState({name: response.data.name, email: response.data.email});
      this.setState({isLoading: false});
    }).catch(() => {
      this.setState({isLoading: false});
    });
  }

  onChangeLanguage() {
    const key = this.props.translation.locale === 'en' ? 'ja' : 'en';
    this.props.changeLanguage(key);
    setLanguage(key);
  }

  onShowPassowrd() {
    const password_type = this.state.password_type === 'password' ? 'text' : 'password';
    this.setState({password_type: password_type});
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

  backLoginPage() {
    this.setState({isLoading: true});
    this.props.logout().then(() => {
      this.setState({isLoading: false});
      revokeUser();
      this.context.router.push('/sign-in');
    }).catch(() => {
      this.setState({isLoading: false});
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const {name, email, password, password_confirmation} = this.state;
      const data = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      };
      this.setState({errors: {}, isLoading: true, isSubmit: true});
      this.props.registerUserInfo(data).then(() => {
        const userInfo = getUserInfo();
        userInfo.status = 4;
        setUserInfo(userInfo);
        this.setState({isLoading: false, isSubmit: false});
        this.context.router.push('/register-success');
      }).catch((response) => {
        this.setState({isLoading: false, isSubmit: false, messageErrors: response.errors});
      });
    }
  }

  render() {
    const {isSubmit, isLoading, name, email, password, password_confirmation, errors} = this.state;
    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <Form className="user-info-form" onSubmit={this.onSubmit} name="userInfoForm" method="POST" noValidate>
              <LoadingPage isShow={isSubmit || isLoading} />
              <FormGroup>
                <ControlLabel>
                  <span>{translate('name')}: </span>
                  <span>{name}</span>
                </ControlLabel>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  {translate('email_address')}
                  <span className="required">{translate('required')}</span>
                </ControlLabel>
                <FormControl type="email" disabled={isSubmit || isLoading} onChange={this.onChangeTextField} value={email} maxLength="255" name="email" placeholder={translate('email_address')}/>
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="email"/>}
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="email_valid"/>}
                {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="email"/>}
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  {translate('password')}
                  <span className="required">{translate('required')}</span>
                </ControlLabel>
                <FormControl type={this.state.password_type} onChange={this.onChangeTextField} value={password} disabled={isSubmit || isLoading} maxLength="255" name="password" placeholder={translate('password')}/>
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="password"/>}
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="password_short"/>}
                {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="password"/>}
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  {translate('password_confirm')}
                  <span className="required">{translate('required')}</span>
                </ControlLabel>
                <FormControl type={this.state.password_type} onChange={this.onChangeTextField} value={password_confirmation} disabled={isSubmit || isLoading} maxLength="255" name="password_confirmation" placeholder={translate('password_confirm')}/>
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="password_confirmation"/>}
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="password_confirmation_short"/>}
                {!isEmpty(errors) && <MessageError messageErrors={errors} field="password_not_match"/>}
                {!isEmpty(this.state.messageErrors) && <MessageError messageErrors={this.state.messageErrors} field="password_confirmation"/>}
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <ControlLabel className="checkbox-custom" disabled={isSubmit || isLoading}>
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
              <Row>
                <Col md={6}>
                  <Button type="button" onClick={this.backLoginPage} disabled={isSubmit || isLoading} className="btn-back btn" bsSize="large" block>{translate('return')}</Button>
                </Col>
                <Col md={6}>
                  <LaddaButton className="btn-submit btn-login btn btn-lg btn-block" disabled={isLoading} type="submit" data-size={XL} data-style={EXPAND_LEFT} loading={isSubmit}>{translate('start_using')}</LaddaButton>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserInfoForm.propTypes = {
  translation: PropTypes.object,
  changeLanguage: PropTypes.func.isRequired,
  registerUserInfo: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

UserInfoForm.contextTypes = {
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
    registerUserInfo: (data) => employee.actions.registerUserInfo.request({}, {data}),
    userInfo: () => employee.actions.userInfo.request(),
    logout: () => auth.actions.logout.request()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoForm);
