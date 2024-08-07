const MongoClient = require('mongodb').MongoClient;
let db            = null;
require('dotenv').config();

// connect to mongo
MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password, accountNumber){
    console.log("inside create function");
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, accountNumber, balance: 0, activity:[]};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// find user account
function findAccount(account){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({accountNumber: account })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// update - deposit/withdraw amount
function updateActivity(email, depositTime, depositDate, action, amount, balance){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                {$push : {"activity" : {"Time" : depositTime, "Date" : depositDate, "Action" : action, "Amount" : amount, "CurBalance" : balance}}},
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}
// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, findAccount, update, updateActivity, all};