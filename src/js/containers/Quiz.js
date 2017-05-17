import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from '../components/Question';

const mapStateToProps = (state, ownprops) => {
  console.log(ownprops);
  return {questionData: state.content.questions[0]};
}

const mapDispatchToProps = (dispatch) => {

return {};

}


const Quiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);


Quiz.propTypes = {
  // testProp: PropTypes.number,
}

export default Quiz;