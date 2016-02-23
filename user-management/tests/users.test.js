/**
 * Created by wjwl on 2/10/16.
 */
/**
 * Created by wjwl on 1/26/16.
 */
var expect = require('chai').expect;
var exports = require('../user');

describe('exports', function(){

    describe('createUser', function(){
        it('should create a new user', function( ) {
            var result = exports.createUser("new@user.com", "12313");
            var blah = "user created";

            return result.then(function (data) {
                expect(data).to.equal(blah);
            });
        });

        it('should reject an error', function( ) {
            var result = exports.createUser("test@test.com", "12313");
            var blah = "username already exists";

            return result.then(function (data) {
                expect(data).to.equal(blah);
            });
        });
    });

    describe('updatePassword', function(){
        it('updates user password', function( ){
            var result = exports.updatePassword("user@123.net", "password", "password1");
            var blah = "password updated";

            return result.then(function(data) {
                expect(data).to.equal(blah);
            });
        });
    });

    describe('login', function(){

        it('logs in user', function( ){
            var result = exports.login("walala@yo.com", "oopsiedaisy");
            var blah = "logged in";

            return result.then(function(data) {
                expect(data).to.equal(blah);
            });
        });

        it('rejects authentication', function( ){
            var result = exports.login("walala@yo.com", "wrongpass");
            var blah = "invalid current password";

            return result.then(function(data) {
                expect(data).to.equal(blah);
            });
        })
    });

});

