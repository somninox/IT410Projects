var mongoose 		       	= require('mongoose');
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var express             = require('express');
var session             = require('express-session');
var flash               = require('connect-flash');
var morgan              = require('morgan');

//inititialize express app
var app = express();
var api = express.Router();

//setup db connection and schema
mongoose.connect("mongodb://localhost/userManagement");

var userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//setting up db model
var User = mongoose.model('users', userSchema);

//serializing user instance
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
//deserializing user instance
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//login
passport.use('local-login', new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done){
    console.log('authenticating...');

    User.findOne({email : username}, 
      function(err, user){
      //any case of error
          if (err){
              return done(err);
          }
          //user does not exist
          else if(!user){
              console.log('User not found with username '+username);
            return done(null, false, req.flash('loginMessage', 'User Not found.'));   
          }
          //invalid password
          else if(password !== user.password){
              console.log('Invalid Password for username '+username);
            return done(null, false, req.flash('message', 'Invalid Password'));
          }

          else{
             return done(null, user);
          }
      });

  }
));

//configuring passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'secret key', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', express.static('app'));
app.use('/api', api);
app.use(morgan('dev'));

//functions
//As with any middleware it is quintessential to call next()
// if the user is authenticated

// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/');
// }

// //password validator
// var isValidPassword = function(user, password){
//   return bCrypt.compareSync(password, user.password);
// }

// // Generates hash using bCrypt
// var createHash = function(password){
//  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }

// routes
api.get('/', function(req, res) {
  res.send('api here :3');   
});

api.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// api.post('/login', 
//   passport.authenticate('local-login', {
//     failureFlash : true
//   }),
//   function(req, res){
//     console.log(req.user);
//     res.json(req.user);
//   }
// );

api.post('/login', function(req, res){
  var x = req.body.username;
    console.log(x);
});

/* GET Registration Page */
// router.get('/signup', function(req, res){
// res.render('register',{message: req.flash('message')});
// });

// /* Handle Registration POST */
// router.post('/signup', passport.authenticate('signup', {
// successRedirect: '/home',
// failureRedirect: '/signup',
// failureFlash : true 
// }));

// /* GET Home Page */
// router.get('/home', function(req, res){
//   res.send('Success');
// });


//create new user
// passport.use('signup', new LocalStrategy({
//     passReqToCallback : true
//   },
//   function(req, uname, pass, done) {
//     findOrCreateUser = function(){
//       // find a user in Mongo with provided username
//       User.findOne({email :uname},function(err, user) {
//         // In case of any error return
//         if (err){
//           console.log('Error in SignUp: '+err);
//           return done(err);
//         }
//         // already exists
//         if (user) {
//           console.log('Username already exists');
//           return done(null, false, 
//              req.flash('message','Username Already Exists'));
//         } 

//         else {
//           // if there is no user with that email
//           // create the user
//           // var newUser = new User();
//           // set the user's local credentials
//           //newUser.username = username;
//           // newUser.password = createHash(password);
//           // newUser.email = req.param('email');
//           //newUser.firstName = req.param('firstName');
//           //newUser.lastName = req.param('lastName');

//           var newUser = new User({
//                     email : uname,
//                     password : createHash(pass)
//                 });
 
//           // save the user
//           newUser.save(function(err) {
//             if (err){
//               console.log('Error in Saving user: '+err);  
//               throw err;  
//             }
//             console.log('User Registration succesful');    
//             return done(null, newUser);
//           });
//         }
//       });
//     };
     
//     // Delay the execution of findOrCreateUser and execute 
//     // the method in the next tick of the event loop
//     process.nextTick(findOrCreateUser);
//   })
// );

app.listen(3000);
console.log('Server started on port %d', 3000);

