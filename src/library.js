// regular JS goes here

var fs = require('fs');

function callback(path) {
  var handle;

  function append(data) {
    fs.appendFileSync(handle, data);
  };

  return {
    setup() {
      handle = fs.openSync(path, 'ax');
      append('[');
    },
    iteration(trace) {
      append(JSON.stringify({value: trace.value, score: trace.score}));
    },
    initialize() {
    },
    finish() {
      append(']');
      fs.closeSync(handle);
    }
  };
}

module.exports = {
  callback: callback
};
