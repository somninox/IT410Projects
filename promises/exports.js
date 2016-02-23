/**
 * Created by wjwl on 1/21/16.
 */
var fs = require('fs');
var Promise = require('bluebird');
//FUNCTION #1
exports.getPathType = function(path){
    return new Promise( function (resolve, reject){

        if(typeof path != 'string'){
            reject('path not a string');
        }

        fs.stat(path, function(err, res) {

            if(err) {
                resolve('nothing');
            }

            else if(res.isFile()){
                resolve('file');
            }


            else if (res.isDirectory()){
                resolve('directory');
            }

            else {
                resolve('other');
            }
        });

    });
};

//FUNCTION #2
exports.getDirectoryTypes = function(path, depth, filter){
    //if (typeof path !== 'string') return Promise.reject('not a string');

    if (arguments.length < 2) depth = -1
    if (arguments.length < 3) filter = function() { return true };

    return new Promise( function (resolve, reject){

        exports.getPathType(path).then( function( value){
            if( value == 'none' || value == 'other'){
                reject('path not a valid directory')
            }
        });

        if(typeof path != 'string'){
            reject('path not a string');
        }

        else if(typeof filter != 'function'){

            reject('filter not a function');
        }

        else if(typeof depth != 'number'){
            reject('depth not a number');
        }

        fs.readdir(path, function(err, res) {

            if(err){
                reject(err);
            }

            else {
                var fullPath;
                var promises = [];
                var results = {};

                //arguments.length
                for (var i = 0; i < res.length; i++) {
                    fullPath = path + '/' + res[i];

                    (function(fullPath){
                        var p = exports.getPathType(fullPath).then(function( value){

                            if (filter(fullPath, value) == true) results[fullPath] = value;

                            if (value == 'directory' && depth > 0) {
                                return exports.getDirectoryTypes(fullPath, depth - 1, filter).then(function (value) {

                                    Object.assign(results, value);
                                    //duplicate props will overwrite
                                })
                            }
                        });
                        promises.push(p);

                    })(fullPath);
                }


                Promise.all(promises).then(function(value) {
                    resolve(results);
                });
            }
        });
    });
};

//FUNCTION #3
exports.exists = function(path){
    return new Promise( function (resolve, reject){

        var promises = [];
        promises.push(exports.getPathType(path));

        if(typeof path !== "string"){
            reject('path not a string');
        }

        Promise.all(promises).then(function(value){


            if(value == 'file' || value == 'directory'){
                resolve(true);
            }

            else{
                resolve(false);
            }
        });

    });
};

//FUNCTION #4
exports.getFilePaths = function(path, depth){
    return new Promise( function (resolve, reject){

        var filePaths = [];
        var promises = [];

        exports.getPathType(path).then( function( value){
            if( value == 'none' || value == 'other'){
                reject('path not a valid directory')
            }
        });

        if(typeof path != 'string'){
            reject('path not a string');
        }

        else if(typeof depth != 'number'){
            reject('depth not a number');
        }

        //description: promises is an array with one object, make sure promises are resolved and
        //store single object in new variable 'obj'. Loop through obj and push the filePath if
        //any paths are a file type. Resolve array of file paths
        else{
            promises.push(exports.getDirectoryTypes(path, depth));

            Promise.all(promises).then(function( value){
                var obj = value[0];

                for(var prop in obj){

                    if(obj.hasOwnProperty( prop )){

                        if(obj[prop] == 'file'){

                            filePaths.push(prop);
                        }
                    }
                }
                resolve(filePaths);
            })
        }
    });
};

//FUNCTION #5
exports.readFile = function(path){
    return new Promise( function (resolve, reject){

        var promises = [];
        promises.push(exports.getPathType(path));

        Promise.all(promises).then(function(value){

            if(value != 'file'){
                reject('not a file type : cannot be read');
            }
        });

        if(typeof path != 'string'){
            reject('path not a string');
        }

        fs.readFile(path, 'utf8', function(err, res){

            if(err){
                reject(err);
            }

            else{
                resolve(res);
            }

        })
    })
};

//FUNCTION #6
exports.readFiles = function(path){
    return new Promise( function( resolve, reject){
        var paths = [];
        var promises = [];

        for(var i = 0; i < path.length; i++){
            exports.readFile(path[i]).catch( function( err){
                reject(err);
            });

            promises.push(exports.readFile(path[i]));
            paths.push(path[i]);
        }

        Promise.all(promises).then( function( value){
            var results = {};
            for(var i = 0; i < paths.length; i++){
                results[paths[i]] = value[i];
            }
            resolve(results);
        })
    })

};


//exports.getPathType('test.txt').then(function(value) {
//    console.log(value);
//}).catch(function(err){
//    console.error(err);
//});

//exports.getDirectoryTypes('/Users/wjwl/Projects/WebstormProjects/promises/test', 1).catch(function(err) {
//    console.error(err);
//}).then(function(value){
//    console.log(value);
//});

//exports.exists('test/tes111t2').then(function (value){
//    console.log(value);
//}).catch(function (err){
//    console.log(err);
//});

//exports.getFilePaths('test',1).then( function( value){
//    console.log(value);
//}).catch( function( err){
//    console.error(err);
//});

//exports.readFile("/Users/wjwl/Projects/WebstormProjects/promises/test.txt").then(function(value){
//    console.log(value);
//}).catch(function(err){
//    console.error(err);
//})

//var q = ['test.txt', 'test/helloworld.txt', 'test/test2/hewo.txt']
//exports.readFiles(q).then( function( value){
//    console.log(value);
//}).catch( function( err){
//    console.error(err);
//});