import React from 'react';
import {MasterLayout} from 'components/Layout';

export default class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MasterLayout>
        <div className="page-not-found">Not found</div>
      </MasterLayout>
    );
  }
}
