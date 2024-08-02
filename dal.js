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
function create(name, email, password){
    console.log("inside create function");
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password,balance: 0, activity:[]};
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

// function updateActivity(userID, depositDateTime, activity ) {
//     return new Promise((resolve, reject) => {
//         const customer = db
//             .collection('users')
//             .updateOne(
//              {"userID" : userID},
//               {$push : {"activity" : {"datetime" : depositDateTime, "action" : activity}}})
//             .then((result) => {
//                 console.log("this is the result:"+result)
//                 resolve(result)
//             })
//             .catch((err) => {
//                 console.log("thhis is the error:"+err)
//                 reject(err)
//             });
//     })

// }
//{ $inc:  {"activity.datetime" : depositDateTime, "activity.action" : activity}},
//{ returnOriginal: false },
// update - deposit/withdraw amount
function updateActivity(email, depositTime, depositDate, action, amount, balance){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                {$push : {"activity" : {"depositTime" : depositTime, "depositDate" : depositDate, "action" : action, "amount" : amount, "balance" : balance}}},
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


module.exports = {create, findOne, find, update, updateActivity, all};