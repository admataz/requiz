
import React from 'react';
import {
  render
} from 'react-dom';
import {
  Provider
} from 'react-redux';
import store from './js/store';
import App from './js/App';

import {
  fetchContent,
  configLoaded,
  quizContentLoaded
} from './js/actions/index';



function init(endpoint, el, o, cb) {

  const d = document.querySelector(el);
  let options = Object.assign({}, o);
  let post_id = 0;
  let noncense = '';
  let quiz_id = 0;
  let share_message = '';
  let quiz_url = '';

  if ('quiz_slug' in options) {
    quiz_id = options.quiz_slug;
  }
  if ('noncense' in options) {
    noncense = options.noncense;
  }
  if ('post_id' in options) {
    post_id = options.post_id;
  }
  if ('share_message' in options) {
    share_message = options.share_message;
  }

  if ('quiz_url' in options) {
    quiz_url = options.quiz_url;
  }

  store.dispatch(configLoaded({
    endpoint,
    post_id,
    noncense,
    quiz_id,
    share_message,
    quiz_url
  }));


  store.dispatch(fetchContent(quiz_id))
    .then(() => {
      if (d) {
        render( <Provider store = {store} ><App /></Provider>, d)
      };

    })
    .then(() => {
      store.dispatch(quizContentLoaded({
        title: options.quiz_title,
        introduction: options.quiz_content
      }));

    });

  

}

/**
 * exporting using ES6 modules means this will be available as an object in the UMD export
 * to the browser. Adding `init()` because it makes more sense than `default`
 */
export default init;
export {
  init as init,
};