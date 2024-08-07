var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
//const e = require('express');

const port = process.env.PORT || 8080;

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password/:account/', function (req, res) {
    dal.create(req.params.name, req.params.email, req.params.password, req.params.account)
    .then((user) => {
        console.log("created new user in the db");
        console.log(user);
        res.send(user);
    });
});

// // login user 
// app.get('/account/login/:email/:password', function (req, res) {

//     dal.find(req.params.email).
//         then((user) => {

//             // if user exists, check password
//             if(user.length > 0){
//                 if (user[0].password === req.params.password){
//                     res.send(user[0]);
//                 }
//                 else{
//                     res.send('Login failed: wrong password');
//                 }
//             }
//             else{
//                 res.send('Login failed: user not found');
//             }
//     });
    
// });

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findAccount/:account', function (req, res) {

    dal.findOne(req.params.account).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});


// Adding the route definition for updating the user activity
app.get('/account/changeactivity/:email/:depositTime/:depositDate/:action/:amount/:balance', function(req, res) {
    dal.updateActivity(req.params.email, req.params.depositTime, req.params.depositDate, req.params.action, req.params.amount, req.params.balance)
        .then((result) => {
            
            console.log("this is update activity"+result);
            res.send(result);
        });
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

app.listen(port);
console.log('Running on port: ' + port);