import React from 'react';
import {MasterLayout} from 'components/Layout';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MasterLayout>
        <div className="dashboard">Dashboard</div>
      </MasterLayout>
    );
  }
}
