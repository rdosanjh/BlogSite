var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var url = 'mongodb://localhost:27017/blogSite';


/* GET users listing. */
router.get('/', function(req, res, next) {
  getUsersFromDatabase();
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  console.log(req.body);
  addUserToDatabase(req.body);
    res.send('respond with a resource');
})

var addUserToDatabase = function(user){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('users');
    collection.insert(user);

    db.close();
  });
}

var getUsersFromDatabase = function(){
    MongoClient.connect(url, function(err, db) {
      var collection = db.collection('users');
      collection.find({}).toArray(function(err, docs) {
          //assert.equal(err, null);
          //assert.equal(2, docs.length);
          console.log("Found the following records");
          console.dir(docs)
        })//.then(db.close);
        //db.close();
    })
}

module.exports = router;
