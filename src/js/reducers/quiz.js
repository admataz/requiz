import {
  merge,
  find,
  findIndex,
  remove,
  orderBy
} from 'lodash';

const defaultQuiz = {
  title: '',
  introduction: '',
  questions: []
};

const defaultQuestion = {
  id: -1,
  question: '',
  answer_text: '',
  answer_full: '',
  isOpen: true,
  dataChanged: false,
  image_src: '',
  pos: null,
  input: {
    type: '',
    correct: '',
    format: '',
    step: 1,
    options: []
  }
};


function reorderQuestions(questions, q, newPos) {
  var dir = newPos - q.pos;

  var unsorted =  questions.map((itm) => {
    var newItem = Object.assign({}, itm);


    if (dir < 0 && itm.pos < q.pos && itm.pos >= newPos) {
      newItem.pos = (Number(itm.pos) + 1);
    }
    if (dir > 0 && itm.pos > q.pos && itm.pos <= newPos) {
      newItem.pos = (itm.pos - 1);
    }

    if(itm.id == q.id){
      newItem.pos = newPos;
    }
    return newItem;
  });

  var sorted = orderBy(unsorted, 'pos').map((itm, i)=>{
      itm.pos = i;
      return itm;
  });


  return sorted;
}

export default (state = defaultQuiz, action) => {
  var stateCopy = merge({}, state);
  var currentQuestion = null;
  switch (action.type) {
    case 'CONTENT_LOADED':
      return merge(defaultQuiz, action.data);
      break;

    case 'QUIZ_CONTENT_LOADED':
      stateCopy.title = action.data.title;
      stateCopy.introduction = action.data.introduction;
      return stateCopy;
      break;

    case 'ADMIN_UPDATE_QUESTION_IMAGE':
      currentQuestion = findIndex(stateCopy.questions, {
        id: action.questionId
      });
      stateCopy.questions[currentQuestion] = action.data
      stateCopy.questions[currentQuestion].image_src = action.imgdata
      stateCopy.questions[currentQuestion].dataChanged = true;

      return stateCopy;
      break;

    case 'ADMIN_QUESTION_DELETED':
      remove(stateCopy.questions, (v) => {
        return v.id === action.data.id
      })
      return stateCopy;
      break;

    case 'ADMIN_ADD_OPTION':
      currentQuestion = findIndex(stateCopy.questions, {
        id: action.id
      });
      stateCopy.questions[currentQuestion].input.options = [...stateCopy.questions[currentQuestion].input.options, ''];

      return stateCopy;
      break;


    case 'ADMIN_OPTION_CHANGED':
      currentQuestion = findIndex(stateCopy.questions, {
        id: action.id
      });
      stateCopy.questions[currentQuestion].input.options[action.opt] = action.data;

      return stateCopy;
      break;

    case 'ADMIN_NEW_QUESTION':
      defaultQuestion.pos = stateCopy.questions.length;
      stateCopy.questions.push(defaultQuestion);
      return stateCopy;
      break;

    case 'ADMIN_TOGGLE_QUESTION':
      currentQuestion = findIndex(stateCopy.questions, {
        id: action.id
      });
      stateCopy.questions[currentQuestion] = action.data;
      stateCopy.questions[currentQuestion].isOpen = action.open;
      return stateCopy;
      break;

    case 'ADMIN_QUESTION_CHANGED':
      currentQuestion = findIndex(stateCopy.questions, {
        id: action.id
      });
      stateCopy.questions[currentQuestion] = action.data;
      stateCopy.questions[currentQuestion].dataChanged = true;
      return stateCopy;
      break;

    case 'ADMIN_MOVE_QUESTION':
      stateCopy.questions = reorderQuestions(stateCopy.questions, action.q, action.newpos);
      return stateCopy;
      break;

    case 'ADMIN_QUESTION_SAVED':
      find(stateCopy.questions, {
          id: action.id
        })
        .data.id = action.data.data;
      return stateCopy;
      break;
    default:
      return state;
  }
};
