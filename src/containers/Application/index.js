import React from 'react';
import PropTypes from 'prop-types';

export default class Application extends React.Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));
    return (
      <div className="wrapper">
        {childrenWithProps}
      </div>
    );
  }
}

Application.propTypes = {
  children: PropTypes.node
};
