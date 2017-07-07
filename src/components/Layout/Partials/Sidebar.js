import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router';
import {translate} from 'utils';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar-container" style={this.props.styles}>
        <div className="layer" onClick={this.props.closeSidebar}></div>
        <div className={classNames('container animated', {'slide-in-right': this.props.isShow, 'slide-out-right': !this.props.isShow})}>
          <div className="logo"></div>
          <ul>
            <li><Link><span className="icon-sidebar top-icon"></span>{translate('top')}</Link></li>
            <li><Link><span className="icon-sidebar account-icon"></span>{translate('user_information')}</Link></li>
            <li><Link><span className="icon-sidebar terms-service-icon"></span>{translate('terms_of_service')}</Link></li>
            <li><Link><span className="icon-sidebar language-icon"></span>{translate('language')}</Link></li>
            <li><Link><span className="icon-sidebar logout-icon"></span>{translate('logout')}</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  isShow: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};
