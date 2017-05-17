import React from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';


const mapStateToProps = (state, ownprops) => {
  return {
    questionData: state.content.questions[state.appState.currentQuestionIndex]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}


const Quiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);


export default Quiz;