import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {translate} from 'utils';
import {closeSidebar} from 'actions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isShow, style} = this.props.sidebar;
    return (
      <div className="sidebar-container" style={style}>
        <div className="layer" onClick={this.props.closeSidebar}></div>
        <div className={classNames('container animated', {'slide-in-right': isShow, 'slide-out-right': !isShow})}>
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
  sidebar: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired
};

export default connect(
  state => {
    return {
      sidebar: state.sidebar
    };
  },
  dispatch => {
    return {
      closeSidebar: () => dispatch(closeSidebar())
    };
  }
)(Sidebar);
