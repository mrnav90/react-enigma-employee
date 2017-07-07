import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames('loading-wrapper', {'show-loading': this.props.isShow})}>
        <div className="loading-three-bounce">
          <div className="loading-bounce"></div>
          <div className="loading-bounce"></div>
          <div className="loading-bounce"></div>
        </div>
      </div>
    );
  }
}

LoadingPage.propTypes = {
  isShow: PropTypes.bool.isRequired
};
