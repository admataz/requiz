const defaultState = {
  answers: []
};


export default (state = defaultState, action) => {
  let answers = [...state.answers];

  switch (action.type) {
    case 'RESET_USER_ANSWERS':
      return defaultState;
      break;

    case 'SET_USER_ANSWER':
      answers[action.value.i] = action.value.a;
      return {
        answers
      };
      break;

    default:
      return state;
  }


}
