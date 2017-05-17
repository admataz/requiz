import {
  merge
} from 'lodash';

const defaultAppState= {
  currentView: null,
  currentQuestionIndex: 0
};


export default  (state = defaultAppState, action) => {
  var stateCopy = merge({}, state);


  switch(action.type){
    case 'SET_CURRENT_QUESTION':
      stateCopy.currentQuestionIndex = action.index;
      return stateCopy;

    case 'SET_CURRENT_APPVIEW':
      stateCopy.currentView = action.id;
      return stateCopy;


    default:
      return state;
    }


}
