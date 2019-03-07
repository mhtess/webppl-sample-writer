// regular JS goes here

var fs = require('fs');

function streamQueryCSV(path) {
  var handle;

  function append(data) {
    fs.appendFileSync(handle, data);
  };

  return {
    sample(obj) {
      if (handle === undefined) {
        handle = fs.openSync(path, 'ax');
        append('parameter, value, score\n');
        // append('[');
      }
      _.map(_.keys(obj.value), function(v){
        append(v + ',' + obj.value[v] + ',' + obj.score + '\n');
      })
      // append(JSON.stringify({value: obj.value, score: obj.score}));
    },
    finish() {
      // append(']');
      fs.closeSync(handle);
    }
  };
}

module.exports = {
  streamQueryCSV: streamQueryCSV
};
