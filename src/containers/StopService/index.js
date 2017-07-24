import React from 'react';
import {MasterLayout} from 'components/Layout';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {translate} from 'utils';
import {connect} from 'react-redux';

class StopService extends React.Component {
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
                <p><strong>{translate('stop_service')}</strong></p>
                <p className="title">
                  <span>{translate('stop_service_content1')}</span>
                  <span>{translate('stop_service_content2')}</span>
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

export default connect(mapStateToProps)(StopService);
