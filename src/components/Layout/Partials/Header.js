import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {openSidebar} from 'actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header-container">
        <div className="container">
          <h1 className="logo"></h1>
          <i className="icon-menu" onClick={this.props.openSidebar}></i>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  openSidebar: PropTypes.func.isRequired
};

export default connect(null, dispatch => {
  return {
    openSidebar: () => dispatch(openSidebar())
  };
})(Header);
