/**
 * A quick server for developing the quiz app
 * provides endpoints for the quiz content
 */

const express  = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();


app.route('/api')
  .get((req, res, next) => {
    res.json({api: 'v1'})
  });


app.route('/api/quiz/quiz1')
  .get( (req, res, next) => {
    fs.createReadStream('./data/quiz1.json').pipe(res);
  });



app.listen(3000, function(err){
    if(err){
      return console.log(err);
    }
  console.log('server listening on port 3000');
})