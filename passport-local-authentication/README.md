# passport-local-authentication
Allows users to sign up, log in, and log out.


##Objective:

Add user management web services to your server.
Be able to create, update, and authenticate a user via HTTP requests.
Assignment:

In the previous assignment you wrote code that you could call to create a user, update the user's password, and to test a username and password combination. In this assignment you'll be building REST interface for those same functions.

##Build these express routes:

* GET /services/user - check to see if the current client (browser) is logged in using session data. If the client is logged in then send back the user name.
* POST /services/user - create a user account if not created, otherwise return an error. Send a JSON string in the body that has the information needed to create the user.
* PUT /services/user - create a user account if not created, otherwise update the user account if the user doing the update is logged in. Send a JSON string in the body that has the information needed to create or update the user.
* PUT /services/login - authenticate the client by sending a JSON string in the body that has all the necessary authentication information. If the authentication passes then a session should be established for the client.
* PUT /services/logout - terminate the session for the client.
* Write tests for each of the above REST endpoints. Tests can be written using the NodeJS "request" module or you can manually test using a REST client like Postman.
