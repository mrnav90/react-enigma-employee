import React from 'react';
import {MasterLayout} from 'components/Layout';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {translate} from 'utils';
import {connect} from 'react-redux';

class WaitingApprove extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MasterLayout>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
              <div className="page-alert">
                <h1 className="logo"></h1>
                <p><strong>{translate('notification')}</strong></p>
                <p className="title">
                  <span>{translate('permission_service_title')}</span>
                </p>
                <Link className="btn-link btn btn-lg btn-block" to="/sign-in">{translate('go_login_screen')}</Link>
              </div>
            </Col>
          </Row>
        </Grid>
      </MasterLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    translation: state.i18n
  };
};

export default connect(mapStateToProps)(WaitingApprove);
