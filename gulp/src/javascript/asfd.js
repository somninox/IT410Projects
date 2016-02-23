/**
 * Created by wjwl on 1/6/16.
 */
var arrayOfNumbers = [-1, 2, 7, 3, -8, -2.1 ];
var arrayOfFunctions = [
    function() {console.log('Hello');},
    5,
    null,
    function() {console.log('A');},
    function() {console.log('B');}
];
//two parameters; aray of items, callback function
//for each item in array call the callback with item from array

function forEach(array, callback) {
    var i;
    var item;

    for (i=0; i < array.length; i++) {
        item = array[i];
        callback(item, i);
    }
}

function absolute(item, index) {
    if (item < 0) return item * -1;
    return item;
}

function transform(array, callback) {
    var i;
    var item;
    var result = [];

    for (i=0; i < array.length; i++) {
        item = array[i];
        result.push(callback(item, i));
    }

    return result;
}

function square(item, index) {
    return item * item;
}

function filter(array, callback) {
    var i;
    var item;
    var pass;
    var result = [];

    for (i = 0; i < array.length; i++) {
        item = array[i];
        pass = callback(item, i);
        if (pass) result.push(item);
    }
    return result;
}

//with an array of numbers, if the numbers is positive then console.log the number
//if the number is negative then console.warn the number

function echo(item, index) {
    if(item < 0){
        console.warn(item);
    } else {
        console.log(item);
    }
}

function callIt(fn, index) {
    if (typeof fn === 'function'){
        fn();
    }
}

//forEach(a, echo)
//forEach(arrayOfFunctions, callIt);
//forEach(arrayOfFunctions, echo);

//console.log(transform(arrayOfNumbers, absolute));
//console.log(transform(arrayOfNumbers, square));
//console.log(arrayOfNumbers.map(absolute));
//console.log(arrayOfNumbers.filter(function(item) {
//    return item >=0;
//}))

var result = arrayOfNumbers.map(absolute).map(square); //neat-o! just add properties onto the end!
console.log(result)

//---------------REVIEW----------------//
//reduce, filter