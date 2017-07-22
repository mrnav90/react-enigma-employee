import React from 'react';
import {MasterLayout} from 'components/Layout';
import {Grid, Row, Col} from 'react-bootstrap';
import LoginForm from 'components/LoginForm';
import ResetPasswordLink from 'components/ResetPasswordLink';

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
              <ResetPasswordLink/>
            </Col>
          </Row>
        </Grid>
      </MasterLayout>
    );
  }
}
