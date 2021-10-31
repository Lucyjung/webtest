const console_log = console.log;
const fs = require('fs');
const util = require('util');
const log_stdout = process.stdout;
const path = require('path');
const Moment = require('moment-timezone');
const dailyLogFnc = function (){
  let logPath = path.join(process.cwd(),'log');
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }
  let today = new Date();
  return fs.createWriteStream(path.join(logPath,today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, "0") + today.getDate().toString().padStart(2, "0") + '_LogFile.log' ) , {flags : 'a'});
}
module.exports.dailyLogFnc = dailyLogFnc;
console.log = function(d) { //
  let log_file = dailyLogFnc();
  let timestamp = Moment().tz('Asia/Bangkok').format("YYYY-MM-DD h:mm:ss a")

  log_file.write('[' + timestamp + '] ' +util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const logline = function () {
  console_log.apply(console, arguments);
  console.log(...arguments);
};

module.exports.fetch_response = (res) => {
  console.log(`FETCH RESPONSE => ${res.status} ${res.url}`)
  return res.json();
}

module.exports.db_error = (name, err) => {
  try {
    console.error(`DB ${name} ERROR => ${JSON.stringify(err, null, 2)}`)
  } catch (err1) {
    console.error(`DB ${name} ERROR => ${err}`)
  }
  console.trace();
}

module.exports.promise_error = (err) => {
  console.error(`PROMISE ERROR => ${JSON.stringify(err, null, 2)}`)
}

module.exports.error = (err) => {
  try {
    logline(`ERROR => ${JSON.stringify(err.message, null, 2)}`)
    console.log(err.stack)
  } catch (err1) {
    logline(`ERROR => ${err}`)
    console.log(err.stack)
  }
}

module.exports.event_log = (event, message) => {
  console.log(`${event} => ${message}`);
}

module.exports.event_obj_log = (event, message, beautify = 2) => {
  if (beautify > 0) {
    console.log(`${event} => ${JSON.stringify(message, null, 2)}`);
  } else {
    console.log(`${event} => ${JSON.stringify(message)}`);
  }
}