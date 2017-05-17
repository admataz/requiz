import React from 'react';
import PropTypes from 'prop-types';
import Quiz from './containers/Quiz';

class App extends React.Component{

  render(){

      return (
        <div className="app-main">
            <Quiz/>
        </div>
      )
  }


}


export default App;