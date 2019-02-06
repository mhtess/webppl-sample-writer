// regular JS goes here

var fs = require('fs');

function callback(path) {
  var handle;
  var sampleCount = 0;

  function append(data) {
    fs.appendFileSync(handle, data);
  };

  return {
    sample(obj) {
      if (handle === undefined) {
        handle = fs.openSync(path, 'ax');
        append('[');
      }
      append(JSON.stringify({value: obj.value, score: obj.score}));
      sampleCount += 1;
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
