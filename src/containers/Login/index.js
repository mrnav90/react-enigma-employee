import React from 'react';
import {MasterLayout} from 'components/Layout';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import LoginForm from 'components/LoginForm';
import {translate} from 'utils';

export default class LoginPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
              <LoginForm/>
            </Col>
          </Row>
          <Row>
            <Col md={8} mdOffset={2}>
              <Row>
                <Col md={5} sm={5} xs={6} mdOffset={1} smOffset={1}>
                  <div className="forgot-link forgot-email">
                    <i className="fa fa-lock icon-lock"></i>
                    <Link to="/reset-password/email" className="block-text">
                      <span>{translate('click_forgot_password')}</span>
                      <span>{translate('reset_password_via_email')}</span>
                    </Link>
                  </div>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <div className="forgot-link forgot-phone">
                    <i className="fa fa-lock icon-lock"></i>
                    <Link to="/reset-password/phone" className="block-text">
                      <span>{translate('click_forgot_password')}</span>
                      <span>{translate('reset_password_via_phone')}</span>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </MasterLayout>
    );
  }
}
