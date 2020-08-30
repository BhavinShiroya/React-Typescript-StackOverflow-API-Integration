import * as React from 'react';
import QuationList from './../components';

class Home extends React.Component {
  public render() {
    return (
      <div>
        <h3>Stackoverflow Questions List</h3>
        <QuationList />
      </div>
    );
  }
}

export default Home;
