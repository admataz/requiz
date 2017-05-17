import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import answerInput from './AnswerInput';
import questionAnswer from './QuestionAnswer'

const Question  = ({showAnswer, questionData}) => {
    return (
      <div className="ac-quiz-question-container">
        { (questionData.image_src && showAnswer) &&
        <div className="ac-quiz-image">
            <img src={questionData.image_src} alt="question image" className="question-image" />
        </div>
        }

        <div className="ac-quiz-question-question">
            <span className="ac-quiz-question-text">{renderHTML(questionData.question)}</span>
        </div>



        {/*<div className="ac-quiz-answer-input">
          <answerInput 
          inputOptions={this.props.questionData.input} 
          confirmedAnswer={this.props.confirmedAnswer} 
          tempAnswer={this.props.tempAnswer} 
          questionId={this.props.questionData.id} 
          questionIndex={this.props.questionData.questionIndex} />
        </div>*/}

        { (showAnswer) && 
        <questionAnswer answerData={questionData} />
        }
    </div>
    )
    
  }

Question.propTypes = {
  showAnswer: PropTypes.bool,
  questionData: PropTypes.object

}


export default Question;
