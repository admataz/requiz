import fetch from 'isomorphic-fetch';

const REQUEST_CONTENT = 'REQUEST_CONTENT';

const CONTENT_LOADED = 'CONTENT_LOADED';
const QUIZ_CONTENT_LOADED = 'QUIZ_CONTENT_LOADED';
const CONFIG_LOADED = 'CONFIG_LOADED';
const RESET_USER_ANSWERS = 'RESET_USER_ANSWERS';
const SET_CURRENT_QUESTION_ID = 'SET_CURRENT_QUESTION_ID';
const SET_USER_ANSWER = 'SET_USER_ANSWER';
const ADMIN_UPDATE_QUESTION_IMAGE = 'ADMIN_UPDATE_QUESTION_IMAGE';

const ADMIN_TOGGLE_QUESTION = 'ADMIN_TOGGLE_QUESTION';
const ADMIN_QUESTION_CHANGED = 'ADMIN_QUESTION_CHANGED';
const ADMIN_NEW_QUESTION = 'ADMIN_NEW_QUESTION';
const ADMIN_MOVE_QUESTION = 'ADMIN_MOVE_QUESTION';
const ADMIN_ADD_OPTION = 'ADMIN_ADD_OPTION';
const ADMIN_OPTION_CHANGED = 'ADMIN_OPTION_CHANGED';

const ADMIN_QUESTION_SAVED = 'ADMIN_QUESTION_CREATED';
const ADMIN_QUESTION_DELETED = 'ADMIN_QUESTION_DELETED';



export const quizContentLoaded = (data) => {
  return {
    type: QUIZ_CONTENT_LOADED,
    data
  };
};

export const adminQuestionChanged = (data, id) => {
  return {
    type: ADMIN_QUESTION_CHANGED,
    id,
    data
  };
};

export const requestContent = (endpoint) => {
  return {
    type: REQUEST_CONTENT,
    endpoint
  };
};

export const adminAddOption = (id) => {
  return {
    type: ADMIN_ADD_OPTION,
    id
  };
};

export const adminOptionChanged = (id, opt, data) => {
  return {
    type: ADMIN_OPTION_CHANGED,
    id,
    opt,
    data
  };
};


export const adminToggleQuestion = (data, id, open) => {
  return {
    type: ADMIN_TOGGLE_QUESTION,
    id,
    open,
    data
  };
};


export const configLoaded = (data) => {
  return {
    type: CONFIG_LOADED,
    data: data
  };
};


export const contentLoaded = (data) => {
  return {
    type: CONTENT_LOADED,
    data: data
  };
};


export const questionSaved = (data) => {
  return {
    type: ADMIN_QUESTION_SAVED,
    data
  };
};

export const questionDeleted = (data) => {
  return {
    type: ADMIN_QUESTION_DELETED,
    data: data
  };
};

export const adminNewQuestion = () => {
  return {
    type: ADMIN_NEW_QUESTION
  };
};


export const adminMoveQuestion = (q, newpos) => {
  return {
    type: ADMIN_MOVE_QUESTION,
    newpos,
    q
  };
};

export const resetUserAnswers = () => {
  return {
    type: RESET_USER_ANSWERS
  };
};

export const setCurrentQuestionId = (id) => {
  return {
    type: SET_CURRENT_QUESTION_ID,
    id: id
  };
};

export const userAnswerSet = () => {

}

export const userAnswered = (a) => {
  return {
    type: SET_USER_ANSWER,
    value: a
  };
};

export const adminUpdateQuestionImage = (imgdata, questionId, data) => {
  return {
    type: ADMIN_UPDATE_QUESTION_IMAGE,
    imgdata,
    questionId,
    data
  };
};


// ---- ASYNC ACTIONS ---------

export const adminSetQuestionOrder = (q, newPos) => {
  var method = 'PUT';
  return (dispatch, getState) => {
    dispatch(adminMoveQuestion(q, newPos));

    const {
      config,
      content
    } = getState();

    let endpoint = `${config.endpoint}/questionOrder`;
    let questions = content.questions.map((itm) => {
      return {
        id: itm.id,
        pos: itm.pos
      }
    });
    return fetch(endpoint, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': config.noncense
      },
      body: JSON.stringify({
        questions
      })
    });
  };
};


export const setUserAnswer = (a) => {
  var method = 'POST';
  return (dispatch, getState) => {
    dispatch(userAnswered(a));
    const {
      config
    } = getState();
    let endpoint = `${config.endpoint}/answer`;
    return fetch(endpoint, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': config.noncense
        },
        body: JSON.stringify({
          id: a.q,
          answer: a.a,
          nonce: config.noncense
        })
      })
      .then(response => response.json())
      .then(dispatch(userAnswered(a)));
  };
};


export const fetchContent = (path) => {
  return (dispatch, getState) => {
    const {
      config
    } = getState();
    var endpoint = `${config.endpoint}${path}`;
    dispatch(requestContent(endpoint));
    return (fetch(endpoint)
      .then(response => response.json())
      .then(json => dispatch(contentLoaded(json)))
    );
  };
};


export const adminSaveQuestion = (data, id) => {
  var method = 'POST'
  var urlID = '';
  if (id !== -1) {
    method = 'PUT';
    urlID = `/${id}`;
  }
  data.isOpen = false;
  return (dispatch, getState) => {
    const {
      config
    } = getState();
    var endpoint = `${config.endpoint}/question${urlID}`;
    return fetch(endpoint, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': config.noncense
        },
        body: JSON.stringify({
          post_id: config.post_id,
          data: data
        })
      })
      .then(response => response.json())
      .then(json => dispatch(questionSaved(json)));
  };
};


export const adminDeleteQuestion = (id) => {
  var urlID = `/${id}`;

  if (id === -1) {
    return (dispatch, getState) => {
      dispatch(questionDeleted({
        id: -1
      }));
    }
  }

  return (dispatch, getState) => {
    const {
      config
    } = getState();
    var endpoint = `${config.endpoint}/question${urlID}`;
    return fetch(endpoint, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': config.noncense,
          body: null
        }
      })
      .then(response => response.json())
      .then(json => dispatch(questionDeleted(json)));
  };
};

//-----------------------
