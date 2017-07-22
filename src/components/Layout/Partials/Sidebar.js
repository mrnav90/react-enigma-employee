import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {translate, setLanguage} from 'utils';
import {closeSidebar, changeLanguage} from 'actions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  onChangeLanguage() {
    const key = this.props.translation.locale === 'en' ? 'ja' : 'en';
    this.props.changeLanguage(key);
    setLanguage(key);
  }

  render() {
    const {isShow, style} = this.props.sidebar;
    return (
      <div className="sidebar-container" style={style}>
        <div className="layer" onClick={this.props.closeSidebar}></div>
        <div className={classNames('container animated', {'slide-in-right': isShow, 'slide-out-right': !isShow})}>
          <div className="logo"></div>
          <ul>
            <li><Link><i className="icon-sidebar top-icon"></i>{translate('top')}</Link></li>
            <li><Link><i className="icon-sidebar account-icon"></i>{translate('user_information')}</Link></li>
            <li><Link><i className="icon-sidebar terms-service-icon"></i>{translate('terms_of_service')}</Link></li>
            <li onClick={this.onChangeLanguage}><Link><i className="icon-sidebar language-icon"></i>{translate('language')}</Link></li>
            <li><Link><i className="icon-sidebar logout-icon"></i>{translate('logout')}</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  sidebar: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  translation: PropTypes.object,
  changeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    translation: state.i18n,
    sidebar: state.sidebar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (key) => dispatch(changeLanguage(key)),
    closeSidebar: () => dispatch(closeSidebar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
