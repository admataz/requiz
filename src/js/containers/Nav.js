import React from 'react';
import { connect } from 'react-redux';
import Quiznav from '../components/Quiznav';
import {setCurrentQuestion, setCurrentAppview} from '../actions';


    const showPrevNext = (answers, currentQuestionIndex) => {
      return true; 
      // return (answers[currentQuestionIndex] !== undefined &&  answers[currentQuestionIndex] !== null);
    }

    const nextQuestion =  (currentQuestionIndex, length) => {
      if ((currentQuestionIndex + 1) < length) {
        return (currentQuestionIndex + 1);
      }
      return false;
    }
    const prevQuestion =  (currentQuestionIndex) => {
      if (currentQuestionIndex > 0) {
        return currentQuestionIndex - 1;
      }
      return false;
    }



const mapStateToProps = (state, ownprops) => {
  return {
    showPrevNext: showPrevNext(state.userData.answers, state.appState.currentQuestionIndex),
    prevQuestion: prevQuestion(state.appState.currentQuestionIndex),
    nextQuestion: nextQuestion(state.appState.currentQuestionIndex, state.content.questions.length),
    currentQuestionIndex: state.appState.currentQuestionIndex,
    questionsCount: state.content.questions.length
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuestion: (q)=>{
      dispatch(setCurrentQuestion(q));
    },
    loadScreen: (id)=>{
      dispatch(setCurrentAppview(id)); 
    },
  };
}


const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiznav);


export default Nav;