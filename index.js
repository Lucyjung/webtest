const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const Konsole = require('./services/konsole');
const bot_config = require('./config/bot')
const routes = require('./routes');
const schedule = require('node-schedule');
const webCheck = require('./services/Web');

const urlencodedParser = bodyParser.urlencoded({
  extended: false
})
const port = process.env.PORT || 8081;
const EXPIRES = 43200000; // 12 hr
global.EXPIRES = EXPIRES;
app.use(requestIp.mw())

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(urlencodedParser);

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'), {
  maxage: '1d'
}));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
const job = schedule.scheduleJob('*/5 * * * *', webCheck.check);
app.listen(port, (err) => {
  Konsole.event_log('START', 'RUNNING AT PORT : ' + port)
});