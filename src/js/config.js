var options = {
  appDataURL: null
};



function get(key, cb) {
  if (key in options && options[key] !== null) {
    return cb(null, options[key]);
  }
  return cb(new Error('config option "' + key + '" not set'));
}

function set(key, val, cb) {
  if (!key) {
    return cb(new Error('config key not specified when set'));
  }
  options[key] = val;
  return cb(null);
}

function setp(key, val) {
  return new Promise(
    (resolve, reject) => {
      set(key, val, (err) => {
        if (err) {
          reject(err);
        }
        resolve(val);
      });
    }
  );
}

function getp(key) {
  return new Promise(
    (resolve, reject) => {
      get(key, (err, val) => {
        if (err) {
          reject(err);
        }
        resolve(val);
      });
    }
  );
}


module.exports = {
  set,
  get,
  setp,
  getp
};
