import React from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form} from 'react-bootstrap';
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
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <LoadingPage isShow={false} />
            <Form className="login-form" name="loginForm" method="POST" noValidate>
              <FormGroup>
                <ControlLabel>{translate('company_id')}</ControlLabel>
                <FormControl type="text" disabled={isSubmit} maxLength="255" name="company_code" placeholder="ID"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>{translate('employee_id')}</ControlLabel>
                <FormControl type="text" disabled={isSubmit} maxLength="255" name="employee_code" placeholder="ID"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>{translate('password')}</ControlLabel>
                <FormControl type="password" disabled={isSubmit} maxLength="255" name="employee_password" placeholder={translate('text_and_number')}/>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <ControlLabel className="remember-me" disabled={isSubmit}>
                      <input type="checkbox" />
                      <span className="checkbox-layer"></span>
                      {translate('show_password')}
                    </ControlLabel>
                  </Col>
                  <Col md={6}>
                    <span className="pull-right">English</span>
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
