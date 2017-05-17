import React from 'react'


const QuizNav = ({
  showPrevNext,
  prevQuestion,
  nextQuestion,
  loadQuestion,
  loadScreen,
  currentQuestionIndex,
  questionsCount
}) => {
  return (
    <div className="ac-quiz-nav">
        
        { (showPrevNext) && 
        
        <div className="nav-prev-next">
          { (prevQuestion !== false) && 
            <button  onClick={()=>loadQuestion(prevQuestion)} className="btn ac-quiz-nav-prev">previous </button>
          }
          
          { (nextQuestion) && 
            <button onClick={()=>loadQuestion(nextQuestion)} className="btn ac-quiz-nav-next">next</button>
          }

          { (!nextQuestion && showPrevNext) && 
            <button onClick={()=>loadScreen('end')} className="btn ac-quiz-nav-end">Finish</button>
          }
        </div>
        }


        <div className="ac-quiz-pagination">
            { currentQuestionIndex + 1 } / { questionsCount}
        </div>
    </div>
  )


}





export default QuizNav;