import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import Sidebar from '../Partials/Sidebar';

export default class MasterLayout extends React.Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));
    return (
      <div className="content-wrap">
        <Header/>
        <Sidebar/>
        <main className="main-container">{childrenWithProps}</main>
        <Footer/>
      </div>
    );
  }
}

MasterLayout.propTypes = {
  children: PropTypes.node
};
