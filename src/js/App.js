import React from 'react';
import PropTypes from 'prop-types';
import Quiz from './containers/Quiz';
import Nav from './containers/Nav';

class App extends React.Component{

  
  loadScreen(id){
    console.log(id);
  }

  loadQuestion(num){
    console.log(num);
  }


  render(){

      return (
        <div className="app-main">
            <Nav />
            <Quiz />
        </div>
      )
  }


}


App.defaultProps = {
  questionNumber: 0,

};


export default App;