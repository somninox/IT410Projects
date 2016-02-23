# promises
IT410 file system promises assignment code and tests

Objective:
•	To get you familiar with testing
•	To help you be proficient with promises
•	To build a file system tool that will be used with the next assignment.
Assignment:
A few notes about this assignment:
•	For each of the below functions, a promise is the result. In any case that an error occurs, the promise should be rejected.
•	Each of these functions need to reside in one JavaScript file and needs to be added to the exports object. For example, if the function is getPathType then you'll want in your file to have: exports.getPathType = function(path) { ... }
•	Node's fs module is at the core to making this file work. Any reading errors produced by the fs module should cause the promise to be rejected unless the documentation for the function being worked on says differently.
•	It is important to read the specs provided and to create your own set of tests that follow those instructions. You will not be strictly graded on how you write your tests, but the primary benefit of the tests will be to help you confirm that your functions operate as expected.
Assignment Function Specs Follow
----------------------------------------------------------------------
1.	Promise : getPathType ( path : String )
Determine if the path points to a file, a directory, nothing, or other. This is done using fs.stat.
Parameters:
•	path ( String ) - The file path to get the file type for.
Returns
•	( Promise )
o	Resolves to one of the following: "file", "directory", "nothing", "other".
o	This promise will be rejected if
•	The provided path is not a string.
2.	Promise : getDirectoryTypes ( path : String [, depth : Number = -1 ] [, filter : Function = function(path, type) { return true; } )
Read a directory and get the path types, using fs.readdir and getPathType, for each file path in the directory.
Parameters:
•	path ( String ) - The path of the directory to get file paths and file types for.
•	depth ( Number ) [ optional ] [ Default: -1 ] - How deep to recurse the directory. If a negative number is provided then recurse infinitely. If zero then don't recurse.
•	filter ( Function ) [ optional ] [ Default: function(path, type) { return true; } ) - A function that is called for each file found. This function is sent the path and the path type. If the function returns true then the file path and file type are added to the result set.
Returns:
•	( Promise )
o	Resolves to an object map that maps file paths to file path types. Example map result:
{
    'path/to/file': 'file',
    'path/to/directory: 'directory'
 }
o	This promise is rejected if:
•	The path is not a string
•	The depth is not a number
•	The filter is not a function
•	The path does not point to a directory that can be read
•	Any other error occurs
3.	Promise : exists ( path : String )
Check to see if something exists at the specified path by using getPathType.
Parameters:
•	path ( String ) - The file path to check for the existence of something at.
Returns
•	( Promise )
o	Resolves to true if the file exists or false if not.
o	Rejects if the path is not a string.
4.	Promise : getFilePaths ( path: String [, depth : Number = -1 ] )
Read a directory (and possibly sub-directories) to get an array of all paths to files, using getDirectoryTypes.
Parameters:
•	path ( String ) - The file path of the directory.
Returns
•	( Promise )
o	Resolves to an array of file paths for all files found.
o	Rejects if:
•	The path is not a string.
•	The path does not point to a file.
•	The depth is not a number.
•	Any other error occurs.
5.	Promise : readFile ( path: String )
Get the contents of a file.
Parameters:
•	path ( String ) - The file path.
Returns
•	( Promise )
o	Resolves to a string containing the file's contents.
o	Rejects if
•	The path is not a string.
•	The path does not point to a file.
•	The file cannot be read.
6.	Promise : readFiles ( paths: String[] )
Get the contents of multiple files using readFile.
Parameters:
•	paths ( String[] ) - An array of strings where each string is a file path.
Returns
•	( Promise )
o	Resolves to an object map of file names to file contents.
o	Rejects if one or more files cannot be read.
----------------------------------------------------------------------
Grading:
I will run your code through my own code tester. The grade you get on this assignment will primarily be based on the percentage of tests that pass. You will also get up to 5 points if you've written at least one test for each of these six functions being tested.


