/**
 * Created by wjwl on 2/8/16.
 */
var mongoose = require('mongoose');
var Promise = require('bluebird');

//set up db connection
mongoose.connect("mongodb://localhost/userManagement");
var db = mongoose.connection;

//connect to db
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to DB");
});

//setup db model (aka connection)
var UserSchema = new mongoose.Schema({
    email: String,
    password: String
});
var User = mongoose.model('users', UserSchema);

//FUNCTIONS
exports.createUser = function(uname, pass){
    return new Promise( function(resolve, reject){
        User.findOne({email: uname}, function(err, result){

            if (err){
               reject(err);
            }

            else if(result !== null){
                resolve('username already exists');
            }

            else{
                var user = new User({
                    email : uname,
                    password : pass
                });

                user.save(function(err){
                    if(err) reject(err);
                    console.log(user);
                    resolve("user created");
                });
            }
        });

    });

};

exports.updatePassword = function(uname, oldPass, newPass){
    return new Promise( function(resolve, reject)
    {
        User.findOne({email: uname}, function(err, result){

            if (err){
                reject(err);
            }

            else if(result === null){
                resolve('username does not exist');
            }

            else if(oldPass !== result.password){
                resolve('invalid current password');
            }

            else{
                User.update(
                    {email: uname},
                    {$set: {password: newPass}},
                    function(err, result){
                        if(err) reject(err);
                        console.log(result);
                        resolve("password updated");
                    }
                );
            }
        });
    });
};

exports.login = function(uname, pass){
    return new Promise( function(resolve, reject)
    {
        User.findOne({email: uname}, function(err, result){

            if (err){
                reject(err);
            }

            else if(result === null){
                resolve('username does not exist');
            }

            else if(pass !== result.password){
                resolve('invalid current password');
            }

            else{
               resolve('logged in');
            }
        });
    });

};

//exports.createUser("walala@yo.com", "oopsiedaisy").then(function(value){
//    console.log(value);
//}).catch(function(err){
//    console.error(err);
//});

//exports.updatePassword("test@test.com", "newpassfortest111", "3rdchange woo").then(function(value){
//    console.log(value);
//}).catch(function(err){
//    console.error(err);
//});

//exports.login("user1@123.net", "qqq").then(function(value){
//    console.log(value);
//}).catch(function(err){
//    console.error(err);
//});

