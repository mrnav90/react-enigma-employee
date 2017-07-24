import React from 'react';
import {MasterLayout} from 'components/Layout';
import {Grid, Row, Col, ControlLabel, Button, Form} from 'react-bootstrap';
import LaddaButton, {XL, EXPAND_LEFT} from 'react-ladda';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoadingPage from 'components/LoadingPage';
import {translate, revokeUser, getUserInfo, setUserInfo} from 'utils';
import {employee, auth} from 'apis';

class TermService extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: '',
      isLoading: false,
      isAgreeTerm: false,
      isSubmit: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.agreeTermService = this.agreeTermService.bind(this);
    this.backLoginPage = this.backLoginPage.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.term().then((response) => {
      this.setState({content: response.data.page_content});
      this.setState({isLoading: false});
    }).catch(() => {
      this.setState({isLoading: false});
    });
  }

  agreeTermService() {
    this.setState({isAgreeTerm: !this.state.isAgreeTerm});
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
    if (this.state.isAgreeTerm) {
      this.setState({isLoading: true, isSubmit: true});
      this.props.agreeTerm().then(() => {
        const userInfo = getUserInfo();
        userInfo.status = 3;
        setUserInfo(userInfo);
        this.setState({isLoading: false, isSubmit: false});
        this.context.router.push('/register-user-info');
      }).catch(() => {
        this.setState({isLoading: false, isSubmit: false});
      });
    }
  }

  render() {
    const {isSubmit, isLoading, isAgreeTerm, content} = this.state;
    return (
      <MasterLayout>
        <Grid>
          <Row>
            <Col md={6} mdOffset={3}>
              <LoadingPage isShow={isLoading} />
              <Form className="term-service-form" onSubmit={this.onSubmit} name="termServiceForm" method="POST" noValidate>
                <p className="title">
                  <span>{translate('approve_title_1')}</span>
                  <span>{translate('approve_title_2')}</span>
                </p>
                <div className="term-content" dangerouslySetInnerHTML={{__html: content}}></div>
                <ControlLabel className="checkbox-custom" disabled={isSubmit || isLoading}>
                  <input type="checkbox" onClick={this.agreeTermService} />
                  <span className="checkbox-layer"></span>
                  {translate('agree_service')}
                </ControlLabel>
                <Row>
                  <Col md={3} mdOffset={3}>
                    <Button type="button" onClick={this.backLoginPage} disabled={isSubmit || isLoading} className="btn-back btn" bsSize="large" block>{translate('return')}</Button>
                  </Col>
                  <Col md={3}>
                    <LaddaButton className="btn-submit btn-login btn btn-lg btn-block" disabled={!isAgreeTerm || isLoading} type="submit" data-size={XL} data-style={EXPAND_LEFT} loading={isSubmit}>{translate('agree')}</LaddaButton>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Grid>
      </MasterLayout>
    );
  }
}

TermService.propTypes = {
  term: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  agreeTerm: PropTypes.func.isRequired
};

TermService.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    translation: state.i18n
  };
};

const mapDispatchToProps = () => {
  return {
    term: () => employee.actions.term.request(),
    agreeTerm: () => employee.actions.agreeTerm.request({}, {agree: 1}),
    logout: () => auth.actions.logout.request()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TermService);
