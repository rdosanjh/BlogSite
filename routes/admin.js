var express = require('express');
var router = express.Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var url = 'mongodb://localhost:27017/blogSite';

router.get('/', function(req, res, next) {
  getArticleFromDatabase();
  res.sendFile(path.join(__dirname , '../views', 'admin.html'));
});

router.post('/', function(req, res, next){
  addArticleToDatabase(req.body);
  res.status(200);
  res.send();
});

var addArticleToDatabase = function(article){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('articles');
    collection.insert(article);

    db.close();
  });
}

var getArticleFromDatabase = function(){
    MongoClient.connect(url, function(err, db) {
      var collection = db.collection('articles');
      collection.find({}).toArray(function(err, docs) {
          console.log("Found the following records");
          console.dir(docs)
        })
    })
}

module.exports = router;
