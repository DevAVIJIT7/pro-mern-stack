'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _issue = require('./issue.js');

var _issue2 = _interopRequireDefault(_issue);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());

var issues = [];

var db = void 0;
_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(function (connection) {
  db = connection;
  app.listen(3000, function () {
    console.log("App started on Port 3000");
  });
}).catch(function (error) {
  console.log('Error:', error);
});

app.get('/api/issues', function (req, res) {
  db.collection('issues').find().toArray().then(function (issues) {
    var metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
  }).catch(function (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error: ' + error });
  });
});

app.post('/api/issues', function (req, res) {
  var newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';
  var err = _issue2.default.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: 'Invalid requrest: ' + err });
    return;
  }
  db.collection('issues').insertOne(newIssue).then(function (result) {
    return db.collection('issues').find({ _id: result.insertedId }).limit(1).next();
  }).then(function (newIssue) {
    res.json(newIssue);
  }).catch(function (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error: ' + error });
  });
});
//# sourceMappingURL=server.js.map