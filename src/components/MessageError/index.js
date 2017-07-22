import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'utils';
import {connect} from 'react-redux';

class MessageError extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let messages = [];
    const {messageErrors, field} = this.props;
    if (messageErrors && Object.prototype.hasOwnProperty.call(messageErrors, field)) {
      const errors = messageErrors[field];
      if (errors instanceof Array && errors.length > 0) {
        messages = errors.map((error, key) =>
          <span key={key} className="help-block">{error}</span>
        );
      } else {
        messages = <span className="help-block">{translate(errors)}</span>;
      }
    }
    return (
      <div className="has-error">
        {messages}
      </div>
    );
  }
}

MessageError.propTypes = {
  field: PropTypes.string.isRequired,
  messageErrors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    translation: state.i18n
  };
};

export default connect(mapStateToProps)(MessageError);
