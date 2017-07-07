import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {openSidebar, closeSidebar} from 'actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSidebar: false,
      displaySidebar: 'none'
    };
    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  openSidebar() {
    this.setState({isShowSidebar: true, displaySidebar: 'block'});
  }

  closeSidebar() {
    this.setState({isShowSidebar: false});
    setTimeout(() => {
      this.setState({displaySidebar: 'none'});
    }, 500);
  }

  render() {
    const styles = {
      display: this.state.displaySidebar
    };
    return (
      <div className="header-wrapper">
        <header className="header-container">
          <h1 className="logo"></h1>
          <i className="icon-menu" onClick={this.openSidebar}></i>
        </header>
        <Sidebar isShow={this.state.isShowSidebar} closeSidebar={this.closeSidebar} styles={styles}/>
      </div>
    );
  }
}

export default connect(null, dispatch => {
  return {
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar())
  };
})(Header);
