const defaultState = {
  endpoint: '',
  post_id: 0,
  noncense: null,
  quiz_id: ''
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CONFIG_LOADED':
      return action.data;
      break;


    default:
      return state;
  }


}
