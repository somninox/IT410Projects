/**
 * Created by wjwl on 1/26/16.
 */
var expect = require('chai').expect;
var exports = require('../exports');

describe('exports', function(){

    describe('getPathType', function(){

        it('path should be rejected', function () {
            var blah = 'path not a string';

            //call the function we're testing
            var result = exports.getPathType(1);

            return result.catch(function(data) {
                expect(data).to.equal(blah);
            });
        });

    });

    describe('getDirectoryType', function(){

        it('should resolve', function( ) {
            var result = exports.getDirectoryType('test', '1');
            var blah = "depth not a number";

            return result.catch(function (data) {
                expect(data).to.equal(blah);
            });
        });

    });

    describe('exists', function(){
        it('file should not exist', function() {
            var result = exports.exists('test111.sdf');
            var blah = false;

            return result.catch(function (data) {
                expect(data).to.equal(blah);
            });
        });
    });

    describe('getFilePaths', function(){
        it('should reject an error', function( ) {
            var result = exports.getFilePaths(1, 1);
            var blah = "path not a string";

            return result.catch(function (data) {
                expect(data).to.equal(blah);
            });
        });
    });

    describe('readFile', function(){
        it('should reject an error', function( ){
            var result = exports.readFile(1);
            var blah = "path not a string";

            return result.catch(function(data) {
                expect(data).to.equal(blah);
            });
        });
    });

    describe('readFiles', function(){

        it('should reject an error', function( ){
            var result = exports.readFiles(['2adf', 1, 'rest']);
            var blah = "path not a string";

            return result.catch(function(data) {
                expect(data).to.equal(blah);
            });
        });
    });

});

